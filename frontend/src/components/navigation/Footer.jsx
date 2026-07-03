import { Link } from "react-router-dom";

const links = [
  { to: "/dsa",           label: "DSA Tracker" },
  { to: "/system-design", label: "System Design" },
  { to: "/subjects",      label: "Core Subjects" },
];

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-white mt-auto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">

        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-8">

          {/* left — logo + tagline */}
          <div className="max-w-xs">
            <Link to="/" className="flex items-center gap-2 w-fit">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-fuchsia-500 text-white font-bold text-sm shadow-sm">
                P
              </div>
              <span className="text-base font-bold text-violet-700">PlacePrep</span>
            </Link>
            <p className="mt-3 text-sm text-slate-500 leading-relaxed">
              Structured placement prep for serious students.
              DSA, System Design, and Core CS — all in one place.
            </p>
          </div>

          {/* right — quick links */}
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">
              Quick Links
            </p>
            <ul className="flex flex-col gap-2">
              {links.map(link => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-slate-600 hover:text-violet-600 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* bottom bar */}
        <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-slate-400">
            © {year} PlacePrep. Built for students, by a student.
          </p>
          <p className="text-xs text-slate-400">
            DSA · System Design · Core CS
          </p>
        </div>

      </div>
    </footer>
  );
}

export default Footer;