CREATE TABLE public.loyalty_signups (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  comments TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.loyalty_signups ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can sign up for loyalty program"
  ON public.loyalty_signups
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);