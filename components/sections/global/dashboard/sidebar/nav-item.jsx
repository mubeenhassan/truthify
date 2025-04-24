"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function NavItem({ href, icon, label }) {
  const pathname = usePathname()
  const isActive = pathname === (href.includes('#') ? href.split('#')[0] : href);

  return (
    <Link
      href={href}
      className={`flex items-center px-2 py-2 text-[16px] font-medium rounded-md group ${
        isActive ? "text-blue-600 bg-blue-50 border-r-4 border-blue-600" : "text-[#292929] hover:bg-gray-100"
      }`}
    >
      <div className={`mr-3 ${isActive ? "text-blue-600" : "text-gray-500"}`}>{icon}</div>
      {label}
    </Link>
  )
}
