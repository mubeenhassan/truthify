// app/routes/login.tsx

import type { MetaFunction, ActionFunctionArgs } from "@remix-run/node"; // Or cloudflare/deno
import { redirect } from "@remix-run/node"; // Or cloudflare/deno
import { Form, Link, useActionData } from "@remix-run/react";
import { useState } from "react"; // Import useState

export const meta: MetaFunction = () => {
  return [
    { title: "Login | Truthify" },
    { name: "description", content: "Login to your Truthify account." },
  ];
};

// --- Server-Side Action for Login (No changes here) ---
export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  const errors: { email?: string; password?: string; form?: string } = {};

  // Basic Validation
  if (typeof email !== "string" || !email.includes("@")) {
    errors.email = "Please enter a valid email address.";
  }
  if (typeof password !== "string" || password.length === 0) {
    errors.password = "Password is required.";
  }
  if (Object.keys(errors).length > 0) {
    return Response.json({ errors }, { status: 400 });
  }

  // Login Authentication Logic
  try {
    console.log("Attempting login for:", email);
    // Replace with actual authentication logic
    return redirect("/dashboard");
  } catch (error) {
    console.error("Login failed:", error);
    errors.form = "An error occurred during login. Please try again.";
    return Response.json({ errors }, { status: 500 });
  }
}

// --- Page Component for Login ---
export default function LoginRoute() {
  const actionData = useActionData<typeof action>();
  const currentYear = new Date().getFullYear();
  // --- State for password visibility ---
  const [showPassword, setShowPassword] = useState(false); // Initially hidden

  return (
    // Main container: Consistent styling with create-password
    <div className="flex min-h-screen flex-col items-center bg-sky-950 px-4 py-8 font-['Inter'] text-white sm:px-6 lg:px-8">
      {/* Logo Area */}
      <div className="pt-4 pb-10">
        <img
          className="h-10 w-auto sm:h-12"
          src="/truthify-logo.png"
          alt="Truthify Logo"
        />
      </div>
      {/* Content Wrapper */}
      <div className="flex w-full max-w-md flex-col items-center">
        {/* Back Link: Style matching login image */}
        <div className="w-full mb-8 text-left">
          <Link
            to="/"
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
          <Form method="post" className="flex w-full flex-col gap-5">
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
                  aria-invalid={actionData?.errors?.email ? true : undefined}
                  aria-describedby="email-error"
                  className={`w-full rounded-md border border-transparent bg-white pl-10 pr-4 py-2.5 text-base font-normal leading-tight text-zinc-900 placeholder-gray-400 outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 ${
                    actionData?.errors?.email ? "border-red-500" : ""
                  }`}
                />
              </div>
              {actionData?.errors?.email && (
                <p className="mt-1 text-sm text-red-400" id="email-error">
                  {actionData.errors.email}
                </p>
              )}
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
                  to="/forgot-password"
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
                  aria-invalid={actionData?.errors?.password ? true : undefined}
                  aria-describedby="password-error"
                  // --- Added right padding (pr-10) for the button ---
                  className={`w-full rounded-md border border-transparent bg-white pl-3.5 pr-10 py-2.5 text-base font-normal leading-tight text-zinc-900 placeholder-gray-400 outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 ${
                    actionData?.errors?.password ? "border-red-500" : ""
                  }`}
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
              {actionData?.errors?.password && (
                <p className="mt-1 text-sm text-red-400" id="password-error">
                  {actionData.errors.password}
                </p>
              )}
            </div>

            {/* Display general form error (No changes here) */}
            {actionData?.errors?.form && (
              <p
                className="mt-1 text-sm text-red-400 text-center"
                id="form-error"
              >
                {actionData.errors.form}
              </p>
            )}

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
          </Form>
        </div>
      </div>
      {/* Footer (No changes here) */}
      <footer className="mt-auto w-full max-w-6xl pt-10 pb-6">
        <div className="flex items-center justify-between">
          <div className="text-sm font-normal leading-normal text-white/60">
            © {currentYear} Truthify. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <a
              href="#"
              aria-label="Facebook"
              className="text-white/60 hover:text-white"
            >
              <img
                src="/icons/facebook-white.svg"
                alt="Facebook"
                className="h-5 w-5"
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
                className="h-5 w-5"
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
                className="h-5 w-5"
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
                className="h-5 w-5"
              />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
