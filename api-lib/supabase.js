
// Import the Supabase client
import { createClient } from '@supabase/supabase-js';

export async function getSupabaseClient() {
  /**
   * Global is used here to maintain a cached connection across hot reloads
   * in development. This prevents connections growing exponentiatlly
   * during API Route usage.
   * https://github.com/vercel/next.js/pull/17666
   */
  if (!global.supabaseClientPromise) {
    const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
    // const client = new MongoClient(process.env.MONGODB_URI);
    // client.connect() returns an instance of MongoClient when resolved
    global.supabaseClientPromise = client;
  }
  return global.supabaseClientPromise;
}

export async function getSupabaseDb() {
  const supabaseClient = await getSupabaseClient();
  return supabaseClient;
}