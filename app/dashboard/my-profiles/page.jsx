
import Link from "next/link";
import { ProfilesTab } from "@/components/sections/dashboard/all-profiles/profiles-tab";

const PROFILES_CREATED = [
  {
    id: 3,
    name: "Sundar Pichai",
    title: "CEO of Google",
    avatar: "/images/avatar-sundar.png",
    logo: "/icons/google-color.svg",
    reportCount: 195,
    score: 7.5,
    industry: "Technology",
  },
  {
    id: 4,
    name: "Elon Musk",
    title: "CEO of Tesla",
    avatar: "/images/avatar-elon.png",
    logo: "/images/tesla.png",
    reportCount: 310,
    score: 6.3,
    industry: "Automotive",
  },
  {
    id: 11,
    name: "Satya Nadella",
    title: "CEO of Microsoft",
    avatar: "/images/avatar-satya.png",
    logo: "/icons/microsoft.svg",
    reportCount: 238,
    score: 7.8,
    industry: "Technology",
  },
  {
    id: 21,
    name: "Jensen Huang",
    title: "President of Nvidia",
    avatar: "/images/avatar-jensen.png",
    logo: "/icons/nvidia.svg",
    reportCount: 134,
    score: 8.2,
    industry: "Technology",
  },
];

export default function MyProfilesPage() {

  return (
    <div className="w-full bg-slate-50 min-h-screen p-8 flex flex-col items-center">
      <div className="flex mb-6">
        <div className="inline-flex rounded-md shadow-sm" role="group">
          <Link
            href="/dashboard/all-profiles"
            className={`px-6 py-2 text-sm cursor-pointer font-medium rounded-l-lg bg-white text-gray-700 hover:bg-gray-100`}
          >
            Profiles Available
          </Link>
          <Link
            href="/dashboard/my-profiles"
            className={`px-6 py-2 text-sm cursor-pointer font-medium rounded-r-lg bg-blue-600 text-white`}
          >
            Profiles Created
          </Link>
        </div>
      </div>

        {/* <ProfilesTab
          title="Your Available Profiles"
          subTitle="Dive in to detailed insights of your available profiles"
          profiles={PROFILES_AVAILABLE}
        /> */}
        <ProfilesTab
          title="Your Created Profiles"
          subTitle="Dive in to detailed insights of your created profiles"
          profiles={PROFILES_CREATED}
        />
    </div>
  );
}
