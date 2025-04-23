"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

export default function ContentPreference() {
  const [makeProfilePrivate, setMakeProfilePrivate] = useState(false)
  const [includePrivateContributions, setIncludePrivateContributions] = useState(false)

  const handleUpdatePreferences = () => {
    // Handle updating preferences
    console.log({
      makeProfilePrivate,
      includePrivateContributions,
    })
  }

  return (
    <div className="space-y-8 py-6">
      <div className="space-y-4">
        <div className="flex items-start space-x-3">
          <Checkbox id="make-private" checked={makeProfilePrivate} onCheckedChange={setMakeProfilePrivate} />
          <div>
            <label htmlFor="make-private" className="font-medium text-gray-700 cursor-pointer">
              Make Your Profiles Private and Hide Data
            </label>
            <p className="text-gray-600 mt-1">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium,
              inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-start space-x-3">
          <Checkbox
            id="include-private"
            checked={includePrivateContributions}
            onCheckedChange={setIncludePrivateContributions}
          />
          <div>
            <label htmlFor="include-private" className="font-medium text-gray-700 cursor-pointer">
              Include private contributions on your profile
            </label>
            <p className="text-gray-600 mt-1">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium,
              inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button className="bg-[#016CCD] hover:bg-blue-700 text-white" onClick={handleUpdatePreferences}>
          Update Preferences
        </Button>
      </div>
    </div>
  )
}
