import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://bqdxwrxoqllvwxkvpuui.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || 'sb_publishable__6ni2hbegiBGlGKAXcTjvg_1Xis_P6f';

export const supabase = createClient(supabaseUrl, supabaseKey);
