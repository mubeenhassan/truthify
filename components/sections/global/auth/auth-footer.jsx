const AuthFooter = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="w-full py-6">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="text-white/60 text-sm font-normal leading-normal text-center sm:text-left">
          {/* Updated Copyright Year */}© {new Date().getFullYear()} Truthify.
          All rights reserved.{" "}
        </div>
        <div className="flex justify-center items-center gap-6">
          {/* Social Icons */}
          <SocialLink href="#" platform="facebook" />
          <SocialLink href="#" platform="google" />
          <SocialLink href="#" platform="apple" />
          <SocialLink href="#" platform="instagram" />
        </div>
      </div>
    </footer>
  );
};

export default AuthFooter;


// Helper component for Social Media Links
function SocialLink({ href, platform }) {
  return (
    <a
      href={href}
      aria-label={platform.charAt(0).toUpperCase() + platform.slice(1)}
      target="_blank"
      rel="noopener noreferrer"
    >
      <img
        // Ensure correct icon filenames, e.g., facebook-white.svg, google-white.svg
        src={`/icons/${platform.toLowerCase()}-white.svg`} // Corrected icon naming convention
        alt={platform}
        className="w-6 h-6 opacity-60 hover:opacity-100 transition-opacity"
      />
    </a>
  );
}
