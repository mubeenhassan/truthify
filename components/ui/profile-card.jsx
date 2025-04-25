import Image from "next/image";
import Link from "next/link";
import { ScoreGaugeRecent } from "../sections/dashboard/main/score-gauge-recent";
import { ReportCard } from "@/components/ui/report-card";
import { LockIcon } from "../sections/dashboard/main/lock-icon";

const ProfileCardContent = ({ profile, variant }) => {
  const { name, title, logo, avatar, score, isLocked, reportCount } = profile;

  const baseCardStyles = "p-4 space-y-4 transition-all";

  // Conditional styles based on the variant
  const variantStyles =
    variant === "second"
      ? "border border-gray-200 shadow-lg relative  rounded-2xl pt-16"
      : "";

  return (
    <div
      className={`${baseCardStyles} ${variantStyles} ${
        !isLocked ? "hover:bg-slate-50 cursor-pointer" : "cursor-not-allowed"
      }`}
    >
      {/* Top Profile Info */}
      <div className="flex relative items-center justify-between">
        <div className="flex items-center gap-4">
          {/* Avatar Image, adjusted for the second variant */}
          <div
            className={`${
              variant === "second "
                ? "absolute -top-2/3 left-1/2 object-cover transform -translate-x-1/2 -translate-y-1/2"
                : ""
            }`}
          >
            <Image
              src={avatar || "/placeholder.svg"}
              alt={name}
              width={100}
              height={100}
              className="rounded-full w-24 h-24 object-cover mx-auto"
            />
          </div>
          <div>
            <p className="text-lg font-semibold text-gray-900">{name}</p>
            <p className="text-sm text-gray-500">{title}</p>
            {variant === "second" ? (
              <p className="text-sm font-semibold">
                {reportCount}{" "}
                <span className="text-gray-500"> Reports Available</span>
              </p>
            ) : (
              ""
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Image
            src={logo || "/placeholder.svg"}
            alt="logo"
            width={32}
            height={32}
            className={`w-8 h-8 object-contain ${
              isLocked ? "grayscale opacity-50" : ""
            }`}
          />
          {isLocked ? (
            <LockIcon />
          ) : (
            <ScoreGaugeRecent scoreString={parseFloat(score)} />
          )}
        </div>
      </div>
    </div>
  );
};

const ProfileCard = ({ profile, variant }) => {
  const { id, isLocked, report } = profile;

  const ProfileContent = (
    <ProfileCardContent profile={profile} variant={variant} />
  );

  return (
    <div className="space-y-4">
      {isLocked ? (
        <Link href={`/dashboard/profile/${id}#report-scores`}>
          {ProfileContent}
        </Link>
      ) : (
        <Link href={`/dashboard/profile/${id}`} className="block no-underline">
          {ProfileContent}
        </Link>
      )}

      {report && (
        <ReportCard
          profileId={profile.id}
          report={{ ...report, isLocked: isLocked, variant: "compact" }}
        />
      )}
    </div>
  );
};

export default ProfileCard;
