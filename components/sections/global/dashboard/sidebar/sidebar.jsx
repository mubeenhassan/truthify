import {
  LayoutGrid,
  User,
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
];

export default function Sidebar() {
  return (
    <div className="flex flex-col h-full border-r border-gray-200 bg-white">
      <div className="py-8 pl-5">
        <Logo />
      </div>

      <div className="px-4 py-3">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
          Dashboard
        </h2>
      </div>

      <nav className="flex-1 px-2 pb-4 space-y-1 max-h-[275px] overflow-y-scroll">
        {navItems.map((item) => (
          <NavItem
            key={item.href}
            href={item.href}
            icon={item.icon}
            label={item.label}
          />
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
          <Link
            href="/dashboard/upgrade-plan"
            className="mt-3 bg-white text-[#289de8] px-4 py-1 rounded-md text-sm font-medium"
          >
            Upgrade
          </Link>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-4">
        <Link
          href="/dashboard/settings"
          className="flex items-center px-4 py-2 bg-[#F1F6FA] w-fit m-auto cursor-pointer hover:bg-gray-100 rounded-md"
        >
          <div className="flex-shrink-0">
            <img
              className="inline-block h-9 w-9 rounded-full object-cover"
              src="/images/avatar-user.png"
              alt="Robert R"
            />
          </div>
          <div className="ml-3 flex-1 min-w-0">
            <div className="text-sm font-medium text-gray-700 truncate">
              Robert R
            </div>
            <div className="text-xs text-gray-500 truncate">
              robert14r@gmail.com
            </div>
          </div>
          <button className="ml-1 text-gray-400 hover:text-gray-500">
            <svg
              className={`h-5 w-5 transform transition-transform duration-200`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </Link>
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
