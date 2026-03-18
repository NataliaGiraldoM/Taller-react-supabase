import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://xamfrnrurcehnbapjonq.supabase.co"

export const supabase = createClient(supabaseUrl, supabaseKey)
