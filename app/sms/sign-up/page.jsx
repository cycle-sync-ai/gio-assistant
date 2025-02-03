"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

import { signUp, verifyOTP, isPhoneExisted } from "./actions";

export default function SMSLogin({
  searchParams,
}) {
  const [otpSent, setOtpSent] = useState(false);
  const router = useRouter();
  // const onSubmit =

  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-xl justify-center gap-2">
      <Link
        href="/"
        className="absolute left-8 top-28 py-2 px-4 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover flex items-center group text-sm"
      >
        <svg
          className="w-4 h-4 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            className="inline-flex"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          ></path>
        </svg>
        Back
      </Link>
      <h1 className="text-4xl font-bold">Sign up using phone number</h1>
      <p className="text-foreground">
        {searchParams.message || "Sign in to your account"}
      </p>
      <form
        action={async (formData) => {
          // async (formData) => {
          console.log("123")
          if (formData.get('name') === '' || formData.get('phone') === '') {
            toast.error('Please fill in all fields!');
            return;
          }

          if (!await isPhoneExisted(formData.get('phone').replace(/\D/g, ''))) {
            toast.error('You already have an account!');
            router.push("/sms/sign-in");
            return;
          }

          if (otpSent) {
            await verifyOTP(formData);
          } else {
            try {
              await signUp(formData);
              setOtpSent(true);
            } catch (e) {
              console.error(e);
            }
          }
          // }
        }}
        className="flex flex-col gap-2"
      >
        <label htmlFor="name" className="flex flex-col gap-1">
          <span className="text-foreground">Full Name</span>
          <input
            type="text"
            name="name"
            id="name"
            className="rounded-md px-4 py-2 bg-inherit border mb-2"
            placeholder="James John"
            defaultValue="James John"
          />
        </label>
        <label htmlFor="phone" className="flex flex-col gap-1">
          <span className="text-foreground">Phone</span>
          <input
            type="tel"
            name="phone"
            id="phone"
            className="rounded-md px-4 py-2 bg-inherit border mb-2"
            placeholder="+990 01234567"
            defaultValue=""
          />
        </label>
        {
          otpSent &&
          <label
            htmlFor="token"
            className={`flex flex-col gap-1 ${otpSent ? "" : "hidden"}`}
          >
            <span className="text-foreground">Your OTP</span>
            <input
              type="text"
              id="token"
              name="token"
              required
              placeholder="123456"
              className={`rounded-md px-4 py-2 bg-inherit border mb-2`}
            />
          </label>
        }
        <button
          type="submit"
          className="bg-green-700 rounded-md px-4 py-2 text-foreground mb-2 max-w-max hover:bg-green-600"
        >
          {otpSent ? "Verify OTP" : "Send OTP"}
        </button>
        {otpSent && <ExpirationTimer />}
      </form>
    </div>
  );
}

const ExpirationTimer = () => {
  const expirationTime = 60;
  const [timeLeft, setTimeLeft] = useState(expirationTime);

  let id = null;

  useEffect(() => {
    if (timeLeft > 0) {
      id = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    }
    return () => {
      clearTimeout(id);
    };
  }, [timeLeft]);

  return (
    <div className="flex justify-between items-center">
      <p className="text-foreground text-sm">
        {timeLeft > 0 ? `OTP expires in ${timeLeft} seconds` : "OTP expired!"}
      </p>
      <button
        className="text-foreground text-sm underline disabled:text-foreground/50 disabled:cursor-not-allowed"
        formAction={async (formData) => {
          await signIn(formData);
          setTimeLeft(expirationTime);
        }}
        disabled={timeLeft > 0}
      >
        Resend OTP
      </button>
    </div>
  );
};