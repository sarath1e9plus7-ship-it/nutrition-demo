import { createClient } from "@supabase/supabase-js";

console.log("DEBUG URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);
console.log("DEBUG KEY:", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
);