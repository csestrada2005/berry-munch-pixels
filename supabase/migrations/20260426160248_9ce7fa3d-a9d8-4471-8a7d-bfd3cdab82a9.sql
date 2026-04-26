CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE,
  display_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE TABLE public.user_roles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  role public.app_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

CREATE TABLE public.admin_products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL CHECK (char_length(name) BETWEEN 1 AND 80),
  category TEXT NOT NULL CHECK (char_length(category) BETWEEN 1 AND 80),
  description TEXT NOT NULL CHECK (char_length(description) BETWEEN 1 AND 500),
  base_price INTEGER CHECK (base_price IS NULL OR base_price >= 0),
  image_key TEXT NOT NULL CHECK (char_length(image_key) BETWEEN 1 AND 80),
  featured BOOLEAN NOT NULL DEFAULT false,
  active BOOLEAN NOT NULL DEFAULT true,
  toppings_note TEXT CHECK (toppings_note IS NULL OR char_length(toppings_note) <= 250),
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE TABLE public.admin_product_sizes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id TEXT NOT NULL REFERENCES public.admin_products(id) ON DELETE CASCADE,
  label TEXT NOT NULL CHECK (label IN ('G', 'M', 'CH')),
  price INTEGER NOT NULL CHECK (price >= 0),
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE (product_id, label)
);

CREATE TABLE public.orders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id TEXT REFERENCES public.admin_products(id) ON DELETE SET NULL,
  product_name TEXT NOT NULL CHECK (char_length(product_name) BETWEEN 1 AND 120),
  size_label TEXT CHECK (size_label IS NULL OR size_label IN ('G', 'M', 'CH')),
  customer_name TEXT CHECK (customer_name IS NULL OR char_length(customer_name) <= 120),
  customer_phone TEXT CHECK (customer_phone IS NULL OR char_length(customer_phone) <= 40),
  notes TEXT CHECK (notes IS NULL OR char_length(notes) <= 500),
  quantity INTEGER NOT NULL DEFAULT 1 CHECK (quantity BETWEEN 1 AND 99),
  estimated_total INTEGER CHECK (estimated_total IS NULL OR estimated_total >= 0),
  status TEXT NOT NULL DEFAULT 'whatsapp_started' CHECK (status IN ('whatsapp_started', 'confirmed', 'preparing', 'delivered', 'cancelled')),
  whatsapp_message TEXT NOT NULL CHECK (char_length(whatsapp_message) BETWEEN 1 AND 1000),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_product_sizes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

CREATE OR REPLACE FUNCTION public.claim_initial_admin()
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _uid UUID := auth.uid();
BEGIN
  IF _uid IS NULL THEN
    RETURN false;
  END IF;

  IF EXISTS (SELECT 1 FROM public.user_roles WHERE role = 'admin') THEN
    RETURN public.has_role(_uid, 'admin');
  END IF;

  INSERT INTO public.user_roles (user_id, role)
  VALUES (_uid, 'admin')
  ON CONFLICT (user_id, role) DO NOTHING;

  INSERT INTO public.profiles (user_id, display_name)
  VALUES (_uid, NULL)
  ON CONFLICT (user_id) DO NOTHING;

  RETURN true;
END;
$$;

CREATE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_admin_products_updated_at
BEFORE UPDATE ON public.admin_products
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_admin_product_sizes_updated_at
BEFORE UPDATE ON public.admin_product_sizes
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_orders_updated_at
BEFORE UPDATE ON public.orders
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE POLICY "Users can view their own profile"
ON public.profiles
FOR SELECT
TO authenticated
USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Users can create their own profile"
ON public.profiles
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile"
ON public.profiles
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'))
WITH CHECK (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Users can view their own roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage roles"
ON public.user_roles
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Anyone can view active products"
ON public.admin_products
FOR SELECT
TO anon, authenticated
USING (active = true OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage products"
ON public.admin_products
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Anyone can view active product sizes"
ON public.admin_product_sizes
FOR SELECT
TO anon, authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.admin_products p
    WHERE p.id = product_id
      AND (p.active = true OR public.has_role(auth.uid(), 'admin'))
  )
);

CREATE POLICY "Admins can manage product sizes"
ON public.admin_product_sizes
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Anyone can register WhatsApp orders"
ON public.orders
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Admins can view orders"
ON public.orders
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update orders"
ON public.orders
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE INDEX idx_profiles_user_id ON public.profiles(user_id);
CREATE INDEX idx_user_roles_user_id ON public.user_roles(user_id);
CREATE INDEX idx_admin_products_active_sort ON public.admin_products(active, sort_order);
CREATE INDEX idx_admin_product_sizes_product_id ON public.admin_product_sizes(product_id);
CREATE INDEX idx_orders_status_created_at ON public.orders(status, created_at DESC);

INSERT INTO public.admin_products (id, name, category, description, base_price, image_key, featured, active, toppings_note, sort_order) VALUES
('berry-munch', 'Berry Munch', 'Fresas con Chocolate', 'Nuestro vaso clásico de fresas frescas cubiertas con chocolate Berry Munch.', 140, 'berriesCup', true, true, 'Personalízalo con toppings del menú.', 10),
('berry-bite', 'Berry Bite', 'Fresas con Chocolate', 'Una versión más ligera para antojos rápidos, con el mismo chocolate de la casa.', 120, 'chocolateBerryCup', true, true, 'Personalízalo con toppings del menú.', 20),
('fresas-dubai', 'Fresas Dubái', 'Premium', 'Fresas con chocolate y el crunch estilo Dubái en tamaños G, M y CH.', NULL, 'cup1', true, true, NULL, 30),
('fresas-lotus', 'Fresas Lotus', 'Premium', 'Fresas con chocolate y notas caramelizadas de Lotus para un perfil más especiado.', NULL, 'cup2', true, true, NULL, 40),
('mix-dubai', 'Mix Dubái', 'Premium', 'Combinación premium con toppings estilo Dubái y chocolate Berry Munch.', NULL, 'cup3', true, true, NULL, 50),
('mix-uvas-blueberry', 'Mix Uvas / Blueberry', 'Mix', 'Mix de uvas y blueberry con chocolate, ideal para compartir o probar algo distinto.', NULL, 'cup6', false, true, NULL, 60),
('relleno-dubai', 'Relleno Dubai', 'Especial', 'Relleno especial Dubái para elevar tu pedido con una capa extra de indulgencia.', 500, 'pistachioCup', false, true, NULL, 70),
('bombones', 'Bombones', 'Dulces', 'Bombones cubiertos para acompañar tu pedido Berry Munch.', 60, 'productsGrid', false, true, NULL, 80),
('pretzels', 'Pretzels', 'Dulces', 'Pretzels con chocolate para un contraste crujiente y salado.', 60, 'productsGrid', false, true, NULL, 90);

INSERT INTO public.admin_product_sizes (product_id, label, price, sort_order) VALUES
('fresas-dubai', 'G', 250, 10),
('fresas-dubai', 'M', 220, 20),
('fresas-dubai', 'CH', 190, 30),
('fresas-lotus', 'G', 230, 10),
('fresas-lotus', 'M', 200, 20),
('fresas-lotus', 'CH', 170, 30),
('mix-dubai', 'G', 250, 10),
('mix-dubai', 'M', 220, 20),
('mix-dubai', 'CH', 190, 30),
('mix-uvas-blueberry', 'G', 250, 10),
('mix-uvas-blueberry', 'M', 220, 20),
('mix-uvas-blueberry', 'CH', 190, 30);