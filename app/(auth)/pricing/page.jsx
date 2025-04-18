const TOP_CONTENT_HEIGHT = "h-[250px]"; // Keep this!

const Pricing = () => {
  return (
    <main className="flex-grow flex flex-col items-center pt-10 pb-20 px-4 sm:px-6 lg:px-8">
      {/* Page Titles ... (keep as is) */}
      <div className="text-center mb-12 md:mb-16">
        <h1 className="text-white text-3xl md:text-4xl font-bold leading-tight mb-2">
          Choose a plan that's right for you
        </h1>
        <p className="text-white text-xl font-medium leading-normal">
          AI-Powered Integrity Analysis
        </p>
      </div>
      {/* Pricing Cards Container - Keep items-start */}
      <div className="w-full max-w-6xl flex flex-wrap justify-center items-start gap-6">
        {/* --- Pricing Card 1: Background Integrity Check --- */}
        {/* MODIFICATION: Added `relative`, removed `h-[499px]` */}
        <div className="relative w-[192px] bg-white rounded-lg outline outline-2 outline-offset-[-2px] outline-sky-500 flex flex-col overflow-hidden text-zinc-900">
          {/* MODIFICATION: Added `absolute top-0 left-0`, removed `flex-shrink-0` */}
          {/* Added `z-10` to ensure it's above content if needed, might not be necessary */}
          <div className="absolute top-0 left-0 right-0 px-2 py-0.5 bg-sky-500 inline-flex justify-center items-center gap-1 text-white z-10">
            {" "}
            {/* Optional: Added rounded corners to match card */}
            <span className="text-sm font-semibold leading-none">
              Most Popular
            </span>
            <img
              src="/icons/star-filled-white.svg" // Ensure correct icon name
              alt="Most Popular"
              className="w-4 h-4"
            />{" "}
          </div>

          {/* Card Content Wrapper - Stays the same */}
          <div className="flex flex-col flex-grow">
            {/* Top Section: Title & Price (Fixed Height) - Stays the same */}
            {/* NOTE: The absolute banner will overlay the top padding (pt-6) visually */}
            <div
              className={`px-6 pt-6 flex flex-col gap-5 ${TOP_CONTENT_HEIGHT}`}
            >
              {" "}
              {/* Applied fixed height & padding */}
              <div className="flex flex-col gap-1">
                <h2 className="text-xl font-bold leading-snug">
                  Background
                  <br />
                  Integrity
                  <br />
                  Check
                </h2>
                <p className="text-sm font-normal leading-none mt-1">
                  {" "}
                  {/* Added mt-1 */}
                  Best for personal use
                </p>
              </div>
              <div className="text-3xl font-bold leading-9 mt-auto">
                $19
              </div>{" "}
              {/* mt-auto to push price down */}
            </div>

            {/* Middle Section: Button (Consistent position) - Stays the same */}
            <div className="px-4 mt-2 mb-4 flex-shrink-0">
              {" "}
              {/* Adjusted margins & padding */}
              <a
                href="#"
                className="w-full px-5 py-3 bg-sky-500 rounded inline-flex justify-center items-center gap-2.5 text-white text-base font-semibold leading-tight hover:bg-sky-600 transition-colors"
              >
                Get started
              </a>
            </div>

            {/* Bottom Section: Features (Takes remaining space) - Stays the same */}
            <div className="px-4 pb-4 flex flex-col gap-3 flex-grow">
              <h3 className="text-base font-semibold leading-tight mb-1 pl-2">
                {" "}
                {/* Added pl-2 */}
                What you get:
              </h3>
              <FeatureItem
                icon="checkmark-sky.svg" // Ensure correct icon name
                text="Deep Layered Analysis"
              />
              <FeatureItem
                icon="checkmark-sky.svg" // Ensure correct icon name
                text="Fallacy Detection"
              />
              <FeatureItem icon="checkmark-sky.svg" text="Instant Results" />
            </div>
          </div>
        </div>{" "}
        {/* End Card 1 */}
        {/* --- Pricing Card 2: Integrity Investigation Report --- */}
        {/* MODIFICATION: Removed h-[607px] */}
        <div className="w-[192px] bg-white rounded-lg border-t-2 border-sky-500 flex flex-col overflow-hidden text-zinc-900">
          {/* Card Content Wrapper */}
          <div className="flex flex-col flex-grow">
            {/* Top Section (Fixed Height) */}
            <div
              className={`px-6 pt-6 flex flex-col gap-5 ${TOP_CONTENT_HEIGHT}`}
            >
              {" "}
              {/* Applied fixed height & padding */}
              <div className="flex flex-col gap-1">
                <h2 className="text-xl font-bold leading-snug">
                  Integrity
                  <br />
                  Investigation
                  <br />
                  Report
                </h2>
                <p className="text-sm font-normal leading-none mt-1">
                  {" "}
                  {/* Added mt-1 */}
                  Best for HR and personal use
                </p>
              </div>
              <div className="text-3xl font-bold leading-9 mt-auto">
                $500
              </div>{" "}
              {/* mt-auto */}
            </div>

            {/* Middle Section: Button */}
            <div className="px-4 mt-2 mb-4 flex-shrink-0">
              <a
                href="#"
                className="w-full px-5 py-3 bg-sky-500 rounded inline-flex justify-center items-center gap-2.5 text-white text-base font-semibold leading-tight hover:bg-sky-600 transition-colors"
              >
                Get started
              </a>
            </div>

            {/* Bottom Section: Features */}
            <div className="px-4 pb-4 flex flex-col gap-3 flex-grow">
              <h3 className="text-base font-semibold leading-tight mb-1 pl-2">
                What you get:
                <br />
                <span className="text-sm font-normal leading-none">
                  Includes Background Integrity Check
                </span>
              </h3>
              <FeatureItem icon="checkmark-sky.svg" text="Profile Access" />
              <FeatureItem icon="checkmark-sky.svg" text="Aggregated Content" />
              <FeatureItem icon="checkmark-sky.svg" text="Instant Results" />
              <FeatureItem
                icon="checkmark-sky.svg"
                text="Unparalleled research"
                multiline={true}
              />
              <FeatureItem
                icon="checkmark-sky.svg"
                text="Privacy Built-in"
                multiline={true}
              />
            </div>
          </div>
        </div>{" "}
        {/* End Card 2 */}
        {/* --- Pricing Card 3: 10 Reports --- */}
        {/* MODIFICATION: Removed h-[580px] */}
        <div className="w-[192px] bg-white rounded-lg border-t-2 border-amber-500 flex flex-col overflow-hidden text-zinc-900">
          {/* Card Content Wrapper */}
          <div className="flex flex-col flex-grow">
            {/* Top Section (Fixed Height) */}
            <div
              className={`px-6 pt-6 flex flex-col gap-4 ${TOP_CONTENT_HEIGHT}`}
            >
              {" "}
              {/* Applied fixed height & padding */}
              <div className="flex flex-col gap-1">
                <h2 className="text-xl font-bold leading-snug">
                  10 Integrity
                  <br />
                  Investigation
                  <br />
                  Reports
                </h2>
                <p className="text-sm font-normal leading-none mt-1">
                  Best for HR, Investigators,
                  <br />
                  and finance.
                </p>
              </div>
              <div className="text-3xl font-bold leading-9 mt-auto">
                $2,500
              </div>{" "}
              {/* mt-auto */}
            </div>

            {/* Middle Section: Button */}
            <div className="px-4 mt-2 mb-4 flex-shrink-0">
              <a
                href="#"
                className="w-full px-5 py-3 bg-sky-500 rounded inline-flex justify-center items-center gap-2.5 text-white text-base font-semibold leading-tight hover:bg-sky-600 transition-colors"
              >
                Get started
              </a>
            </div>

            {/* Bottom Section: Features */}
            <div className="px-4 pb-4 flex flex-col gap-3 flex-grow">
              <h3 className="text-base font-semibold leading-tight mb-1 pl-2">
                What you get:
              </h3>
              <FeatureItem icon="checkmark-sky.svg" text="Profile Access" />
              <FeatureItem icon="checkmark-sky.svg" text="Aggregated Content" />
              <FeatureItem icon="checkmark-sky.svg" text="Instant Results" />
              <FeatureItem
                icon="checkmark-sky.svg"
                text="Unparalleled research"
                multiline={true}
              />
              <FeatureItem
                icon="checkmark-sky.svg"
                text="Privacy Built-in"
                multiline={true}
              />
            </div>
          </div>
        </div>{" "}
        {/* End Card 3 */}
        {/* --- Pricing Card 4: Unlimited Reports --- */}
        {/* MODIFICATION: Removed h-[584px] */}
        <div className="w-[192px] bg-white rounded-lg border-t-2 border-green-600 flex flex-col overflow-hidden text-zinc-900">
          {/* Card Content Wrapper */}
          <div className="flex flex-col flex-grow">
            {/* Top Section (Fixed Height) */}
            <div
              className={`px-6 pt-6 flex flex-col gap-4 ${TOP_CONTENT_HEIGHT}`}
            >
              {" "}
              {/* Applied fixed height & padding */}
              <div className="flex flex-col gap-1">
                <h2 className="text-xl font-bold leading-snug">
                  Unlimited <br />
                  Integrity
                  <br />
                  Investigation
                  <br />
                  Reports
                </h2>
                <p className="text-sm font-normal leading-none mt-1">
                  Enterprise and <br />
                  Investigations
                </p>
              </div>
              <div className="flex flex-col items-start gap-1 mt-auto">
                {" "}
                {/* mt-auto */}
                <div className="text-3xl font-bold leading-9">$9,500</div>
                <div className="text-xs font-normal leading-3">/month</div>
              </div>
            </div>

            {/* Middle Section: Button */}
            <div className="px-4 mt-2 mb-4 flex-shrink-0">
              <a
                href="#"
                className="w-full px-5 py-3 bg-sky-500 rounded inline-flex justify-center items-center gap-2.5 text-white text-base font-semibold leading-tight hover:bg-sky-600 transition-colors"
              >
                Get started
              </a>
            </div>

            {/* Bottom Section: Features */}
            <div className="px-4 pt-1 pb-4 flex flex-col gap-3 flex-grow">
              {" "}
              {/* Adjusted pt */}
              <h3 className="text-base font-semibold leading-tight mb-1 pl-2">
                What you get:
              </h3>
              <FeatureItem
                icon="checkmark-sky.svg"
                text="Exclusive Access"
                multiline={true}
              />
              <FeatureItem icon="checkmark-sky.svg" text="Aggregated Content" />
              <FeatureItem icon="checkmark-sky.svg" text="Instant Results" />
              <FeatureItem
                icon="checkmark-sky.svg"
                text="Unparalleled research"
                multiline={true}
              />
              <FeatureItem
                icon="checkmark-sky.svg"
                text="Privacy Built-in"
                multiline={true}
              />
            </div>
          </div>
        </div>{" "}
        {/* End Card 4 */}
        {/* --- Pricing Card 5: Let's Talk / API --- */}
        {/* MODIFICATION: Removed h-[579px] */}
        <div className="w-[192px] bg-white rounded-lg outline outline-1 outline-offset-[-1px] outline-zinc-200 flex flex-col overflow-hidden text-zinc-900">
          {/* Card Content Wrapper */}
          <div className="flex flex-col flex-grow">
            {/* Top Section (Fixed Height) */}
            <div
              className={`px-6 pt-6 flex flex-col gap-4 ${TOP_CONTENT_HEIGHT}`}
            >
              {" "}
              {/* Applied fixed height & padding */}
              <div className="flex flex-col gap-1">
                <h2 className="text-2xl font-bold leading-tight">Let’s Talk</h2>
                <p className="text-xl font-bold leading-snug mt-2">
                  Interested in
                  <br />
                  our API Key?
                </p>
                {/* Pushed this description down within the fixed height block */}
                <p className="text-sm font-normal leading-none mt-auto">
                  {" "}
                  {/* mt-auto */}
                  Best for personal use
                </p>{" "}
              </div>
            </div>

            {/* Middle Section: Button */}
            <div className="px-4 mt-2 mb-4 flex-shrink-0">
              <a
                href="#"
                className="w-full px-5 py-3 bg-sky-900 rounded inline-flex justify-center items-center gap-2.5 text-white text-base font-semibold leading-tight hover:bg-sky-800 transition-colors"
              >
                Inquire Now
              </a>
            </div>

            {/* Bottom Section: Features */}
            <div className="px-4 pb-4 flex flex-col gap-3 flex-grow">
              <h3 className="text-base font-semibold leading-tight mb-1 pl-2">
                What you get:
              </h3>
              <FeatureItem icon="checkmark-sky.svg" text="Integration" />
              <FeatureItem icon="checkmark-sky.svg" text="Fallacy Detection" />
              <FeatureItem
                icon="checkmark-sky.svg"
                text="Streaming Results"
                multiline={true}
              />
              <FeatureItem
                icon="checkmark-sky.svg"
                text="Unparalleled research"
                multiline={true}
              />
              <FeatureItem
                icon="checkmark-sky.svg"
                text="Privacy Built-in"
                multiline={true}
              />
            </div>
          </div>
        </div>{" "}
        {/* End Card 5 */}
      </div>{" "}
      {/* End Pricing Cards Container */}
    </main>
  );
};

export default Pricing;

// Helper Components ... (keep as is)
// Helper component for Feature Items
function FeatureItem({ icon, text, multiline = false }) {
  const textHtml = text.replace("<br/>", "<br />").replace("<br>", "<br />");
  const hasBreak = textHtml.includes("<br />");

  return (
    <div
      className={`inline-flex gap-3 pl-2 ${
        // Added pl-2 to align with heading
        hasBreak || multiline ? "items-start" : "items-center"
      }`}
    >
      <img
        src={`/icons/${icon}`} // Ensure icon path is correct
        alt=""
        className="w-5 h-5 flex-shrink-0 mt-px"
      />{" "}
      <span
        className="flex-1 text-zinc-900 text-sm font-normal leading-none"
        dangerouslySetInnerHTML={{ __html: textHtml }}
      />
    </div>
  );
}
