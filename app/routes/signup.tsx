// app/routes/signup.jsx
import { Link, Form } from "@remix-run/react";

export default function SignupPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-sky-950 p-8 font-['Inter'] text-white">
      <div className="mx-auto flex w-full max-w-lg flex-col items-center gap-8 md:max-w-xl lg:max-w-2xl">
        {/* Logo */}
        <img
          className="h-14 w-auto"
          src="/truthify-logo.png" // Path relative to the public directory
          alt="Truthify Logo"
        />

        {/* Back Link */}
        <Link
          to="/"
          className="text-base text-white/60 underline hover:text-white"
        >
          Back to homepage
        </Link>

        {/* Main Content Area */}
        <div className="flex w-full max-w-md flex-col items-center gap-6 rounded-lg bg-sky-950">
          <h1 className="text-3xl font-bold leading-10">Create an account</h1>

          {/* --- Sign Up Form --- */}
          {/* The Remix <Form> component handles submission */}
          <Form method="post" className="flex w-full flex-col gap-4">
            {/* Name Input */}
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
                  required // HTML5 validation: field must be filled
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
                  type="email" // HTML5 validation: basic email format check
                  id="email"
                  name="email"
                  required // HTML5 validation: field must be filled
                  placeholder="Enter your email address"
                  className="w-full rounded-lg border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm leading-tight text-zinc-800 placeholder-zinc-800/50 outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                />
              </div>
              {/* Error messages could be conditionally rendered here */}
            </div>

            {/* Phone Input */}
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
                  type="tel" // Suggests numeric input for phone
                  id="phone"
                  name="phone"
                  placeholder="Enter your phone number"
                  className="w-full rounded-lg border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm leading-tight text-zinc-800 placeholder-zinc-800/50 outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                />
                {/* Note: No 'required' attribute, making it optional */}
              </div>
            </div>

            {/* Terms Agreement */}
            <div className="mt-2 flex items-center gap-3">
              <input
                type="checkbox"
                id="terms"
                name="terms"
                required // HTML5 validation: checkbox must be checked
                className="h-5 w-5 rounded border border-slate-300 bg-white text-sky-500 shadow-sm focus:ring-sky-500"
              />
              <label
                htmlFor="terms"
                className="text-sm leading-relaxed text-white"
              >
                By creating account, you agree to our{" "}
                <Link to="/terms" className="text-sky-500 underline">
                  Terms of conditions
                </Link>
              </label>
            </div>
            {/* Error message for terms could be rendered here */}

            {/* Submit Button */}
            <button
              type="submit"
              className="mt-4 inline-flex w-full items-center justify-center gap-2.5 rounded-lg bg-sky-500 px-8 py-4 text-lg font-semibold leading-tight text-white hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-sky-950 disabled:opacity-50"
              // Example: Button could be disabled based on JS validation state:
              // disabled={!isFormValid}
            >
              Join Now
              <img
                src="/icons/arrow-right.svg"
                alt=""
                className="h-5 w-5"
                aria-hidden="true"
              />
            </button>
          </Form>
          {/* --- End Sign Up Form --- */}

          {/* --- Separator --- */}
          <div className="my-4 flex w-full items-center gap-4">
            <div className="h-px flex-grow bg-neutral-100/50"></div>
            <div className="text-center text-xs font-normal text-zinc-400">
              Or
            </div>
            <div className="h-px flex-grow bg-neutral-100/50"></div>
          </div>

          {/* --- Social Logins --- */}
          <div className="flex w-full flex-col gap-4">
            {/* Backend Note: Implement corresponding OAuth flows */}
            <button
              type="button"
              // onClick={() => handleGoogleSignup()} // Placeholder for OAuth initiation
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
              // onClick={() => handleMicrosoftSignup()} // Placeholder for OAuth initiation
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
              to="/login"
              className="text-base font-bold leading-relaxed text-sky-500 hover:underline"
            >
              Login
            </Link>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 w-full max-w-4xl border-t border-white/10 pt-6">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="text-sm font-normal leading-normal text-white/60">
              © {new Date().getFullYear()} Truthify. All rights reserved.
            </div>
            <div className="flex items-center gap-6">
              {/* Links updated to # as placeholders */}
              <a
                href="#"
                aria-label="Facebook"
                className="text-white/60 hover:text-white"
              >
                <img
                  src="/icons/facebook-white.svg"
                  alt="Facebook"
                  className="h-6 w-6"
                />
              </a>
              <a
                href="#"
                aria-label="Google"
                className="text-white/60 hover:text-white"
              >
                <img
                  src="/icons/google-white.svg"
                  alt="Google"
                  className="h-6 w-6"
                />
              </a>
              <a
                href="#"
                aria-label="Apple"
                className="text-white/60 hover:text-white"
              >
                <img
                  src="/icons/apple-white.svg"
                  alt="Apple"
                  className="h-6 w-6"
                />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="text-white/60 hover:text-white"
              >
                <img
                  src="/icons/instagram-white.svg"
                  alt="Instagram"
                  className="h-6 w-6"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
