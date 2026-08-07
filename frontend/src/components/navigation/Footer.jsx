import { Link } from "react-router-dom";

const links = [
  { to: "/dsa",           label: "DSA Tracker" },
  { to: "/company-dsa",   label: "Company DSA" },
  { to: "/system-design", label: "System Design" },
  { to: "/subjects",      label: "Core Subjects" },
  { to: "/roadmap",       label: "8-Week Roadmap" },
];

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[#27272A] bg-[#0B0B0B] mt-auto">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12 sm:py-14">

        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-8">

          {/* logo + tagline */}
          <div className="max-w-sm space-y-3">
            <Link to="/" className="flex items-center gap-2.5 w-fit">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-zinc-100 text-black font-bold text-sm">
                P
              </div>
              <span className="text-base font-bold tracking-tight text-[#F5F5F5]">
                PlacePrep
              </span>
            </Link>
            <p className="text-sm sm:text-[15px] text-zinc-400 leading-relaxed">
              Structured placement prep for engineering candidates.
              DSA, System Design, and Core CS — curated and organized.
            </p>
          </div>

          {/* quick links */}
          <div>
            <p className="text-sm font-semibold text-zinc-300 uppercase tracking-wider mb-3">
              Platform
            </p>
            <ul className="flex flex-col gap-2.5">
              {links.map(link => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm sm:text-[15px] text-zinc-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* bottom bar */}
        <div className="mt-12 pt-6 border-t border-[#27272A] flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-zinc-400">
          <p>© {year} PlacePrep. Built for engineering candidates.</p>
          <p className="font-mono text-xs sm:text-sm text-zinc-400">DSA · System Design · CS Core</p>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
