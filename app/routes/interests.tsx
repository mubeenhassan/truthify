// app/routes/interests.tsx
import { useState } from "react";
import { Link, Form } from "@remix-run/react";
// Import necessary types from React
import type { ChangeEvent, FormEvent, KeyboardEvent } from "react";

// --- Type Definitions ---

// Define the shape of an interest object
interface Interest {
  icon: string;
  title: string;
  description: string;
}

// Define the shape of the form errors state
interface FormErrors {
  profession?: string; // Optional string: error message for profession
  interests?: string; // Optional string: error message for interests
}

// --- Data ---

// Typed array of profession strings
const professions: string[] = [
  "Investigator",
  "Lending",
  "Business Owner",
  "Investor",
  "Venture Capital",
  "PI",
  "Security",
  "Insurance",
  "Legal",
  "HR / Recruiting Ops",
  "Finance",
  "Other",
];

// Typed array of interest objects
const interestsData: Interest[] = [
  {
    icon: "/icons/finance.svg",
    title: "Finance",
    description: "News, Market Trends and Investment Analysis",
  },
  {
    icon: "/icons/private-capital.svg",
    title: "Private Capital",
    description: "Lending, Startups, VC and M&A.",
  },
  {
    icon: "/icons/hr-hiring.svg",
    title: "HR / Hiring",
    description: "Hiring, Screening, Promotions and evaluations",
  },
  {
    icon: "/icons/security.svg",
    title: "Security",
    description: "Criminals, Fraudsters, Scammers, Deepfakes",
  },
];

// --- Component ---

