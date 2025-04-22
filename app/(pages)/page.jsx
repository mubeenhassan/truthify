import Link from "next/link";

export const metadata = {
  title: "Truthify | AI-Powered Integrity Reports for Businesses",
  description:
    "Truthify uses AI to analyze statements for reliability and consistency. Get integrity reports for businesses and individuals.",
};

// Helper component for buttons to avoid repetition
function ButtonLink({
  to = "/",
  variant = "primary",
  children,
  className = "",
}) {
  const baseStyle =
    "inline-flex items-center justify-center gap-2.5 rounded-lg px-8 py-4 text-lg font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";
  let variantStyle = "";

  switch (variant) {
    case "secondary": // White bg, dark text
      variantStyle =
        "bg-white text-neutral-800 hover:bg-gray-100 focus:ring-sky-400 focus:ring-offset-white";
      break;
    case "white": // White bg, dark text (alias for secondary)
      variantStyle =
        "bg-white text-neutral-800 hover:bg-gray-100 focus:ring-sky-400 focus:ring-offset-white";
      break;
    case "primary": // Blue bg, white text
    default:
      variantStyle =
        "bg-sky-500 text-white hover:bg-sky-600 focus:ring-sky-400 focus:ring-offset-white";
  }

  return (
    <Link href={to} className={`${baseStyle} ${variantStyle} ${className}`}>
      {children}
      {/* Arrow icon often used */}
      <img
        src={
          variant === "white"
            ? "/icons/arrow-right-black.svg"
            : "/icons/arrow-right.svg"
        }
        alt=""
        className="h-5 w-5"
      />
    </Link>
  );
}

