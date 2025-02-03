"use server"

import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";


export const getIsLogined = async () => {

  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  
  const { data: { user } } = await supabase.auth.getUser();

  if (user) {
    return true;
  } else {
    return false
  }
}
