"use client"

import { Menu } from "lucide-react"
import SearchBox from "./search-box"
import NotificationBell from "./notification-bell"


export default function Topbar({ onMenuClick }) {
  return (
    <header className="sticky top-0 z-10 flex h-16 flex-shrink-0 bg-white shadow">
      <div className="flex flex-1 justify-between px-4 md:px-6">
        {/* Mobile menu button */}
        <div className="flex items-center md:hidden">
          <button type="button" className="text-gray-500 hover:text-gray-900 focus:outline-none" onClick={onMenuClick}>
            <Menu className="h-6 w-6" />
          </button>
        </div>

        {/* Search */}
        <div className="flex flex-1 items-center justify-center px-2 md:ml-6 md:justify-start">
          <SearchBox />
        </div>

        {/* Notifications */}
        <div className="flex items-center">
          <NotificationBell count={1}/>
        </div>
      </div>
    </header>
  )
}
