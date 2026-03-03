
ALTER TABLE public.corporate_leads 
ADD COLUMN status text NOT NULL DEFAULT 'neu',
ADD COLUMN notes text DEFAULT NULL;

-- Allow admin to read and update leads
CREATE POLICY "Authenticated users can select leads"
ON public.corporate_leads
FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can update leads"
ON public.corporate_leads
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);
