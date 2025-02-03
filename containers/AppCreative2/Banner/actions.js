"use server"

import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";

import { parsePhoneNumberFromString } from 'libphonenumber-js';

export const addPhoneNumberIntoWaitlist = async (phoneNumber) => {

  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const phone = phoneNumber.replace(/\D/g, '');

  const { data: waiter, error } = await supabase
    .from('waitlist')
    .select()
    .eq('phone', phone);

  if (!waiter || error || waiter.length > 1) {
    return JSON.stringify(waiter);
  }

  const { data, error: insertError } = await supabase
    .from('waitlist')
    .insert({ 'phone': phone })
  if (insertError) {
    return false;
  }

  return true;
}
// Function to format phone number to E.164 format

