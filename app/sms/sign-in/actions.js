// app/sms-login/actions.ts

"use server";

import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";


export const signIn = async (formData) => {
  "use server";
  const phone = formData.get("phone");
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  
  const { error } = await supabase.auth.signInWithOtp({
    phone,
  });

  if (error) {
    console.log(error, "error")
    return redirect("/sms/sign-in?message=Could not authenticate user");
  }
  
  return redirect("/sms/sign-in?message=Check your phone for the OTP");
};

export const verifyOTP = async (formData) => {
  "use server";
  console.log("1234444")
  const phone = formData.get("phone");
  const token = formData.get("token");
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { error } = await supabase.auth.verifyOtp({
    phone,
    token,
    type: "sms",
  });

  if (error) {
    console.error(error);
    return redirect("/sms/sign-in?message=Could not authenticate user");
  }

  return redirect("/");
};

export const isPhoneExisted = async (phone) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase
    .from('users')
    .select()
    .eq('phone', phone);

  if (!data || !data.length) {
    return true;
  } else {
    return false;
  }
}

export const isExistedInWaitlist = async (phone) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase
    .from('waitlist')
    .select()
    .eq('phone', phone);

  if (data && data.length) {
    return true;
  } else {
    return false;
  }
}