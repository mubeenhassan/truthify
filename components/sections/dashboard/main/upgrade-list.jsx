import Link from "next/link";
import Image from "next/image";

export function UpgradeList({ upgradeItems }) {
  return (
    <ul className="space-y-0">
      {upgradeItems.map((item, index) => (
        <li
          key={item.name}
          className={`flex items-center justify-between py-2.5 ${
            index !== 0 ? "border-t border-gray-100" : ""
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-sky-50">
              <Image
                width={16}
                height={16}
                src={item.icon || "/placeholder.svg"}
                alt=""
                className="h-4 w-4 text-sky-600"
              />
            </div>
            <span className="text-[14px] font-semibold text-[#333333]">
              {item.name}
            </span>
          </div>
          <Link
            href="/dashboard/upgrade-plan"
            className="text-sm font-medium text-sky-600 hover:underline flex items-center gap-1"
          >
            <span className="underline">Add</span>{" "}
            <Image
              width={16}
              height={16}
              src="/icons/add-circle-blue.svg"
              alt=""
              className="h-4 w-4"
            />
          </Link>
        </li>
      ))}
    </ul>
  );
}
