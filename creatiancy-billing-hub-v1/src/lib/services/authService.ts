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
      }
    }

    // Fallback profile lookup
    const profiles = localStore.profiles;
    const found = profiles.find(p => p.email.toLowerCase() === email.toLowerCase());
    if (found) {
      localStore.currentUser = found;
      return found;
    }
    return null;
  }
};
