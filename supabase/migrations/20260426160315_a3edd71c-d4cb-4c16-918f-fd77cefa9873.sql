DROP POLICY IF EXISTS "Anyone can register WhatsApp orders" ON public.orders;

CREATE POLICY "Anyone can register valid WhatsApp orders"
ON public.orders
FOR INSERT
TO anon, authenticated
WITH CHECK (
  product_name IS NOT NULL
  AND char_length(product_name) BETWEEN 1 AND 120
  AND whatsapp_message IS NOT NULL
  AND char_length(whatsapp_message) BETWEEN 1 AND 1000
  AND quantity BETWEEN 1 AND 99
  AND status = 'whatsapp_started'
);