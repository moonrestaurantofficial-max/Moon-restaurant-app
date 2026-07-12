import { createClient } from '@supabase/supabase-js';

export interface ReviewRow {
  id: string;
  name: string;
  // The `email` column stores the reviewer's phone number (the form UI
  // collects a phone number, but the underlying table predates that change).
  email: string | null;
  rating: number;
  branch: string;
  comment: string;
  created_at: string;
  is_published: boolean;
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseKey);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl as string, supabaseKey as string)
  : null;
