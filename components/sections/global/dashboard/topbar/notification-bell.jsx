"use client"

import { Bell, User } from "lucide-react"
import { useState, useRef, useEffect } from "react"


export default function NotificationBell({ count = 0 }) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="relative cursor-pointer p-2 text-gray-400 hover:text-gray-500 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Bell className="h-6 w-6" />
        {count > 0 && <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
          <div className="px-4 py-2 border-b border-gray-200">
            <h3 className="text-sm font-medium text-gray-900">Notifications</h3>
          </div>
          <div className="max-h-60 overflow-y-auto">
            <div className="px-4 py-3 hover:bg-gray-50 cursor-pointer">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                    <Bell className="h-4 w-4" />
                  </div>
                </div>
                <div className="ml-3 w-0 flex-1">
                  <p className="text-sm font-medium text-gray-900">New report available</p>
                  <p className="mt-1 text-sm text-gray-500">Your background check report is ready to view.</p>
                  <p className="mt-1 text-xs text-gray-400">2 hours ago</p>
                </div>
              </div>
            </div>
            <div className="px-4 py-3 hover:bg-gray-50 cursor-pointer">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center text-white">
                    <User className="h-4 w-4" />
                  </div>
                </div>
                <div className="ml-3 w-0 flex-1">
                  <p className="text-sm font-medium text-gray-900">Profile updated</p>
                  <p className="mt-1 text-sm text-gray-500">Your profile information has been updated successfully.</p>
                  <p className="mt-1 text-xs text-gray-400">1 day ago</p>
                </div>
              </div>
            </div>
          </div>
          <div className="px-4 py-2 border-t border-gray-200">
            <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-500">
              View all notifications
            </a>
          </div>
        </div>
      )}
    </div>
  )
}
