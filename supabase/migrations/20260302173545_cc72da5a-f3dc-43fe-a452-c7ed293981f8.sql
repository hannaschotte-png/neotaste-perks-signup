
CREATE TABLE public.corporate_leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  plan_type TEXT NOT NULL CHECK (plan_type IN ('monthly', 'annual')),
  company_name TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  employee_count INTEGER NOT NULL,
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.corporate_leads ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (public form)
CREATE POLICY "Anyone can submit a lead"
ON public.corporate_leads
FOR INSERT
WITH CHECK (true);
