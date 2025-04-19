import Link from "next/link";
export default function Logo({ className }) {
  return (
    <div className="flex items-center">
      <Link href="/">
        <img
          className={`h-10 w-auto ${className || ""}`}
          src="/truthify-logo.png"
          alt="Truthify Logo"
        />
      </Link>
    </div>
  );
}