export default function InterestsPage(): JSX.Element {
  // --- State with Explicit Types ---
  const [selectedProfession, setSelectedProfession] = useState<string | null>(
    null
  );
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]); // Store titles (strings)
  const [isOtherSelected, setIsOtherSelected] = useState<boolean>(false);
  const [otherInterestText, setOtherInterestText] = useState<string>("");
  const [formErrors, setFormErrors] = useState<FormErrors>({}); // Use the defined interface

  // --- Handlers with Typed Parameters ---
  const handleProfessionSelect = (profession: string): void => {
    setSelectedProfession(profession);
    // Clear specific error using functional update for safety
    setFormErrors((prev) => ({ ...prev, profession: undefined }));
  };

  const handleInterestSelect = (interestTitle: string): void => {
    setSelectedInterests((prev) => {
      const newSelection = prev.includes(interestTitle)
        ? prev.filter((item) => item !== interestTitle)
        : [...prev, interestTitle];

      // Clear interest error if selection criteria met
      if (
        newSelection.length > 0 ||
        (isOtherSelected && otherInterestText.trim())
      ) {
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          interests: undefined,
        }));
      }
      return newSelection;
    });
  };

  const handleOtherRadioChange = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    const checked = event.target.checked;
    setIsOtherSelected(checked);
    if (!checked) {
      setOtherInterestText(""); // Clear text if deselected
    }
    // Clear interest error if selection criteria met
    if ((checked && otherInterestText.trim()) || selectedInterests.length > 0) {
      setFormErrors((prev) => ({ ...prev, interests: undefined }));
    }
  };

  const handleOtherTextChange = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    const text = event.target.value;
    setOtherInterestText(text);
    // Clear interest error if selection criteria met
    if ((isOtherSelected && text.trim()) || selectedInterests.length > 0) {
      setFormErrors((prev) => ({ ...prev, interests: undefined }));
    }
  };

  // --- Client-Side Validation Logic ---
  const validateForm = (): boolean => {
    const errors: FormErrors = {}; // Use the interface here too
    if (!selectedProfession) {
      errors.profession = "Please select your profession.";
    }
    const hasSelectedInterestCard = selectedInterests.length > 0;
    const hasValidOtherInterest =
      isOtherSelected && otherInterestText.trim() !== "";

    if (!hasSelectedInterestCard && !hasValidOtherInterest) {
      errors.interests =
        "Please select at least one interest or specify 'Others'.";
    } else if (isOtherSelected && otherInterestText.trim() === "") {
      errors.interests =
        "Please specify your interest if 'Others' is selected.";
    }

    setFormErrors(errors);
    // Return true if the errors object is empty
    return Object.keys(errors).length === 0;
  };

  // --- Form Submission Handler with Typed Event ---
  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    if (!validateForm()) {
      event.preventDefault(); // Stop submission if validation fails
      // Consider focusing the first field with an error for better UX
      const firstErrorKey = Object.keys(formErrors)[0] as
        | keyof FormErrors
        | undefined;
      if (firstErrorKey) {
        const errorElementId = `${firstErrorKey}-error`; // Assuming p tags have this ID pattern
        document
          .getElementById(errorElementId)
          ?.scrollIntoView({ behavior: "smooth", block: "center" });
        // You might also want to focus the related input/button area
      }
    }
    // If validation passes, Remix's <Form> handles the submission
  };

  // --- JSX Structure ---
  return (
    <div className="flex min-h-screen flex-col bg-sky-950 font-['Inter'] text-white">
      {/* Header Area */}
      <header className="flex w-full flex-col items-center pt-8">
        <img
          className="mb-8 h-14 w-auto"
          src="/truthify-logo.png"
          alt="Truthify Logo"
        />
        <div className="w-full max-w-6xl px-8">
          <Link
            to="/signup" // Ensure this route exists and is correct
            className="text-base text-white/60 underline hover:text-white"
          >
            &larr; Back to Sign Up
          </Link>
        </div>
      </header>

      {/* Main Content Area */}
      <Form method="post" onSubmit={handleSubmit}>
        {/* Hidden Inputs for selected items */}
        {selectedProfession && (
          <input type="hidden" name="profession" value={selectedProfession} />
        )}
        {selectedInterests.map((interest) => (
          <input
            key={interest}
            type="hidden"
            name="interests" // Backend will receive multiple 'interests' fields
            value={interest}
          />
        ))}

        <main className="flex flex-grow flex-col items-center px-8 py-12">
          <div className="w-full max-w-6xl space-y-16">
            {/* Profession Section */}
            <section>
              <h2 className="mb-2 text-3xl font-bold leading-10">
                What's your profession?
              </h2>
              {/* Display Profession Validation Error */}
              {formErrors.profession && (
                <p id="profession-error" className="mb-4 text-sm text-red-400">
                  {formErrors.profession}
                </p>
              )}
              <div className="flex flex-wrap gap-4">
                {professions.map((profession) => (
                  <button
                    key={profession}
                    type="button"
                    onClick={() => handleProfessionSelect(profession)}
                    className={`rounded-lg px-5 py-2.5 text-base font-semibold outline-none ring-offset-sky-950 focus:ring-2 focus:ring-offset-2 transition-colors duration-150 ease-in-out
                       ${
                         selectedProfession === profession
                           ? "bg-sky-500 text-white ring-sky-400"
                           : "bg-stone-100 text-zinc-800 ring-stone-400 hover:bg-stone-200"
                       }`}
                  >
                    {profession}
                  </button>
                ))}
              </div>
            </section>

            {/* Interests Section */}
            <section>
              <h2 className="mb-2 text-3xl font-bold leading-10">
                What are your Interests?
              </h2>
              {/* Display Interests Validation Error */}
              {formErrors.interests && (
                <p id="interests-error" className="mb-4 text-sm text-red-400">
                  {formErrors.interests}
                </p>
              )}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {interestsData.map((interest) => {
                  const isSelected = selectedInterests.includes(interest.title);
                  return (
                    <div
                      key={interest.title}
                      onClick={() => handleInterestSelect(interest.title)}
                      className={`relative cursor-pointer overflow-hidden rounded-xl border border-gray-200 bg-white p-6 text-zinc-800 transition hover:shadow-lg focus:outline-none ring-offset-white
                           ${
                             isSelected
                               ? "ring-2 ring-sky-500 ring-offset-2"
                               : "ring-gray-300 focus:ring-2"
                           }`}
                      role="checkbox"
                      aria-checked={isSelected}
                      tabIndex={0}
                      // Typed KeyboardEvent handler
                      onKeyDown={(e: KeyboardEvent<HTMLDivElement>) => {
                        if (e.key === " " || e.key === "Enter") {
                          e.preventDefault(); // Prevent scrolling on spacebar
                          handleInterestSelect(interest.title);
                        }
                      }}
                    >
                      {/* Decorative background */}
                      <div className="absolute -right-8 -top-8 h-28 w-28 origin-top-left rounded-full bg-sky-600/5"></div>
                      {/* Icon */}
                      <img
                        src={interest.icon}
                        alt="" // Keep alt empty if purely decorative, otherwise describe icon
                        className="mb-4 h-14 w-auto"
                        aria-hidden="true"
                      />
                      {/* Title */}
                      <h3 className="mb-2 text-xl font-semibold">
                        {interest.title}
                      </h3>
                      {/* Description */}
                      <p className="text-sm leading-snug">
                        {interest.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Others Section */}
            <section className="max-w-4xl">
              <div className="mb-4 flex items-center gap-3">
                <input
                  id="interest-others"
                  name="interest_other_option" // This name is mainly for label association, value comes from state/text input
                  type="radio"
                  className="h-6 w-6 rounded-full border-gray-300 bg-zinc-100 text-sky-600 focus:ring-sky-500"
                  checked={isOtherSelected}
                  onChange={handleOtherRadioChange}
                />
                <label
                  htmlFor="interest-others"
                  className="text-base leading-tight"
                >
                  Others
                </label>
              </div>
              <hr className="mb-4 border-white/60" />
              <input
                type="text"
                id="other_interests"
                name="other_interest_text" // Submit this field if 'Others' is chosen
                placeholder="Please mention here.."
                className={`w-full border-0 border-b border-white/60 bg-transparent pb-2 text-sm text-white placeholder-white/70 focus:border-sky-500 focus:outline-none focus:ring-0 transition-opacity duration-300
                   ${
                     isOtherSelected
                       ? "opacity-100"
                       : "opacity-50 pointer-events-none"
                   }`}
                value={otherInterestText}
                onChange={handleOtherTextChange}
                required={isOtherSelected} // HTML5 required attribute
                disabled={!isOtherSelected}
                aria-label="Specify other interests"
                aria-describedby={
                  formErrors.interests &&
                  isOtherSelected &&
                  !otherInterestText.trim()
                    ? "other-interest-error"
                    : undefined
                }
              />
              {/* Specific error message display for the 'Other' text input */}
              {formErrors.interests &&
                isOtherSelected &&
                !otherInterestText.trim() && (
                  <p
                    id="other-interest-error"
                    className="mt-2 text-sm text-red-400"
                  >
                    {formErrors.interests}
                  </p>
                )}
            </section>

            {/* Submit Button */}
            <div className="flex justify-end pt-8">
              <button
                type="submit"
                className="rounded-lg bg-sky-500 px-8 py-3 text-lg font-semibold text-white hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-sky-950 disabled:opacity-60"
                // Consider adding disabled state based on submission status
                // disabled={navigation.state === 'submitting'} // If using Remix's useNavigation hook
              >
                Continue
              </button>
            </div>
          </div>
        </main>
      </Form>

      {/* Footer */}
      <footer className="flex w-full justify-center px-8 pb-8 pt-6">
        <div className="w-full max-w-6xl border-t border-white/10 pt-6">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="text-sm font-normal leading-normal text-white/60">
              © {new Date().getFullYear()} Truthify. All rights reserved.
            </div>
            <div className="flex items-center gap-6">
              {/* Placeholder links */}
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
      </footer>
    </div>
  );
}
