import {
  LayoutGrid,
  User,
  Users,
  FileText,
  FileEdit,
  BarChart3,
  LogOut,
  Settings,
  Lock,
  ArrowUpRight,
} from "lucide-react";
import Logo from "@/components/ui/logo";
import NavItem from "./nav-item";
import UserProfile from "./user-profile";
import Link from "next/link";

const navItems = [
  {
    href: "/dashboard",
    icon: <LayoutGrid className="w-5 h-5" />,
    label: "Main",
  },
  {
    href: "/dashboard/make-your-own",
    icon: <FileEdit className="w-5 h-5" />,
    label: "Make Your Own",
  },
  {
    href: "/dashboard/my-profiles",
    icon: <User className="w-5 h-5" />,
    label: "My Profiles",
  },
  {
    href: "/dashboard/my-reports",
    icon: <FileText className="w-5 h-5" />,
    label: "My Reports",
  },
  {
    href: "/dashboard/profile",
    icon: <User className="w-5 h-5" />,
    label: "Profile",
  },
  {
    href: "/dashboard/settings",
    icon: <Settings className="w-5 h-5" />,
    label: "Settings",
  },
  {
    href: "/dashboard/unlock",
    icon: <Lock className="w-5 h-5" />,
    label: "Unlock",
  },
  {
    href: "/dashboard/upgrade-plan",
    icon: <ArrowUpRight className="w-5 h-5" />,
    label: "Upgrade Plan",
  },
];

export default function Sidebar() {
  return (
    <div className="flex flex-col h-full border-r border-gray-200 bg-white">
      <div className="py-8 pl-5">
        <Logo/>
      </div>

      <div className="px-4 py-3">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
          Dashboard
        </h2>
      </div>

      <nav className="flex-1 px-2 pb-4 space-y-1 max-h-[275px] overflow-y-scroll">
        {navItems.map((item) => (
          <NavItem key={item.href} href={item.href} icon={item.icon} label={item.label} />
        ))}
      </nav>

      <div className="m-auto">
        <div className="bg-[#289de8] text-white p-4 rounded-lg text-center">
          <div className="text-3xl font-bold flex items-center justify-center">
            3 <BarChart3 className="ml-2 w-5 h-5" />
          </div>
          <div className="text-xs mt-1">
            Background Integrity
            <br />
            Check Available
          </div>
          <button className="mt-3 bg-white text-[#289de8] px-4 py-1 rounded-md text-sm font-medium">
            Upgrade
          </button>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-4">
        <UserProfile
          name="Robert R"
          email="robert14r@gmail.com"
          avatarUrl="/images/avatar-user.png"
        />
      </div>

      <div className="px-4 py-3">
        <Link
          href="/logout"
          className="flex items-center px-2 py-2 text-sm text-gray-700 rounded-md hover:bg-gray-100"
        >
          <LogOut className="mr-3 h-5 w-5 text-gray-500" />
          Logout
        </Link>
      </div>
    </div>
  );
}
