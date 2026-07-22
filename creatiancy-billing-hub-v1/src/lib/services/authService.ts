import { supabase, isSupabaseConfigured } from '../supabase';
import { Profile, localStore } from '../db';

export const authService = {
  getCurrentUser: async (): Promise<Profile> => {
    if (isSupabaseConfigured && supabase) {
      const { data: authData } = await supabase.auth.getUser();
      if (authData?.user) {
        const { data: profileData } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', authData.user.id)
          .single();

        if (profileData) {
          localStore.currentUser = profileData;
          return profileData;
        }

        // Construct fallback profile from auth user metadata if trigger hasn't executed
        const authProfile: Profile = {
          id: authData.user.id,
          full_name: authData.user.user_metadata?.full_name || authData.user.email?.split('@')[0] || 'Admin',
          email: authData.user.email || '',
          role_name: (authData.user.user_metadata?.role_name as any) || 'Super Admin',
          created_at: authData.user.created_at
        };
        localStore.currentUser = authProfile;
        return authProfile;
      }
    }
    return localStore.currentUser;
  },

  setCurrentUser: async (user: Profile): Promise<void> => {
    localStore.currentUser = user;
    if (isSupabaseConfigured && supabase) {
      await supabase.from('profiles').upsert(user);
    }
  },

  getProfiles: async (): Promise<Profile[]> => {
    if (isSupabaseConfigured && supabase) {
      const { data } = await supabase.from('profiles').select('*').order('full_name');
      if (data && data.length > 0) {
        localStore.profiles = data;
        return data;
      }
    }
    return localStore.profiles;
  },

  loginWithEmail: async (email: string, password?: string): Promise<Profile | null> => {
    if (isSupabaseConfigured && supabase && password) {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw new Error(error.message);
      if (data.user) {
        const { data: profile } = await supabase.from('profiles').select('*').eq('id', data.user.id).single();
        if (profile) {
          localStore.currentUser = profile;
          return profile;
        }
        // Create profile row if it doesn't exist yet
        const authProfile: Profile = {
          id: data.user.id,
          full_name: data.user.user_metadata?.full_name || data.user.email?.split('@')[0] || 'User',
          email: data.user.email || email,
          role_name: (data.user.user_metadata?.role_name as any) || 'Super Admin',
          created_at: data.user.created_at
        };
        await supabase.from('profiles').upsert(authProfile);
        localStore.currentUser = authProfile;
        return authProfile;
      }
    }

    // Fallback profile lookup for local development
    const profiles = localStore.profiles;
    const found = profiles.find(p => p.email.toLowerCase() === email.toLowerCase());
    if (found) {
      localStore.currentUser = found;
      return found;
    }
    return null;
  }
};
