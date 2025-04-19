import Image from "next/image"

// Mock data for profiles
const profilesData = [
  {
    id: 1,
    name: "Satya Nadella",
    title: "CEO of Microsoft",
    company: "Microsoft",
    logo: "/icons/microsoft.svg",
    avatar: "/images/avatar-satya.png",
    reportsCount: 238,
  },
  {
    id: 2,
    name: "Jensen Huang",
    title: "President of Nvidia",
    company: "Nvidia",
    logo: "/icons/nvidia.svg",
    avatar: "/images/avatar-jensen.png",
    reportsCount: 134,
  },
  {
    id: 3,
    name: "Elon Musk",
    title: "CEO of Tesla Motors",
    company: "Tesla",
    logo: "/icons/tesla.svg",
    avatar: "/images/avatar-elon.png",
    reportsCount: 238,
  },
  {
    id: 4,
    name: "Sundar Pichai",
    title: "CEO of Google",
    company: "Google",
    logo: "/icons/google-color.svg",
    avatar: "/images/avatar-sundar.png",
    reportsCount: 238,
  },
  {
    id: 5,
    name: "Satya Nadella",
    title: "CEO of Microsoft",
    company: "Microsoft",
    logo: "/icons/microsoft.svg",
    avatar: "/images/avatar-satya.png",
    reportsCount: 238,
  },
  {
    id: 6,
    name: "Jensen Huang",
    title: "President of Nvidia",
    company: "Nvidia",
    logo: "/icons/nvidia.svg",
    avatar: "/images/avatar-jensen.png",
    reportsCount: 134,
  },
  {
    id: 7,
    name: "Elon Musk",
    title: "CEO of Tesla Motors",
    company: "Tesla",
    logo: "/icons/tesla.svg",
    avatar: "/images/avatar-elon.png",
    reportsCount: 238,
  },
  {
    id: 8,
    name: "Satya Nadella",
    title: "CEO of Microsoft",
    company: "Microsoft",
    logo: "/icons/microsoft.svg",
    avatar: "/images/avatar-satya.png",
    reportsCount: 238,
  },
]

// Industry filter options
const industryFilters = ["Business Executives", "Debtors", "Politically Exposed Persons", "High-Risk Players"]

export function ProfilesTab() {
  return (
    <div>
      {/* Industry Filter Dropdown (Hidden by default) */}
      <div className="absolute z-10 mt-1 w-56 bg-white shadow-lg rounded-md hidden" id="industry-dropdown">
        <ul className="py-1 text-sm text-gray-700">
          {industryFilters.map((filter, index) => (
            <li key={index}>
              <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                {filter}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Profiles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {profilesData.map((profile) => (
          <ProfileCard key={profile.id} profile={profile} />
        ))}
      </div>
    </div>
  )
}

function ProfileCard({ profile }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-full overflow-hidden">
            <Image
              src={profile.avatar || "/placeholder.svg?height=48&width=48"}
              alt={profile.name}
              width={48}
              height={48}
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{profile.name}</h3>
            <p className="text-sm text-gray-500">{profile.title}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Image
            src={profile.logo || "/placeholder.svg?height=24&width=24"}
            alt={profile.company}
            width={24}
            height={24}
            className="h-6 w-6 object-contain"
          />
          <div className="flex items-center justify-center h-10 w-10 bg-gray-200 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
        </div>
      </div>
      <div className="px-4 pb-4 text-sm">
        <span className="text-gray-600">{profile.reportsCount} Reports Available</span>
      </div>
    </div>
  )
}
