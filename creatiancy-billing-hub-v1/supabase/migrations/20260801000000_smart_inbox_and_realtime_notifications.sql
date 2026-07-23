-- Migration: 20260801000000_smart_inbox_and_realtime_notifications.sql
-- Description: Real-time System Notifications, Indexing, RLS, and Supabase Realtime Publication

-- 1. Ensure Table Structure
CREATE TABLE IF NOT EXISTS public.system_notifications (
    id TEXT PRIMARY KEY,
    sender_name TEXT NOT NULL,
    sender_role TEXT NOT NULL,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    category TEXT NOT NULL DEFAULT 'broadcast',
    target_roles TEXT[] NOT NULL DEFAULT '{"all"}'::TEXT[],
    link_url TEXT,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    read_by TEXT[] DEFAULT '{}'::TEXT[]
);

-- 2. Indexes for fast retrieval
CREATE INDEX IF NOT EXISTS idx_system_notifs_timestamp ON public.system_notifications(timestamp DESC);

-- 3. Enable RLS
ALTER TABLE public.system_notifications ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Authenticated users can select notifications" ON public.system_notifications;
CREATE POLICY "Authenticated users can select notifications" ON public.system_notifications
FOR SELECT USING (true);

DROP POLICY IF EXISTS "Authenticated users can insert notifications" ON public.system_notifications;
CREATE POLICY "Authenticated users can insert notifications" ON public.system_notifications
FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Authenticated users can update notifications" ON public.system_notifications;
CREATE POLICY "Authenticated users can update notifications" ON public.system_notifications
FOR UPDATE USING (true);

DROP POLICY IF EXISTS "Authenticated users can delete notifications" ON public.system_notifications;
CREATE POLICY "Authenticated users can delete notifications" ON public.system_notifications
FOR DELETE USING (true);

-- 4. Enable Supabase Realtime for system_notifications
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM pg_publication WHERE pubname = 'supabase_realtime') THEN
        ALTER PUBLICATION supabase_realtime ADD TABLE public.system_notifications;
    END IF;
EXCEPTION
    WHEN OTHERS THEN NULL;
END;
$$;
