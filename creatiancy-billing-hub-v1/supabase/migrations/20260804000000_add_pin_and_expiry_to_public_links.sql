-- Migration: Add PIN protection and Expiry Date to public invoice links

-- Enable pgcrypto if not already enabled (needed for PIN hashing)
CREATE EXTENSION IF NOT EXISTS pgcrypto;

ALTER TABLE public.invoice_public_links
ADD COLUMN IF NOT EXISTS expires_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS pin_enabled BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN IF NOT EXISTS pin_hash TEXT;

ALTER TABLE public.invoice_public_links DROP CONSTRAINT IF EXISTS invoice_public_links_access_mode_check;
ALTER TABLE public.invoice_public_links ADD CONSTRAINT invoice_public_links_access_mode_check CHECK (access_mode IN ('LINK_ONLY', 'EMAIL_OTP', 'PIN_PROTECTED'));

-- Create an index to quickly find expired links if needed
CREATE INDEX IF NOT EXISTS idx_invoice_public_links_expires_at ON public.invoice_public_links(expires_at) WHERE expires_at IS NOT NULL;
