import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    flowType: 'pkce',
    emailRedirectTo: `${window.location.origin}/auth/callback`
  }
});

// Add error handling for auth state changes
supabase.auth.onAuthStateChange((event, session) => {
  if (event === 'SIGNED_IN') {
    console.log('User signed in successfully');
  } else if (event === 'SIGNED_OUT') {
    console.log('User signed out');
  } else if (event === 'USER_UPDATED') {
    console.log('User updated');
  }
});

// Add error handling helper
export const getAuthErrorMessage = (error: any): string => {
  if (!error) return 'An unknown error occurred';
  
  // Network or connection errors
  if (error.message?.includes('fetch')) {
    return 'Unable to connect to the server. Please check your internet connection.';
  }
  
  // Handle specific Supabase error messages
  if (error.message?.includes('Invalid login credentials')) {
    return 'Invalid email or password';
  }
  
  if (error.message?.includes('Email not confirmed')) {
    return 'Please check your email to confirm your account before signing in.';
  }
  
  if (error.message?.includes('User not found')) {
    return 'No account found with this email address';
  }
  
  if (error.message?.includes('Email rate limit exceeded')) {
    return 'Too many attempts. Please try again later';
  }

  // Log the error for debugging but return a user-friendly message
  console.error('Auth error:', error);
  return 'An error occurred. Please try again.';
};