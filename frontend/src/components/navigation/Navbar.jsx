import { useState } from "react";
import { NavLink } from "react-router-dom";

const navLinks = [
  { to: "/dsa",           label: "DSA" },
  { to: "/company-dsa",   label: "Company DSA" },
  { to: "/system-design", label: "System Design" },
  { to: "/oop",           label: "OOP" },
  { to: "/subjects",      label: "Subjects" },
  { to: "/roadmap",       label: "Roadmap" },
];

function getNavClass({ isActive }) {
  if (isActive) {
    return "text-sm sm:text-[15.5px] font-medium text-white px-3.5 py-2 rounded-md bg-zinc-800/80 border border-zinc-700/50 transition-colors";
  }
  return "text-sm sm:text-[15.5px] font-medium text-zinc-300 hover:text-white hover:bg-zinc-800/40 px-3.5 py-2 rounded-md transition-colors";
}

function getMobileNavClass({ isActive }) {
  if (isActive) {
    return "block w-full text-left px-4 py-3 text-base font-medium text-white bg-zinc-800/80 rounded-lg border border-zinc-700/50";
  }
  return "block w-full text-left px-4 py-3 text-base font-medium text-zinc-300 hover:bg-zinc-800/40 hover:text-white rounded-lg transition-colors";
}

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 border-b border-[#27272A] bg-[#0B0B0B]/90 backdrop-blur-md">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">

        <div className="flex items-center justify-between h-16">

          {/* logo */}
          <NavLink
            to="/"
            className="flex items-center gap-2.5 group"
            onClick={() => setMenuOpen(false)}
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-zinc-100 text-black font-bold text-sm shadow-sm transition-transform group-hover:scale-105">
              P
            </div>
            <span className="text-base font-bold tracking-tight text-[#F5F5F5]">
              PlacePrep
            </span>
          </NavLink>

          {/* desktop nav */}
          <nav className="hidden sm:flex items-center gap-1.5">
            {navLinks.map(link => (
              <NavLink key={link.to} to={link.to} className={getNavClass}>
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* hamburger */}
          <button
            onClick={() => setMenuOpen(prev => !prev)}
            className="sm:hidden flex items-center justify-center h-9 w-9 rounded-md text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors"
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* mobile menu */}
        {menuOpen && (
          <div className="sm:hidden border-t border-[#27272A] py-3 flex flex-col gap-1.5">
            {navLinks.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                className={getMobileNavClass}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        )}

      </div>
    </header>
  );
}

export default Navbar;
