-- Corrective Migration: Fix Cloud Database Persistence, Canonical Roles, and Auth Triggers

-- 1. UPDATE ROLE CHECK CONSTRAINT ON PROFILES
ALTER TABLE profiles DROP CONSTRAINT IF EXISTS profiles_role_name_check;
ALTER TABLE profiles ADD CONSTRAINT profiles_role_name_check CHECK (
    role_name IN (
        'Super Admin', 'super_admin',
        'Admin', 'admin',
        'Finance Admin', 'finance', 'finance_admin',
        'Client Service', 'client_service',
        'Project Manager', 'project_manager',
        'Viewer', 'viewer'
    )
);

-- 2. AUTOMATIC PROFILE CREATION TRIGGER ON SUPABASE AUTH SIGNUP
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email, role_name, created_at, updated_at)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
    new.email,
    COALESCE(new.raw_user_meta_data->>'role_name', 'Super Admin'),
    now(),
    now()
  )
  ON CONFLICT (id) DO UPDATE SET
    full_name = EXCLUDED.full_name,
    email = EXCLUDED.email,
    updated_at = now();
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Re-create trigger on auth.users if available
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'auth' AND tablename = 'users') THEN
    DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
    CREATE TRIGGER on_auth_user_created
      AFTER INSERT ON auth.users
      FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
  END IF;
END $$;

-- 3. ENSURE RLS HELPER FUNCTION & PROFILES POLICIES
CREATE OR REPLACE FUNCTION is_finance_authorized()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.role_name IN ('Super Admin', 'super_admin', 'Admin', 'admin', 'Finance Admin', 'finance', 'finance_admin')
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- RLS Policies for Profiles
DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id OR auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- 4. GRANT TABLE PERMISSIONS TO AUTHENTICATED USERS
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;
