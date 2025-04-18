import AuthFooter from "@/components/sections/global/auth/auth-footer";
import AuthHeader from "@/components/sections/global/auth/auth-header";

export default function PagesLayout({ children }) {
  return (
    <body>
      <main>
        <div className="flex min-h-screen flex-col items-center bg-sky-950 px-4 py-8 font-['Inter'] text-white sm:px-6 lg:px-8">
          <AuthHeader />
          {children}
          <AuthFooter />
        </div>
      </main>
    </body>
  );
}
