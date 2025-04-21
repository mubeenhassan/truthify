import { getUserProfile } from "@/lib/api";
import ProfileDetails from "@/components/sections/dashboard/profile";

export default async function ProfileDetailPage({ params }) {
  const { id } = await params;
  const profileData = await getUserProfile(id);

  return (
    <div className="flex max-w-7xl relative flex-col md:flex-row min-h-screen">
      <ProfileDetails id={id} profile={profileData} />
    </div>
  );
}
