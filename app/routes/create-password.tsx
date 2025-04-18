import type { ActionFunctionArgs } from "@remix-run/node"; // Or cloudflare/deno
import { redirect } from "@remix-run/node"; // Or cloudflare/deno
import { Form, Link, useActionData } from "@remix-run/react";

// --- Server-Side Action (remains the same) ---
export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const password = formData.get("password");
  const confirmPassword = formData.get("confirmPassword");
  const errors: { password?: string; confirmPassword?: string; form?: string } =
    {};

  // Validation
  if (typeof password !== "string" || password.length === 0) {
    errors.password = "New Password is required.";
  } else if (password.length < 8) {
    errors.password = "Password must be at least 8 characters long.";
  }

  if (typeof confirmPassword !== "string" || confirmPassword.length === 0) {
    errors.confirmPassword = "Please re-type your password.";
  } else if (password !== confirmPassword) {
    errors.confirmPassword = "Passwords do not match.";
  }

  if (Object.keys(errors).length > 0) {
    return Response.json({ errors }, { status: 400 });
  }

  // Password Update Logic
  try {
    console.log("Attempting to update password...");
    // await updateUserPassword(userId, password); // Replace with actual logic

    // Redirect on Success
    return redirect("/password-updated-success"); // Or '/login'
  } catch (error) {
    console.error("Password update failed:", error);
    errors.form = "Failed to update password. Please try again later.";
    return Response.json({ errors }, { status: 500 });
  }
}

// --- Page Component ---
export default function CreatePasswordRoute() {
  const actionData = useActionData<typeof action>();
  const currentYear = new Date().getFullYear(); // Use dynamic year

  return (
    // Main container: Dark background, full height flex column
    <div className="flex min-h-screen flex-col items-center bg-sky-950 px-4 py-8 font-['Inter'] text-white sm:px-6 lg:px-8">
      {/* Logo Area */}
      <div className="pt-4 pb-10">
        {" "}
        {/* Adjusted vertical spacing */}
        <img
          className="h-10 w-auto sm:h-12" // Slightly smaller logo, responsive
          src="/truthify-logo.png" // Direct path relative to public folder
          alt="Truthify Logo"
        />
      </div>
      {/* Content Wrapper: Centers the main block */}
      <div className="flex w-full max-w-md flex-col items-center">
        {/* Back Link: Positioned above the form, left-aligned relative to form block */}
        <div className="w-full mb-8 text-left">
          {" "}
          {/* Aligned left within the max-w-md container */}
          <Link
            to="/"
            // Lighter blue/cyan text, underlined, matches image style
            className="text-base text-white/60 underline hover:text-white"
          >
            Back to homepage {/* Removed arrow */}
          </Link>
        </div>

        {/* Form Block */}
        <div className="w-full">
          <h1 className="text-center text-3xl font-bold leading-tight mb-8">
            {" "}
            {/* Adjusted leading */}
            Create your Password
          </h1>

          {/* Create Password Form */}
          <Form method="post" className="flex w-full flex-col gap-5">
            {/* New Password Input */}
            <div className="flex flex-col gap-1.5">
              {" "}
              {/* Slightly smaller gap */}
              <label
                htmlFor="password"
                // Slightly lighter text than pure white, matches label appearance
                className="text-base font-medium leading-relaxed text-gray-200"
              >
                New Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                required
                autoComplete="new-password"
                aria-invalid={actionData?.errors?.password ? true : undefined}
                aria-describedby="password-error"
                // White bg, slightly rounded, less padding, subtle border on focus, text color
                className={`w-full rounded-md border border-transparent bg-white px-4 py-2.5 text-base font-normal leading-tight text-zinc-900 placeholder-zinc-500 outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 ${
                  actionData?.errors?.password ? "border-red-500" : "" // Only border if error
                }`}
              />
              {actionData?.errors?.password && (
                <p className="mt-1 text-sm text-red-400" id="password-error">
                  {actionData.errors.password}
                </p>
              )}
            </div>

            {/* Re-type New Password Input */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="confirmPassword"
                className="text-base font-medium leading-relaxed text-gray-200"
              >
                Re-type New Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                required
                autoComplete="new-password"
                aria-invalid={
                  actionData?.errors?.confirmPassword ? true : undefined
                }
                aria-describedby="confirmPassword-error"
                className={`w-full rounded-md border border-transparent bg-white px-4 py-2.5 text-base font-normal leading-tight text-zinc-900 placeholder-zinc-500 outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 ${
                  actionData?.errors?.confirmPassword ? "border-red-500" : "" // Only border if error
                }`}
              />
              {actionData?.errors?.confirmPassword && (
                <p
                  className="mt-1 text-sm text-red-400"
                  id="confirmPassword-error"
                >
                  {actionData.errors.confirmPassword}
                </p>
              )}
            </div>

            {/* Display general form error */}
            {actionData?.errors?.form && (
              <p className="text-sm text-red-400 text-center" id="form-error">
                {actionData.errors.form}
              </p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              // Bright blue bg, slightly less vertical padding, font matching image
              className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-md bg-sky-500 px-6 py-3 text-base font-semibold leading-tight text-white hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-sky-950 disabled:opacity-50"
            >
              Submit
              {/* Arrow Icon - check path */}
              <img
                src="/icons/arrow-right.svg" // Ensure this path is correct
                alt=""
                className="h-4 w-4" // Slightly smaller arrow icon to match image
                aria-hidden="true"
              />
            </button>
          </Form>
        </div>
      </div>{" "}
      {/* End Content Wrapper */}
      {/* Footer: Pushed to bottom, specific layout */}
      <footer className="mt-auto w-full max-w-6xl pt-10 pb-6">
        {" "}
        {/* Use mt-auto to push down */}
        {/* No border-top */}
        <div className="flex items-center justify-between">
          {" "}
          {/* Align items left and right */}
          {/* Copyright: Left aligned */}
          <div className="text-sm font-normal leading-normal text-white/60">
            © {currentYear} Truthify. All rights reserved.
          </div>
          {/* Social Icons: Right aligned, smaller gap, smaller icons */}
          <div className="flex items-center gap-4">
            {" "}
            {/* Smaller gap */}
            {/* Assuming Facebook, Google, Apple, Instagram based on common icons */}
            <a
              href="#"
              aria-label="Facebook"
              className="text-white/60 hover:text-white"
            >
              <img
                src="/icons/facebook-white.svg"
                alt="Facebook"
                className="h-5 w-5"
              />{" "}
              {/* Smaller icons */}
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
    </div> // End Main Container
  );
}
