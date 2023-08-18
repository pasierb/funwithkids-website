import { createClient } from '@supabase/supabase-js';
import { Database } from '~/supabase';

export const supabaseClient = createClient<Database>(
  import.meta.env.PUBLIC_SUPABASE_URL!,
  import.meta.env.PUBLIC_SUPABASE_KEY!
);
