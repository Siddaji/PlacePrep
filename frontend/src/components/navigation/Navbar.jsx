import { useState } from "react";
import { NavLink } from "react-router-dom";

const navLinks = [
  { to: "/dsa", label: "DSA" },
  { to: "/system-design", label: "System Design" },
  { to: "/subjects", label: "Subjects" },
];

function getNavClass({ isActive }) {
  if (isActive) {
    return "relative text-violet-700 font-semibold text-sm px-3 py-2 rounded-lg transition-colors after:absolute after:bottom-0 after:left-3 after:right-3 after:h-0.5 after:rounded-full after:bg-violet-500";
  }
  return "text-slate-600 hover:text-slate-900 hover:bg-slate-100 font-medium text-sm px-3 py-2 rounded-lg transition-colors";
}

function getMobileNavClass({ isActive }) {
  if (isActive) {
    return "block w-full text-left px-4 py-3 text-sm font-semibold text-violet-700 bg-violet-50 rounded-xl border-l-2 border-violet-500";
  }
  return "block w-full text-left px-4 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-xl transition-colors";
}

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* main row — logo + desktop nav + hamburger */}
        <div className="flex items-center justify-between h-14">

          {/* logo */}
          <NavLink to="/" className="flex items-center gap-2" onClick={() => setMenuOpen(false)}>
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-fuchsia-500 text-white font-bold shadow-sm shadow-violet-200">
              P
            </div>
            <span className="text-lg font-bold text-violet-700">PlacePrep</span>
          </NavLink>

          {/* desktop nav — hidden on mobile */}
          <nav className="hidden sm:flex items-center gap-1">
            {navLinks.map(link => (
              <NavLink key={link.to} to={link.to} className={getNavClass}>
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* hamburger button — only on mobile */}
          <button
            onClick={() => setMenuOpen(prev => !prev)}
            className="sm:hidden flex items-center justify-center h-9 w-9 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              // X icon when open
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              // hamburger icon when closed
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* mobile menu — slides in below the main row */}
        {menuOpen && (
          <div className="sm:hidden border-t border-slate-100 py-3 flex flex-col gap-1">
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