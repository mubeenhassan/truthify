import Link from "next/link";

const CreatePassword = () => {
  return (
    <div className="flex w-full max-w-md flex-col items-center">
      <div className="w-full mb-8 text-left">
        <Link
          href="/"
          className="text-base text-white/60 underline hover:text-white"
        >
          Back to homepage
        </Link>
      </div>

      <div className="w-full">
        <h1 className="text-center text-3xl font-bold leading-tight mb-8">
          Create your Password
        </h1>

        <form method="post" className="flex w-full flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="password"
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
              aria-describedby="password-error"
              className={`w-full rounded-md border border-transparent bg-white px-4 py-2.5 text-base font-normal leading-tight text-zinc-900 placeholder-zinc-500 outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 `}
            />
          </div>

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
              aria-describedby="confirmPassword-error"
              className={`w-full rounded-md border border-transparent bg-white px-4 py-2.5 text-base font-normal leading-tight text-zinc-900 placeholder-zinc-500 outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500`}
            />
          </div>

          <button
            type="submit"
            className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-md bg-sky-500 px-6 py-3 text-base font-semibold leading-tight text-white hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-sky-950 disabled:opacity-50"
          >
            Submit
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
};

export default CreatePassword;
