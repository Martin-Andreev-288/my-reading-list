function Footer() {
  return (
    <footer className="mt-auto py-4 backdrop-blur-sm text-center border-t border-white/10 bg-neutral-900/80  text-neutral-100">
      <p className="text-sm">
        &copy; {new Date().getFullYear()} Marto Book App. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;
