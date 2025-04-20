"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import Image from "next/image";

const dummyUsers = [
  {
    id: 1,
    name: "Satya Nadella",
    title: "CEO of Microsoft",
    company: "Microsoft",
    score: 7.8,
    logo: "/icons/microsoft.svg",
    avatar: "/images/avatar-satya.png",
    isLocked: false,
  },
  {
    id: 2,
    name: "Sundar Pichai",
    title: "CEO of Google",
    company: "Google",
    score: 7.1,
    logo: "/icons/google-color.svg",
    avatar: "/images/avatar-sundar.png",
    isLocked: true,
  },
  {
    id: 3,
    name: "Elon Musk",
    title: "CEO of Tesla Motors",
    company: "Tesla Motors",
    score: 4.6,
    logo: "/images/tesla.png",
    avatar: "/images/avatar-elon.png",
    isLocked: true,
  },
];

export default function SearchBox() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchRef = useRef(null);

  // Debounce search
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (query.trim() === "") {
        setResults([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      const lowerQuery = query.toLowerCase();
      const filtered = dummyUsers.filter((user) =>
        [user.name, user.title, user.company].some((field) =>
          field.toLowerCase().includes(lowerQuery)
        )
      );
      setResults(filtered);
      setLoading(false);
    }, 600);

    return () => clearTimeout(timeout);
  }, [query]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setQuery("");
        setResults([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleClick = (id) => {
    setQuery("");
    setResults([]);
    router.push(`/dashboard/profile/${id}`);
  };

  return (
    <div ref={searchRef} className="w-full max-w-lg relative">
      {/* Search Input */}
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Satya Na"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="block w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      {/* Results */}
      {loading && (
        <p className="text-sm absolute top-[38px] text-gray-400">
          Searching...
        </p>
      )}

      {!loading && results.length > 0 && (
        <div className="w-full py-2 absolute top-[38px] z-10 bg-white shadow-md rounded-md space-y-1">
          {results.map((user) => (
            <div
              key={user.id}
              onClick={() => handleClick(user.id)}
              className="flex items-center gap-4 p-4 cursor-pointer hover:bg-gray-50"
            >
              <Image
                src={user.avatar}
                alt={user.name}
                width={48}
                height={48}
                className="rounded-full w-12 h-12 object-cover"
              />
              <div className="flex-1">
                <p className="text-sm font-semibold text-zinc-800">
                  {user.name}
                </p>
                <p className="text-sm text-gray-500">{user.title}</p>
                <p className="text-xs text-gray-400">{user.company}</p>
              </div>
              <Image
                src={user.logo}
                alt={`${user.company} logo`}
                width={24}
                height={24}
                className="w-6 h-6 object-contain"
              />
            </div>
          ))}
        </div>
      )}

      {!loading && query && results.length === 0 && (
        <p className="w-full h-20 text-sm absolute top-[38px] z-10 bg-white text-gray-400 flex items-center justify-center rounded-md shadow">
          No results found.
        </p>
      )}
    </div>
  );
}
