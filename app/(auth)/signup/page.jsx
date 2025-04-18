import Link from "next/link";
import React from "react";

const Signup = () => {
  return (
    <div className="flex w-full max-w-md flex-col items-center gap-6 rounded-lg bg-sky-950">
      <h1 className="text-3xl font-bold leading-10">Create an account</h1>

      <form method="post" className="flex w-full flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label
            htmlFor="name"
            className="text-base font-medium leading-relaxed"
          >
            Your name
          </label>
          <div className="relative flex items-center">
            <span className="pointer-events-none absolute left-4">
              <img
                src="/icons/user.svg"
                alt=""
                className="h-5 w-5"
                aria-hidden="true"
              />
            </span>
            <input
              type="text"
              id="name"
              name="name"
              required
              placeholder="Enter your name"
              className="w-full rounded-lg border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm leading-tight text-zinc-800 placeholder-zinc-800/50 outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            />
          </div>
          {/* Error messages could be conditionally rendered here using state */}
        </div>

        {/* Email Input */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="email"
            className="text-base font-medium leading-relaxed"
          >
            Email address
          </label>
          <div className="relative flex items-center">
            <span className="pointer-events-none absolute left-4">
              <img
                src="/icons/email.svg"
                alt=""
                className="h-5 w-5"
                aria-hidden="true"
              />
            </span>
            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder="Enter your email address"
              className="w-full rounded-lg border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm leading-tight text-zinc-800 placeholder-zinc-800/50 outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            />
          </div>
          {/* Error messages could be conditionally rendered here */}
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="phone"
            className="text-base font-medium leading-relaxed"
          >
            Phone number <span className="text-white/60">(Optional)</span>
          </label>
          <div className="relative flex items-center">
            <span className="pointer-events-none absolute left-4">
              <img
                src="/icons/phone.svg"
                alt=""
                className="h-5 w-5"
                aria-hidden="true"
              />
            </span>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="Enter your phone number"
              className="w-full rounded-lg border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm leading-tight text-zinc-800 placeholder-zinc-800/50 outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            />
          </div>
        </div>

        <div className="mt-2 flex items-center gap-3">
          <input
            type="checkbox"
            id="terms"
            name="terms"
            required
            className="h-5 w-5 rounded border border-slate-300 bg-white text-sky-500 shadow-sm focus:ring-sky-500"
          />
          <label htmlFor="terms" className="text-sm leading-relaxed text-white">
            By creating account, you agree to our{" "}
            <Link href="/terms" className="text-sky-500 underline">
              Terms of conditions
            </Link>
          </label>
        </div>
        {/* Error message for terms could be rendered here */}

        <button
          type="submit"
          className="mt-4 inline-flex w-full items-center justify-center gap-2.5 rounded-lg bg-sky-500 px-8 py-4 text-lg font-semibold leading-tight text-white hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-sky-950 disabled:opacity-50"
        >
          Join Now
          <img
            src="/icons/arrow-right.svg"
            alt=""
            className="h-5 w-5"
            aria-hidden="true"
          />
        </button>
      </form>

      <div className="my-4 flex w-full items-center gap-4">
        <div className="h-px flex-grow bg-neutral-100/50"></div>
        <div className="text-center text-xs font-normal text-zinc-400">Or</div>
        <div className="h-px flex-grow bg-neutral-100/50"></div>
      </div>

      <div className="flex w-full flex-col gap-4">
        <button
          type="button"
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-white px-6 py-3 text-base font-medium text-black shadow-[0px_4px_10px_0px_rgba(0,0,0,0.08)] hover:bg-gray-50"
        >
          <img
            src="/icons/google-color.svg"
            alt="Google logo"
            className="h-6 w-6"
          />
          Register with Google
        </button>

        <button
          type="button"
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-white px-6 py-3 text-base font-medium text-black shadow-[0px_4px_10px_0px_rgba(0,0,0,0.08)] hover:bg-gray-50"
        >
          <img
            src="/icons/microsoft.svg"
            alt="Microsoft logo"
            className="h-6 w-6"
          />
          Register with Microsoft
        </button>
      </div>

      {/* Login Link */}
      <div className="mt-6 text-center">
        <span className="text-base font-medium leading-relaxed text-white">
          Already have an account?{" "}
        </span>
        <Link
          href="/login"
          className="text-base font-bold leading-relaxed text-sky-500 hover:underline"
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default Signup;
