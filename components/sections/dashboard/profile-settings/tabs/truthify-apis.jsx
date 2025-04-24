"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Trash2 } from "lucide-react";

export default function TruthifyAPI() {
  const [apiKeys, setApiKeys] = useState([
    {
      id: "#15267",
      dateCreated: "Mar 1, 2023",
      key: "ca913cb6-b3ac",
      environment: "Development",
    },
  ]);

  const handleGenerateKey = () => {
    // In a real app, this would call an API to generate a new key
    const newKey = {
      id: `#${Math.floor(10000 + Math.random() * 90000)}`,
      dateCreated: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      key: generateRandomKey(),
      environment: "Development",
    };

    setApiKeys([...apiKeys, newKey]);
  };

  const handleCopyKey = (key) => {
    navigator.clipboard.writeText(key).then(() => {
      // Could show a toast notification here
      console.log("Key copied to clipboard");
    });
  };

  const handleDeleteKey = (id) => {
    setApiKeys(apiKeys.filter((key) => key.id !== id));
  };

  // Helper function to generate a random key
  const generateRandomKey = () => {
    return (
      Math.random().toString(36).substring(2, 10) +
      "-" +
      Math.random().toString(36).substring(2, 6)
    );
  };

  return (
    <div className="space-y-8 py-6 ">
      <div>
        <h2 className="text-xl font-medium text-[#4B4B4B] mb-2">Truthify API</h2>
        <p className="text-gray-600 text-[14px] font-medium">
          Truthify External API is used to fetch and edit data inside of your
          portal via code. If you have lost or forgotten any API Keys, Please
          generate a new one.{" "}
          <a href="#" className="text-[#016CCD] hover:underline">
            Visit our API reference
          </a>
          .
        </p>
      </div>

      <div className="flex items-center justify-between">
        <h3 className="text-[18px] font-medium text-[#4B4B4B]">All API Keys</h3>
        <Button
          className="bg-[#016CCD] hover:bg-blue-700 text-white"
          onClick={handleGenerateKey}
        >
          Generate New API Key
        </Button>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="text-left p-4 font-light text-[#49454FCC]">
                Created BY
              </th>
              <th className="text-left p-4 font-light text-[#49454FCC]">
                Date Created
              </th>
              <th className="text-left p-4 font-light text-[#49454FCC]">Key</th>
              <th className="text-left p-4 font-light text-[#49454FCC]">
                Allowed Environment
              </th>
              <th className="p-4"></th>
            </tr>
          </thead>
          <tbody>
            {apiKeys.map((apiKey) => (
              <tr
                key={apiKey.id}
                className="border-b last:border-b-0 hover:bg-gray-50 transition-colors"
              >
                <td className="p-4 text-[#222222E5]">{apiKey.id}</td>
                <td className="p-4 text-[#222222E5]">{apiKey.dateCreated}</td>
                <td className="p-4">
                  <div className="flex items-center">
                    <span className="bg-gray-800 text-white px-3 py-1 rounded">
                      {apiKey.key}
                    </span>
                    <button
                      className="ml-2 text-gray-500 hover:text-gray-700"
                      onClick={() => handleCopyKey(apiKey.key)}
                    >
                      <Copy className="h-4 w-4" />
                    </button>
                  </div>
                </td>
                <td className="p-4 text-[#222222E5]">{apiKey.environment}</td>
                <td className="p-4 text-right">
                  <button
                    className="text-gray-500 hover:text-red-500"
                    onClick={() => handleDeleteKey(apiKey.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
