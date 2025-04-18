"use client";
import Link from "next/link";
import { useState } from "react";

// Typed array of profession strings
const professions = [
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
const interestsData = [
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

const Interest = () => {
  const [selectedProfession, setSelectedProfession] = useState(null);
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [isOtherSelected, setIsOtherSelected] = useState(false);
  const [otherInterestText, setOtherInterestText] = useState("");
  const [formErrors, setFormErrors] = useState({});

  const handleProfessionSelect = (profession) => {
    setSelectedProfession(profession);
    setFormErrors((prev) => ({ ...prev, profession: undefined }));
  };

  const handleInterestSelect = (interestTitle) => {
    setSelectedInterests((prev) => {
      const newSelection = prev.includes(interestTitle)
        ? prev.filter((item) => item !== interestTitle)
        : [...prev, interestTitle];

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

  const handleOtherRadioChange = (event) => {
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

  const handleOtherTextChange = (event) => {
    const text = event.target.value;
    setOtherInterestText(text);
    // Clear interest error if selection criteria met
    if ((isOtherSelected && text.trim()) || selectedInterests.length > 0) {
      setFormErrors((prev) => ({ ...prev, interests: undefined }));
    }
  };

  return (
    <div className="flex w-full flex-col items-center">
      <div className="w-full mb-8 text-left">
        <Link
          href="/"
          className="text-base text-white/60 underline hover:text-white"
        >
          Back to homepage
        </Link>
      </div>

      <form method="post">
        {selectedProfession && (
          <input type="hidden" name="profession" value={selectedProfession} />
        )}
        {selectedInterests.map((interest) => (
          <input
            key={interest}
            type="hidden"
            name="interests"
            value={interest}
          />
        ))}

        <main className="flex flex-grow flex-col items-center px-8 py-12">
          <div className="w-full max-w-6xl space-y-16">
            <section>
              <h2 className="mb-2 text-3xl font-bold leading-10">
                What's your profession?
              </h2>
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

            <section>
              <h2 className="mb-2 text-3xl font-bold leading-10">
                What are your Interests?
              </h2>
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
                      onKeyDown={(e) => {
                        if (e.key === " " || e.key === "Enter") {
                          e.preventDefault();
                          handleInterestSelect(interest.title);
                        }
                      }}
                    >
                      <div className="absolute -right-8 -top-8 h-28 w-28 origin-top-left rounded-full bg-sky-600/5"></div>
                      <img
                        src={interest.icon}
                        alt=""
                        className="mb-4 h-14 w-auto"
                        aria-hidden="true"
                      />
                      <h3 className="mb-2 text-xl font-semibold">
                        {interest.title}
                      </h3>
                      <p className="text-sm leading-snug">
                        {interest.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </section>

            <section className="max-w-4xl">
              <div className="mb-4 flex items-center gap-3">
                <input
                  id="interest-others"
                  name="interest_other_option"
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
                name="other_interest_text"
                placeholder="Please mention here.."
                className={`w-full border-0 border-b border-white/60 bg-transparent pb-2 text-sm text-white placeholder-white/70 focus:border-sky-500 focus:outline-none focus:ring-0 transition-opacity duration-300
                   ${
                     isOtherSelected
                       ? "opacity-100"
                       : "opacity-50 pointer-events-none"
                   }`}
                value={otherInterestText}
                onChange={handleOtherTextChange}
                required={isOtherSelected}
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

            <div className="flex justify-end pt-8">
              <button
                type="submit"
                className="rounded-lg bg-sky-500 px-8 py-3 text-lg font-semibold text-white hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-sky-950 disabled:opacity-60"
              >
                Continue
              </button>
            </div>
          </div>
        </main>
      </form>
    </div>
  );
};

export default Interest;
