import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { cookies } from "next/headers";

export default async function ProfileButton() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <>
      {
        user ?
          <Link
            className="py-2 px-3 flex rounded-md no-underline hover:bg-btn-background-hover border"
            href={'/profile'}>Profile</Link>
          : <></>
      }
    </>
  );
}
