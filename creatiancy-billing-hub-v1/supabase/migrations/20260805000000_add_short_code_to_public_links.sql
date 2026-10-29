-- Additive, Non-Destructive Migration: Add short_code to invoice_public_links
-- Enables clean, professional short URLs like https://creatiancy-web.vercel.app/i/aB7xK9pQ
-- Preserves all existing records, capability tokens, RLS, and versions.

DO $$
BEGIN
    -- 1. Add short_code column if it doesn't already exist
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_schema = 'public' 
          AND table_name = 'invoice_public_links' 
          AND column_name = 'short_code'
    ) THEN
        ALTER TABLE public.invoice_public_links 
        ADD COLUMN short_code VARCHAR(32);
    END IF;
END $$;

-- 2. Create unique index on short_code where not null
CREATE UNIQUE INDEX IF NOT EXISTS idx_invoice_public_links_short_code 
ON public.invoice_public_links(short_code) 
WHERE short_code IS NOT NULL;
