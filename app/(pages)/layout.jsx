import PageFooter from "@/components/sections/global/pages/page-footer";
import PageHeader from "@/components/sections/global/pages/page-header";

export default function PagesLayout({ children }) {
  return (
    <body>
      <main>
        <PageHeader />
        <div className="bg-white font-['Inter'] text-zinc-800">{children}</div>
        <PageFooter />
      </main>
    </body>
  );
}
