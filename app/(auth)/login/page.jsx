"use client";
import AuthHeader from "@/components/sections/global/auth/auth-header";
import Link from "next/link";
import { useState } from "react";

// export const metadata = {
//   title: "Login | Truthify",
//   description:
//     "Login to your Truthify account.",
// };

// --- Page Component for Login ---
export default function Login() {
  const currentYear = new Date().getFullYear();
  // --- State for password visibility ---
  const [showPassword, setShowPassword] = useState(false); // Initially hidden
  return (
    <div className="flex w-full max-w-md flex-col items-center">
      {/* Back Link: Style matching login image */}
      <div className="w-full mb-8 text-left">
        <Link
          href="/"
          className="text-sm font-normal text-white/60 underline hover:text-white"
        >
          Back to homepage
        </Link>
      </div>

      {/* Form Block */}
      <div className="w-full">
        <h1 className="text-center text-3xl font-bold leading-tight mb-8">
          Login to your Account
        </h1>

        {/* Login Form */}
        <form method="post" className="flex w-full flex-col gap-5">
          {/* Email Input (No changes here) */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="email"
              className="text-base font-medium leading-relaxed text-gray-200"
            >
              Email address
            </label>
            <div className="relative">
              <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                <img
                  src="/icons/email.svg"
                  alt=""
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
              <input
                type="email"
                id="email"
                name="email"
                required
                placeholder="Enter your email address"
                autoComplete="email"
                aria-describedby="email-error"
                className={`w-full rounded-md border border-transparent bg-white pl-10 pr-4 py-2.5 text-base font-normal leading-tight text-zinc-900 placeholder-gray-400 outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 `}
              />
            </div>
          </div>

          {/* Password Input (Modified for visibility toggle) */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="text-base font-medium leading-relaxed text-gray-200"
              >
                Password
              </label>
              <Link
                href="/forgot-password"
                className="text-sm font-medium text-cyan-400 hover:text-cyan-300 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>
            <div className="relative">
              <input
                // --- Dynamically set input type based on state ---
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                required
                placeholder="Enter your password"
                autoComplete="current-password"
                aria-describedby="password-error"
                // --- Added right padding (pr-10) for the button ---
                className={`w-full rounded-md border border-transparent bg-white pl-3.5 pr-10 py-2.5 text-base font-normal leading-tight text-zinc-900 placeholder-gray-400 outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 `}
              />
              {/* --- Visibility Toggle Button --- */}
              <button
                type="button" // Prevent form submission
                onClick={() => setShowPassword((prev) => !prev)} // Toggle state
                className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-gray-500 hover:text-gray-700 focus:outline-none"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {/* --- Conditional SVG Icon --- */}
                {showPassword ? (
                  <img
                    src="/icons/eye-slash.svg"
                    alt="Hide password"
                    className="h-5 w-5"
                  />
                ) : (
                  <img
                    src="/icons/eye-slash.svg"
                    alt="Show password"
                    className="h-5 w-5"
                  />
                )}
              </button>
            </div>
          </div>

          {/* Login Button (No changes here) */}
          <button
            type="submit"
            className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-md bg-sky-500 px-6 py-3 text-base font-semibold leading-tight text-white hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-sky-950 disabled:opacity-50"
          >
            Login
            <img
              src="/icons/arrow-right.svg"
              alt=""
              className="h-4 w-4"
              aria-hidden="true"
            />
          </button>
        </form>
      </div>
    </div>
  );
}
