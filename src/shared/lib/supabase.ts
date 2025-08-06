import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Debug logging for environment variables
console.log('Supabase URL:', supabaseUrl);
console.log('Supabase Key exists:', !!supabaseAnonKey);

// Create client with fallback for development
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co', 
  supabaseAnonKey || 'placeholder-key', 
  {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  }
  }
);

// Check if Supabase is properly configured
export const isSupabaseConfigured = () => {
  const isConfigured = !!(supabaseUrl && 
                          supabaseAnonKey && 
                          supabaseUrl !== 'https://placeholder.supabase.co' && 
                          supabaseAnonKey !== 'placeholder-key');
  
  console.log('Supabase configured:', isConfigured);
  return isConfigured;
};

// Auth helper functions
export const signInWithEmail = async (email: string, password: string) => {
  if (!isSupabaseConfigured()) {
    throw new Error('Supabase no está configurado. Por favor configura las variables de entorno.');
  }
  
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
};

export const signUpWithEmail = async (email: string, password: string) => {
  if (!isSupabaseConfigured()) {
    throw new Error('Supabase no está configurado. Por favor configura las variables de entorno.');
  }
  
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  return { data, error };
};

export const signInWithGoogle = async () => {
  if (!isSupabaseConfigured()) {
    throw new Error('Supabase no está configurado. Por favor configura las variables de entorno.');
  }
  
  // Determine the correct redirect URL
  const isProduction = window.location.hostname !== 'localhost';
  const redirectUrl = isProduction 
    ? `${window.location.origin}/`
    : 'https://frolicking-fox-f0ca05.netlify.app/';
  
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: redirectUrl,
    },
  });
  return { data, error };
};

export const signOut = async () => {
  if (!isSupabaseConfigured()) {
    return { error: null };
  }
  
  const { error } = await supabase.auth.signOut();
  return { error };
};

export const resetPassword = async (email: string) => {
  if (!isSupabaseConfigured()) {
    throw new Error('Supabase no está configurado. Por favor configura las variables de entorno.');
  }
  
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password`,
  });
  return { data, error };
};