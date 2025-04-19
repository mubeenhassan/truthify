import Image from "next/image";
import Link from "next/link";
import { LockIcon } from "./lock-icon";
import { ScoreGaugeRecent } from "./score-gauge-recent";

const ProfileCard = ({ profile, className }) => {
  const { id, name, title, logo, avatar, score, isLocked, report } = profile;

  const CardContent = (
    <div
      className={`p-4 space-y-4 ${
        !isLocked ? "hover:bg-slate-50 cursor-pointer" : "cursor-not-allowed"
      } ${className}`}
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

      {/* Conditionally show report */}
      {report && (
        <div className="bg-gray-50 rounded-xl p-4 shadow-sm flex flex-col gap-2">
          <p className="text-base font-semibold text-gray-900">
            {report.title}
          </p>
          <div className="text-sm text-gray-600 flex flex-wrap gap-4">
            <div>
              Main Speaker:{" "}
              <span className="font-semibold">{report.speaker}</span>
            </div>
            <div>
              Source: <span className="font-semibold">{report.source}</span>
            </div>
            <div>
              Date: <span className="text-gray-700">{report.date}</span>
            </div>
            <div>
              Custom: <span className="text-gray-700">{report.customDate}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return isLocked ? (
    CardContent
  ) : (
    <Link href={`/dashboard/profile/${id}`}>{CardContent}</Link>
  );
};

export default ProfileCard;
