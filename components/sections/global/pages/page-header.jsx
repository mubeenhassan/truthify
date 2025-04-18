import Link from "next/link";

const PageHeader = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur-sm">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8 h-20">
        <div className="flex items-center gap-12">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Truthify</span>
            <img
              className="h-10 w-auto" 
              src="/truthify-logo.png" 
              alt="Truthify Logo"
            />
          </Link>
          <div className="hidden lg:flex lg:gap-x-12">
            <Link
              href="/scores"
              className="text-base font-medium leading-6 text-neutral-800 hover:text-sky-600"
            >
              {" "}
              Scores{" "}
            </Link>
            <Link
              href="/about"
              className="text-base font-medium leading-6 text-neutral-800 hover:text-sky-600"
            >
              {" "}
              About Us{" "}
            </Link>
            <Link
              href="/how-it-works"
              className="text-base font-medium leading-6 text-neutral-800 hover:text-sky-600"
            >
              {" "}
              How It Works{" "}
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <Link
            href="/login"
            className="hidden sm:flex items-center gap-2 text-base font-medium leading-6 text-neutral-800 hover:text-sky-600"
          >
            <img src="/icons/lock.svg" alt="" className="h-5 w-5" />
            Sign In
          </Link>
          <Link
            href="/signup"
            className="rounded-md bg-sky-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-sky-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 inline-flex items-center gap-2"
          >
            Sign Up Now
            <img src="/icons/arrow-right.svg" alt="" className="h-4 w-4" />
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default PageHeader;
