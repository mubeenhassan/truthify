import DashboardPageLayout from "@/components/sections/global/dashboard/layout";

export const metadata = {
  title: "Truthify Dashboard",
  description: "AI-Powered Integrity Reports for Businesses",
};
export default function DashboardLayout({ children }) {
  return <DashboardPageLayout>{children}</DashboardPageLayout>;
}