export default function Index() {
  // --- Mock Data (Replace with actual data fetching if needed) ---
  const features = [
    { name: "Conceptual", icon: "/icons/feature-conceptual.svg" },
    { name: "Consistency", icon: "/icons/feature-consistency.svg" },
    { name: "Logical", icon: "/icons/feature-logical.svg" },
    { name: "Score Aggregation", icon: "/icons/feature-aggregation.svg" },
    { name: "Fair", icon: "/icons/feature-fair.svg" },
  ];

  const benefits = [
    "Exclusive Insights & Analysis",
    "Actionable Strategies",
    "Early Access & Updates",
  ];

  const howItWorksSteps = [
    {
      num: "01",
      title: "Unlock a Profile or Upload Your Content",
      desc: "Paste or upload any text, article, video, or audio for analysis.",
    },
    {
      num: "02",
      title: "AI-Powered Detection",
      desc: "Our advanced algorithm scans for blatant falsehoods, contradictions, logical cohesion, fallacies, and sentiment patterns to provide a comprehensive breakdown.",
    },
    {
      num: "03",
      title: "Detailed Insights & Scoring",
      desc: "Receive an in-depth integrity report that highlights strengths, weaknesses, and areas for improvement, helping you refine your reasoning and decision-making.",
    },
    {
      num: "04",
      title: "Continuous Learning & Updates",
      desc: "Our AI evolves over time, improving accuracy and adapting to new patterns in misinformation, debate strategies, and logical structures.",
    },
    {
      num: "05", // Added a number for consistency, matching visual grouping
      title: "Results",
      desc: "Get instant, data-driven clarity on any argument—because truth matters!",
    },
  ];

  const profiles = [
    {
      name: "Satya Nadella",
      title: "CEO of Microsoft",
      score: "78%",
      logo: "/icons/microsoft.svg",
      avatar: "/images/avatar-satya.png",
    },
    {
      name: "Sundar Pichai",
      title: "CEO of Google",
      score: "77%",
      logo: "/icons/google-color.svg",
      avatar: "/images/avatar-sundar.png",
    },
    {
      name: "Jensen Huang",
      title: "President of NVIDIA",
      score: "72%",
      logo: "/images/nvidia.png",
      avatar: "/images/avatar-jensen.png",
    },
    {
      name: "Elon Musk",
      title: "CEO of Tesla Motors",
      score: "63%",
      logo: "/images/tesla.png",
      avatar: "/images/avatar-elon.png",
    },
  ];
  // ------------------------------------------------------------

  return (
    <main>
      {/* --- Hero Section --- */}
      <section className="relative isolate overflow-hidden bg-white pt-8 pb-12 sm:pt-12 sm:pb-16">
        <div className="absolute inset-y-0 right-0 -z-10 w-full lg:w-1/2">
          {" "}
          <div className="absolute inset-0 bg-gradient-to-bl from-sky-400 to-sky-600 opacity-90" />{" "}
        </div>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:grid lg:max-w-none lg:grid-cols-2 lg:gap-x-16 lg:gap-y-6 xl:grid-cols-1 xl:grid-rows-1 xl:gap-x-8">
            <div className="mt-6 max-w-xl lg:mt-0 xl:col-end-1 xl:row-start-1 self-center">
              <p className="text-base font-bold uppercase leading-7 text-sky-600 tracking-wider">
                {" "}
                Welcome to Truthify{" "}
              </p>
              <h1 className="mt-3 text-5xl font-extrabold tracking-tight text-zinc-900 sm:text-6xl leading-[1.1]">
                {" "}
                Integrity Reports for Businesses{" "}
              </h1>
              <p className="mt-6 text-lg leading-8 text-zinc-700">
                {" "}
                We use AI to analyze an individual's statements and measure them
                for reliability and consistency.{" "}
              </p>
              <div className="mt-10 flex items-center gap-x-6">
                {" "}
                <ButtonLink href="/signup" variant="primary">
                  Join Now
                </ButtonLink>{" "}
              </div>
            </div>
            {/* Hero Image/Graphic */}
            {/* Simplified container, removing max-w overrides */}
            <div className="xl:row-span-2 xl:row-end-2 xl:mt-16 flex justify-center items-center">
              {" "}
              {/* Added flex centering */}
              <img
                src="/images/hero-graphic.png"
                alt="Truthify platform illustration showing profiles and scores"
                // --- MODIFIED: Changed max-w-xl to max-w-lg ---
                className="w-full max-w-lg rounded-xl h-auto"
                // Now using max-w-lg (32rem). Next smaller step is max-w-md (28rem).
              />
            </div>
          </div>
        </div>
      </section>

      {/* --- Features/Metrics Bar --- */}
      <section className="bg-slate-100 py-16">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 text-center md:grid-cols-3 lg:grid-cols-5">
            {features.map((feature) => (
              <div
                key={feature.name}
                className="flex flex-col items-center gap-4"
              >
                <img src={feature.icon} alt="" className="h-12 w-12" />{" "}
                {/* Adjust size */}
                <p className="text-base font-medium text-zinc-800">
                  {feature.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- AI Analysis Section --- */}
      <section className="relative py-24 sm:py-32">
        {/* Optional: Add subtle background pattern image */}
        {/* <img src="/images/wave-pattern.png" alt="" className="absolute inset-0 h-full w-full object-cover opacity-30 -z-10" /> */}
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
          <h2 className="text-4xl font-extrabold text-zinc-900 sm:text-5xl leading-[1.2]">
            AI-Powered Integrity Analysis
          </h2>
          <p className="mt-6 text-lg leading-7 text-zinc-700">
            Enhance your decision-making with cutting-edge AI and machine
            learning. Our advanced algorithm analyses for reliability and
            credibility in every report. Get deeper insights, eliminate
            misinformation, and strengthen your arguments—effortlessly.
          </p>
          {/* Avatar Row */}
          <div className="mt-12 flex justify-center gap-4">
            {/* Replace with actual avatar paths */}
            <img
              className="inline-block h-12 w-12 rounded-full ring-2 ring-white"
              src="/images/avatar-1.png"
              alt="User avatar"
            />
            <img
              className="inline-block h-12 w-12 rounded-full ring-2 ring-white"
              src="/images/avatar-2.png"
              alt="User avatar"
            />
            <img
              className="inline-block h-12 w-12 rounded-full ring-2 ring-white"
              src="/images/avatar-3.png"
              alt="User avatar"
            />
            <img
              className="inline-block h-12 w-12 rounded-full ring-2 ring-white"
              src="/images/avatar-4.png"
              alt="User avatar"
            />
            <img
              className="inline-block h-12 w-12 rounded-full ring-2 ring-white"
              src="/images/avatar-5.png"
              alt="User avatar"
            />
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-gradient-to-r from-sky-600 via-sky-500 to-green-400 py-24 text-white sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* --- MODIFIED: Text content now takes full width on small screens, left half on large --- */}
          <div className="lg:w-1/2 lg:pr-8">
            {" "}
            {/* Control width and add padding */}
            <div className="max-w-xl">
              <h2 className="text-4xl font-extrabold sm:text-5xl leading-[1.2]">
                {" "}
                Join our Quest for Truth{" "}
              </h2>
              <p className="mt-4 text-lg font-semibold leading-8">
                {" "}
                Sign up today and start thinking smarter!{" "}
              </p>
              <ul className="mt-8 space-y-3">
                {benefits.map((benefit) => (
                  <li key={benefit} className="flex items-center gap-3">
                    <img
                      src="/icons/check-circle-white.svg"
                      alt=""
                      className="h-6 w-6 flex-shrink-0"
                    />
                    <span className="text-base font-medium">{benefit}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-10">
                {" "}
                <ButtonLink href="/signup" variant="white">
                  Subscribe Now
                </ButtonLink>{" "}
              </div>
            </div>
          </div>
        </div>
        {/* --- MODIFIED: Image container positioned absolutely --- */}
        {/* --- Further MODIFIED: Reduced max-w and lg:w constraints --- */}
        <div className="absolute bottom-0 right-0 w-full max-w-xl lg:w-1/3 pointer-events-none">
          {" "}
          {/* Changed max-w-2xl to max-w-xl, lg:w-2/5 to lg:w-1/3 */}
          <img
            src="/images/cta-graphic.png"
            alt="Illustration of person using Truthify platform"
            className="w-full h-auto" // Image fills container, height adjusts
          />
        </div>
      </section>

      {/* --- "About Us" Section --- */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 grid lg:grid-cols-2 gap-16 xl:gap-24 items-center">
          {/* Left Content */}
          <div className="max-w-xl">
            <h2 className="text-4xl font-extrabold text-zinc-900 sm:text-5xl leading-[1.2]">
              About Us
            </h2>
            <p className="mt-6 text-lg leading-7 text-zinc-700">
              At Truthify, we are dedicated to revolutionizing the way people
              analyze truth, consistency, and logical integrity. Using
              cutting-edge AI and machine learning, our platform detects blatant
              falsehoods, contradictions, fallacies, and more, empowering users
              with deeper insights and stronger reasoning.
            </p>
            <p className="mt-4 text-lg leading-7 text-zinc-700">
              We believe in fostering critical thinking, intellectual honesty,
              and evidence-based argumentation, whether in media, business,
              academia, or everyday discussions. Our goal is to provide a
              powerful tool that helps individuals and organizations navigate
              information with clarity, confidence, and credibility.
            </p>
            <div className="mt-10">
              <ButtonLink href="/signup" variant="primary">
                Join Now
              </ButtonLink>
            </div>
          </div>
          {/* Right Graphic */}
          <div className="mt-10 lg:mt-0">
            <img
              src="/images/about-us-graphic.png" // Path to your graphic
              alt="Illustration representing data analysis and insights"
              className="w-full max-w-lg mx-auto lg:max-w-none rounded-3xl" // Adjust styling
            />
            {/* Add floating elements here if needed using absolute positioning */}
          </div>
        </div>
      </section>

      {/* --- "How It Works" Section --- */}
      <section className="mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-4xl font-extrabold text-zinc-900 sm:text-5xl leading-[1.2]">
            How It Works
          </h2>
          {/* Optional subtitle */}
          {/* <p className="mt-4 text-lg leading-7 text-zinc-700">Get insights in just a few simple steps.</p> */}
        </div>

        {/* Steps Container - Requires careful styling for lines */}
        {/* This is a simplified representation. Real lines need SVG or complex borders. */}
        <div className="relative mx-auto max-w-3xl">
          {/* Example connecting line (very basic) */}
          <div
            className="absolute left-6 top-6 bottom-6 w-0.5 bg-slate-200 hidden md:block"
            aria-hidden="true"
          ></div>

          <ul className="space-y-12 md:space-y-16">
            {howItWorksSteps.map((step, index) => (
              <li key={step.num} className="relative pl-16">
                {/* Step Number Circle */}
                <div className="absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-full bg-sky-500">
                  <span className="text-base font-extrabold text-white">
                    {step.num}
                  </span>
                </div>
                {/* Step Content */}
                <div className="pt-1.5">
                  <h3 className="text-xl font-bold text-stone-900">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-base leading-relaxed text-zinc-700">
                    {step.desc}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* --- "Limitless Possibilities" Section --- */}
      <section className="overflow-hidden bg-gradient-to-bl from-sky-600 to-blue-400 py-24 text-white sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-x-16 gap-y-10 lg:grid-cols-2 items-start">
            {/* Left Content */}
            <div>
              <h2 className="text-4xl font-normal sm:text-5xl leading-[1.2]">
                Limitless possibilities with{" "}
                <span className="font-extrabold">1000+</span> Reports
              </h2>
              <p className="mt-6 text-lg leading-7 opacity-90">
                Unlock the full potential of AI-driven analysis with over 1,000
                unique reports designed to evaluate truth, logic, consistency,
                and integrity in any content. Whether you're fact-checking,
                analyzing arguments, or refining your own reasoning, our system
                provides deep insights tailored to your needs.
              </p>
              <div className="mt-10">
                <ButtonLink href="/signup" variant="white">
                  Sign Up Now
                </ButtonLink>
              </div>
            </div>

            {/* Right Content (Profile List) */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 max-h-[500px] overflow-y-auto relative">
              <ul className="divide-y divide-white/20">
                {profiles.map((profile) => (
                  <li
                    key={profile.name}
                    className="flex items-center justify-between gap-6 py-5"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        className="h-16 w-16 flex-none rounded-full bg-gray-50"
                        src={profile.avatar}
                        alt=""
                      />
                      <div className="min-w-0 flex-auto">
                        <p className="text-lg font-semibold leading-6 text-white">
                          {profile.name}
                        </p>
                        <p className="mt-1 truncate text-sm leading-5 text-white/80">
                          {profile.title}
                        </p>
                      </div>
                      <img
                        className="h-8 w-auto"
                        src={profile.logo}
                        alt={`${profile.name}'s company logo`}
                      />
                    </div>
                    <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-bl from-sky-400 to-blue-500 border-2 border-white/50">
                      <span className="text-lg font-extrabold text-white">
                        {profile.score}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* --- "Start Analyzing" Section (Final CTA / Signup Form) --- */}
      <section className="relative isolate overflow-hidden bg-white py-24 sm:py-32">
        {/* Background shape */}
        <div
          className="absolute inset-y-0 right-1/2 -z-10 -mr-6 w-[200%] origin-bottom-left skew-x-[-30deg] bg-gray-50 shadow-xl shadow-sky-600/10 ring-1 ring-sky-50 sm:-mr-20 lg:-mr-36"
          aria-hidden="true"
        />

        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:grid lg:max-w-none lg:grid-cols-2 lg:gap-x-16 lg:gap-y-6 xl:grid-cols-1 xl:grid-rows-1 xl:gap-x-8">
            {/* Left Content */}
            <div className="max-w-xl lg:mt-0 xl:col-end-1 xl:row-start-1 self-center">
              <p className="text-base font-bold uppercase leading-7 text-sky-600 tracking-wider">
                Get started absolutely free
              </p>
              <h2 className="mt-2 text-4xl font-extrabold tracking-tight text-zinc-900 sm:text-5xl leading-[1.2]">
                Start Analyzing in Minutes
              </h2>
              <p className="mt-6 text-lg leading-7 text-zinc-700">
                With a seamless onboarding process, user-friendly interface, and
                AI-powered automation, you'll be generating insights in no time.
                No complex training required—just powerful analysis at your
                fingertips.
              </p>
            </div>

            {/* Right Content (Signup Form) */}
            {/* Use Remix <Form> if submitting */}
            <div className="mt-10 max-w-lg sm:mt-16 lg:mt-0 lg:max-w-none xl:row-span-2 xl:row-end-2 xl:mt-0 self-center">
              <div className="bg-white p-8 rounded-2xl shadow-lg ring-1 ring-gray-200">
                <form action="#" method="POST" className="space-y-6">
                  <div>
                    <label
                      htmlFor="first-name"
                      className="block text-sm font-semibold leading-6 text-zinc-800"
                    >
                      First Name
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="first-name"
                        id="first-name"
                        autoComplete="given-name"
                        placeholder="Enter First Name"
                        className="block w-full rounded-md border-0 bg-gray-50 px-3 py-2 text-zinc-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-500 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="last-name"
                      className="block text-sm font-semibold leading-6 text-zinc-800"
                    >
                      Last Name
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="last-name"
                        id="last-name"
                        autoComplete="family-name"
                        placeholder="Enter Last Name"
                        className="block w-full rounded-md border-0 bg-gray-50 px-3 py-2 text-zinc-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-500 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div className="relative flex items-start">
                    <div className="flex h-6 items-center">
                      <input
                        id="terms"
                        aria-describedby="terms-description"
                        name="terms"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-sky-600 focus:ring-sky-600"
                      />
                    </div>
                    <div className="ml-3 text-sm leading-6">
                      <p id="terms-description" className="text-gray-500">
                        Creating an account means you’re okay with our{" "}
                        <Link
                          href="/terms"
                          className="font-medium text-sky-600 hover:underline"
                        >
                          Terms of Service
                        </Link>
                        ,{" "}
                        <Link
                          href="/privacy"
                          className="font-medium text-sky-600 hover:underline"
                        >
                          Privacy Policy
                        </Link>
                        , and default Notification Settings
                      </p>
                    </div>
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="flex w-full justify-center rounded-md bg-sky-500 px-10 py-3 text-base font-bold leading-6 text-white shadow-sm hover:bg-sky-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 items-center gap-1.5"
                    >
                      Sign Up
                      <img
                        src="/icons/arrow-right.svg"
                        alt=""
                        className="h-4 w-4"
                      />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
