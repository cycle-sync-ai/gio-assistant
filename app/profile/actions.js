// app/sms-login/actions.ts
"use server";

import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/config/authOptions"
import { findAndUpdateTokenByIdAndType } from "../../api-lib/db/token";

export const getUser = async () => {
"use server";
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/sms/sign-in/?message=Could not authenticate user")
    return null;
  }

  return user;
};

export const saveCredential = async () => {

  const session = await getServerSession(authOptions)
  if (!session) {
    return;
  }
  const token = session.token;

  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: { user } } = await supabase.auth.getUser();
  if(!user) {
    return;
  }

  await findAndUpdateTokenByIdAndType(supabase, token, user.id, token.provider)

  return;
}