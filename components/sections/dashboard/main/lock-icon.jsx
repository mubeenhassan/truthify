import Image from "next/image"

export function LockIcon() {
  return (
    <div className="flex w-[72px] h-[72px] flex-shrink-0 items-center justify-center rounded-full bg-gray-200 border border-gray-300">
      <Image width={24} height={24} src="/icons/lock-closed-gray.svg" className="text-gray-500" alt="Locked" />
    </div>
  )
}
