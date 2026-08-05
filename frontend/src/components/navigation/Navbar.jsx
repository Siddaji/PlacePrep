import { useState } from "react";
import { NavLink } from "react-router-dom";

const navLinks = [
  { to: "/dsa",           label: "DSA" },
  { to: "/company-dsa",   label: "Company DSA" },
  { to: "/system-design", label: "System Design" },
  { to: "/subjects",      label: "Subjects" },
  { to: "/roadmap",       label: "Roadmap" },
  { to: "/pricing",       label: "Pricing" },
];

function getNavClass({ isActive }) {
  if (isActive) {
    return "relative text-violet-400 font-semibold text-sm px-3 py-2 rounded-lg bg-violet-500/10 transition-colors";
  }
  return "text-gray-400 hover:text-gray-100 hover:bg-gray-800 font-medium text-sm px-3 py-2 rounded-lg transition-colors";
}

function getMobileNavClass({ isActive }) {
  if (isActive) {
    return "block w-full text-left px-4 py-3 text-sm font-semibold text-violet-400 bg-violet-500/10 rounded-xl border-l-2 border-violet-500";
  }
  return "block w-full text-left px-4 py-3 text-sm font-medium text-gray-400 hover:bg-gray-800 hover:text-gray-100 rounded-xl transition-colors";
}

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-20 border-b border-gray-800 bg-gray-950/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <div className="flex items-center justify-between h-14">

          {/* logo */}
          <NavLink
            to="/"
            className="flex items-center gap-2"
            onClick={() => setMenuOpen(false)}
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-violet-400 text-white font-bold text-sm shadow-lg shadow-violet-500/20">
              P
            </div>
            <span className="text-base font-bold text-gray-100">PlacePrep</span>
          </NavLink>

          {/* desktop nav */}
          <nav className="hidden sm:flex items-center gap-1">
            {navLinks.map(link => (
              <NavLink key={link.to} to={link.to} className={getNavClass}>
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* hamburger */}
          <button
            onClick={() => setMenuOpen(prev => !prev)}
            className="sm:hidden flex items-center justify-center h-9 w-9 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-gray-100 transition-colors"
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
          <div className="sm:hidden border-t border-gray-800 py-3 flex flex-col gap-1">
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