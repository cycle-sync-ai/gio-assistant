import { GeistSans } from "geist/font/sans";
import 'react-toastify/dist/ReactToastify.css';
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import '@/common/assets/css/flaticon.css';
// import '../containers/CryptoModern/CountDown/timer.css';
import '@/common/assets/css/icon-example-page.css';
// swiper bundle styles
import 'swiper/css/bundle';
import '@/common/assets/css/react-slick.css';
import '@/common/assets/css/rc-collapse.css';
import 'rc-collapse/assets/index.css';
import '@/common/assets/css/rc-drawer.css';
import { ToastContainer } from "react-toastify";

import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Manage credentials with security",
  description: "Gio project",
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {

  const cookieStore = cookies();

  const canInitSupabaseClient = () => {
    // This function is just for the interactive tutorial.
    // Feel free to remove it once you have Supabase connected.
    try {
      createClient(cookieStore);
      return true;
    } catch (e) {
      return false;
    }
  };

  const isSupabaseConnected = canInitSupabaseClient();

  return (
    <html lang="en" className={GeistSans.className}>
      <head>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Manrope:wght@700;800&display=swap"
        />
      </head>
      <body className="bg-background text-foreground">
        <ToastContainer />
        {children}
      </body>
    </html>
  );
}