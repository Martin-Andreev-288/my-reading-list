import { Link } from "react-router";

function Footer() {
  return (
    <footer className="mt-auto py-4 backdrop-blur-sm text-center border-t border-white/10 bg-neutral-900/80 text-neutral-100">
      <p className="text-sm">
        &copy; {new Date().getFullYear()} Marto Book App. All rights reserved.
      </p>
      <p className="text-xs mt-1 text-neutral-400">
        Book covers from third-party sources.{" "}
        {/* <a
          href="/privacy"
          className="underline hover:text-neutral-300 transition-colors"
        >
          Privacy Policy
        </a> */}
        <Link
          to="/privacy"
          className="underline hover:text-neutral-300 transition-colors"
        >
          Privacy Policy
        </Link>
      </p>
    </footer>
  );
}

export default Footer;
