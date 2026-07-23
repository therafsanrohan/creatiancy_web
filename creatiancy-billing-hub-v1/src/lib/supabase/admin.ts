import 'server-only';
import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import { getServerSupabaseConfig } from './config';

export function createAdminClient() {
  const { supabaseUrl, secretKey } = getServerSupabaseConfig();

  return createSupabaseClient(supabaseUrl, secretKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
