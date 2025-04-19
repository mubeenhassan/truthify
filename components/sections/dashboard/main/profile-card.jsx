import Image from "next/image";
import Link from "next/link";
import { LockIcon } from "./lock-icon";
import { ScoreGaugeRecent } from "./score-gauge-recent";
import { ReportCard } from "@/components/ui/report-card";

const ProfileCardContent = ({ profile }) => {
  const { name, title, logo, avatar, score, isLocked } = profile;

  return (
    <div
      className={`p-4 space-y-4 ${
        !isLocked ? "hover:bg-slate-50 cursor-pointer" : "cursor-not-allowed"
      }`}
    >
      {/* Top Profile Info */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Image
            src={avatar || "/placeholder.svg"}
            alt={name}
            width={64}
            height={64}
            className="rounded-full w-16 h-16 object-cover"
          />
          <div>
            <p className="text-lg font-semibold text-gray-900">{name}</p>
            <p className="text-sm text-gray-500">{title}</p>
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

const ProfileCard = ({ profile }) => {
  const { id, isLocked, report } = profile;

  const ProfileContent = <ProfileCardContent profile={profile} />;

  return (
    <div className="space-y-4">
      {isLocked ? (
        ProfileContent
      ) : (
        <Link href={`/dashboard/profile/${id}`} className="block no-underline">
          {ProfileContent}
        </Link>
      )}

      {report && (
        <ReportCard
          report={{ ...report, isLocked: isLocked, variant: "compact" }}
        />
      )}
    </div>
  );
};

export default ProfileCard;
