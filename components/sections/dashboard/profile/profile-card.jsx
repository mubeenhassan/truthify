import Image from "next/image";
import IntegrityGauge from "./integrity-gauge";
import Link from "next/link";

export default function ProfileCard({
  id,
  name,
  title,
  companyName,
  companyLogo,
  profileImage,
  integrityScore,
  maxScore,
}) {
  return (
    <div className="w-full mx-auto bg-white p-0 sm:p-6">
      <Link href={`/dashboard/profile/${id}`}>
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <div className="relative w-16 h-16 rounded-full overflow-hidden bg-coral-500">
              <img
                src={profileImage || "/placeholder.svg"}
                alt={name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="ml-4">
              <h2 className="text-2xl font-bold text-gray-800">{name}</h2>
              <p className="text-gray-500">
                {title} of {companyName}
              </p>
            </div>
          </div>
          <div className="text-gray-500">
            <Image
              src={companyLogo || "/placeholder.svg"}
              alt={`${companyName} logo`}
              className="h-12"
              width={48}
              height={48}
            />
          </div>
        </div>
      </Link>

      <div className="flex flex-col items-center">
        <div className="relative w-full max-w-[344px]">
          <IntegrityGauge score={integrityScore} maxScore={maxScore} />
        </div>

        <p className="text-center mt-4 text-gray-700 max-w-md">
          The integrity score is a measure of how consistently and habitually
          one repeats their
          <span className="font-semibold">
            {" "}
            Positive or Negative Attributes
          </span>
          .
        </p>
      </div>
    </div>
  );
}
