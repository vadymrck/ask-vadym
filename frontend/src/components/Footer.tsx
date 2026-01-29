export default function Footer() {
  return (
    <footer className="fixed bottom-0 right-0 py-2 px-4 sm:px-6 lg:px-8">
      <p className="text-xs text-[var(--text-secondary)]">
        &copy; {new Date().getFullYear()} Vadym Marochok
      </p>
    </footer>
  );
}
