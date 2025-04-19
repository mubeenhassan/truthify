"use client";
import ProfileCard from "./profile-card";

export function ProfileList({ profiles, isRecent = false }) {
  return (
    <div
      className={`bg-white flex flex-col gap-2 ${
        isRecent ? "rounded-2xl border-[1px] border-gray-300 p-5" : ""
      }`}
    >
      {profiles.map((profile, index) => (
        <ProfileCard key={`${profile.name}-${index}`} profile={profile} />
      ))}
    </div>
  );
}
