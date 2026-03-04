import Link from "next/link";

const links = [
  { href: "/", label: "Start" },
  { href: "/home", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/experience", label: "Experience" },
  { href: "/interests", label: "Interests" },
  { href: "/contact", label: "Contact" }
];

export function TopNav() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/60 bg-cream/85 backdrop-blur">
      <nav className="mx-auto flex w-[min(1080px,94vw)] flex-col gap-3 py-4 lg:flex-row lg:items-center lg:justify-between">
        <Link href="/" className="font-bold tracking-wide text-grape">
          🍓 Stella Lee 
        </Link>
        <div className="flex w-full flex-col items-stretch gap-2 lg:w-auto lg:flex-row lg:items-center">
          <ul className="flex flex-wrap items-center justify-end gap-2 text-sm font-medium text-grape/90">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="rounded-full px-3 py-1.5 transition hover:bg-white hover:shadow-dreamy"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}
