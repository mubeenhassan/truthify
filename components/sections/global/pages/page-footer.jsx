import Link from "next/link";

const PageFooter = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-slate-900 text-white/60 pt-16 pb-8 sm:pt-24 sm:pb-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-14 md:grid-cols-2 lg:grid-cols-4 xl:gap-8">
          <div className="md:col-span-2 lg:col-span-1">
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Truthify</span>
              <img
                className="h-10 w-auto"
                src="/truthify-logo.png"
                alt="Truthify Logo"
              />
            </Link>
            <p className="mt-6 text-base leading-6">
              123 Market St. #22B <br />
              Charlottesville, California 44635
            </p>
            <div className="mt-8 flex items-center gap-4">
              <img src="/icons/emergency-call.svg" alt="" className="h-6 w-6" />
              <div>
                <p className="text-xs tracking-tight">Email Us</p>
                <a
                  href="mailto:email@gmail.com"
                  className="text-base font-semibold text-white hover:text-sky-300"
                >
                  email@gmail.com
                </a>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 md:col-span-2 lg:col-span-3 lg:grid-cols-3">
            <div>
              <h3 className="text-base font-medium leading-6 text-white">
                Who we are
              </h3>
              <ul className="mt-6 space-y-3">
                <li>
                  <Link
                    href="/about"
                    className="text-base leading-6 hover:text-white"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="/how-it-works"
                    className="text-base leading-6 hover:text-white"
                  >
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link
                    href="/signup"
                    className="text-base leading-6 hover:text-white"
                  >
                    Sign Up
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-base font-medium leading-6 text-white">
                Services
              </h3>
              <ul className="mt-6 space-y-3">
                <li>
                  <Link
                    href="/finance"
                    className="text-base leading-6 hover:text-white"
                  >
                    Finance
                  </Link>
                </li>
                <li>
                  <Link
                    href="/executive-scores"
                    className="text-base leading-6 hover:text-white"
                  >
                    Business Executives Scores
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-base font-medium leading-6 text-white">
                Resources
              </h3>
              <ul className="mt-6 space-y-3">
                <li>
                  <Link
                    href="/privacy"
                    className="text-base leading-6 hover:text-white"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="text-base leading-6 hover:text-white"
                  >
                    Terms of Use
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-white/10 pt-8 sm:mt-20 lg:mt-24 flex flex-col sm:flex-row justify-between items-center gap-6">
          <p className="text-sm leading-5">
            &copy; {currentYear} Truthify. All rights reserved.
          </p>
          <div className="flex space-x-5">
            <a href="#" className="hover:text-white">
              <span className="sr-only">Facebook</span>
              <img
                src="/icons/facebook-white.svg"
                alt="Facebook"
                className="h-6 w-6"
              />
            </a>
            <a href="#" className="hover:text-white">
              <span className="sr-only">Google</span>
              <img
                src="/icons/google-white.svg"
                alt="Google"
                className="h-6 w-6"
              />
            </a>
            <a href="#" className="hover:text-white">
              <span className="sr-only">Apple</span>
              <img
                src="/icons/apple-white.svg"
                alt="Apple"
                className="h-6 w-6"
              />
            </a>
            <a href="#" className="hover:text-white">
              <span className="sr-only">Instagram</span>
              <img
                src="/icons/instagram-white.svg"
                alt="Instagram"
                className="h-6 w-6"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default PageFooter;
