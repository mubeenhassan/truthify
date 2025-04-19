"use client"

import { useState } from "react"

export function FilterDropdown({ options, label, onSelect }) {
  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState(null)

  const handleSelect = (option) => {
    setSelected(option)
    setIsOpen(false)
    if (onSelect) onSelect(option)
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-40 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none"
      >
        {label}
        <svg
          className="w-5 h-5 ml-2 -mr-1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-56 bg-white shadow-lg rounded-md">
          <ul className="py-1 text-sm text-gray-700">
            {options.map((option, index) => (
              <li key={index}>
                <button
                  onClick={() => handleSelect(option)}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  {option}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
