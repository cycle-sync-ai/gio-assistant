// app/sms-login/actions.ts

"use server";

import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { insertUser } from "@/api-lib/db/user"
import { toast } from "react-toastify";
import { createToken } from "../../../api-lib/db/token";

export const signUp = async (formData) => {
  "use server";
  const phone = formData.get("phone").replace(/\D/g, '');
  const name = formData.get("name");
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { error } = await supabase.auth.signInWithOtp({
    phone,
    options: {
      data: {
        name,
        phone,
        credentials:'{}'
      },
    },
  });

  if (error) {
    console.log(error, "error")
    return redirect("/sms/sign-up?message=Could not authenticate user");
  }

  return redirect("/sms/sign-up?message=Check your phone for the OTP");
};

export const verifyOTP = async (formData) => {
  "use server";
  const phone = formData.get("phone").replace(/\D/g, '');
  const name = formData.get("name");
  
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
    return redirect("/sms/sign-up?message=Could not authenticate user");
  }

  const { data: { user } } = await supabase.auth.getUser();

  await insertUser(supabase, {
    id: user.id,
    name,
    phone
  })

  await createToken(supabase, user.id);
  
  return redirect("/profile");
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