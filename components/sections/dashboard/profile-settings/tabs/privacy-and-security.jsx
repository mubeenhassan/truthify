"use client";

import { useState } from "react";
import { PlusIcon } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

export default function PrivacyAndSecurity() {
  const [twoFAEnabled, setTwoFAEnabled] = useState(true);

  return (
    <div className="space-y-8 py-6">
      <div className="flex flex-col sm:flex-row justify-between mb-4">
        <div className="font-medium text-gray-700">Sign-in Email</div>
        <div className="text-gray-600">johnsmith@gmail.com</div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between mb-4">
        <div className="font-medium text-gray-700">Password</div>
        <a href="#" className="text-[#016CCD] hover:text-blue-700">
          Change password
        </a>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
        <div className="font-medium text-gray-700">2-FA autentification</div>
        <Switch
          checked={twoFAEnabled}
          onCheckedChange={setTwoFAEnabled}
          className="bg-[#016CCD]"
        />
      </div>

      <div className="flex flex-col sm:flex-row justify-between mb-4">
        <div className="font-medium text-gray-700">Phone number</div>
        <div className="text-gray-600">+380 93 123 45 67</div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between mb-4">
        <div className="font-medium text-gray-700">Reserve codes</div>
        <div className="text-gray-600">9 of 10 left</div>
      </div>

      <div className="flex justify-center">
        <Button className="bg-[#016CCD] hover:bg-blue-700 text-white">
          <PlusIcon className="mr-2 h-4 w-4" /> Generate new codes
        </Button>
      </div>

      <div className="pt-4">
        <div className="font-medium text-gray-700 mb-2">Last sign in</div>
        <div className="text-gray-600 mb-6">
          today at 18:34, Safary 198.123.23.23
        </div>

        <div className="flex justify-between items-center mb-4">
          <div className="font-medium text-gray-700">
            Total active sessions (5)
          </div>
          <a href="#" className="text-[#016CCD] hover:text-blue-700">
            All
          </a>
        </div>

        <div className="space-y-6">
          <div className="mb-4">
            <div className="font-medium">DESKTOP-6TIG6EC • Kyiv, Ukraine</div>
            <div className="text-gray-500 text-sm">Chrome • Used right now</div>
          </div>

          <div className="mb-4">
            <div className="font-medium">Iphone 11 • Kyiv, Ukraine</div>
            <div className="text-gray-500 text-sm">Chrome • 04/19/2022</div>
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <Button className="bg-[#016CCD] hover:bg-blue-700 text-white">
            <PlusIcon className="mr-2 h-4 w-4" /> Reset all active sessions
          </Button>
        </div>
      </div>
    </div>
  );
}
