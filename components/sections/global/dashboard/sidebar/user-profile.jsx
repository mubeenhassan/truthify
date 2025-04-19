"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { User, Settings, HelpCircle, LogOut } from "lucide-react";

export default function UserProfile({ name, email, avatarUrl }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Make the entire profile section clickable */}
      <div
        className="flex items-center px-4 py-2 bg-[#F1F6FA] w-fit m-auto cursor-pointer hover:bg-gray-100 rounded-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex-shrink-0">
          <img
            className="inline-block h-9 w-9 rounded-full object-cover"
            src={avatarUrl || "/images/avatar-user.png"}
            alt="User avatar"
          />
        </div>
        <div className="ml-3 flex-1 min-w-0">
          <div className="text-sm font-medium text-gray-700 truncate">
            {name}
          </div>
          <div className="text-xs text-gray-500 truncate">{email}</div>
        </div>
        <button className="ml-1 text-gray-400 hover:text-gray-500">
          <svg
            className={`h-5 w-5 transform ${
              isOpen ? "rotate-180" : ""
            } transition-transform duration-200`}
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
      </div>

      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute bottom-16 left-0 right-0 mt-1 mx-4 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
          <Link
            href="/dashboard/profile"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
            onClick={() => setIsOpen(false)}
          >
            <User className="mr-2 h-4 w-4 text-gray-500" />
            Your Profile
          </Link>
          <Link
            href="/dashboard/settings"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
            onClick={() => setIsOpen(false)}
          >
            <Settings className="mr-2 h-4 w-4 text-gray-500" />
            Settings
          </Link>
          <Link
            href="/dashboard/help"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
            onClick={() => setIsOpen(false)}
          >
            <HelpCircle className="mr-2 h-4 w-4 text-gray-500" />
            Help & Support
          </Link>
        </div>
      )}
    </div>
  );
}
