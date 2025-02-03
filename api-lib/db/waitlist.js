
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";

export const addPhoneNumberIntoWaitlist = async (phoneNumber) => {

  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const phone = phoneNumber.replace(/\D/g, '');

  await supabase
    .from('waitlist')
    .insert('phone', phone);
  return;
}