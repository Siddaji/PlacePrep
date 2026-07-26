import { Link } from "react-router-dom";

const links = [
  { to: "/dsa",           label: "DSA Tracker" },
  { to: "/system-design", label: "System Design" },
  { to: "/subjects",      label: "Core Subjects" },
];

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-800 bg-gray-950 mt-auto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">

        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-8">

          {/* logo + tagline */}
          <div className="max-w-xs">
            <Link to="/" className="flex items-center gap-2 w-fit">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-violet-400 text-white font-bold text-sm shadow-lg shadow-violet-500/20">
                P
              </div>
              <span className="text-base font-bold text-gray-100">PlacePrep</span>
            </Link>
            <p className="mt-3 text-sm text-gray-500 leading-relaxed">
              Structured placement prep for serious students.
              DSA, System Design, and Core CS — all in one place.
            </p>
          </div>

          {/* quick links */}
          <div>
            <p className="text-xs font-semibold text-gray-600 uppercase tracking-widest mb-3">
              Quick Links
            </p>
            <ul className="flex flex-col gap-2">
              {links.map(link => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-gray-500 hover:text-violet-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* bottom bar */}
        <div className="mt-8 pt-6 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-gray-600">
            © {year} PlacePrep. Built for students, by a student.
          </p>
          <p className="text-xs text-gray-600">
            DSA · System Design · Core CS
          </p>
        </div>

      </div>
    </footer>
  );
}

export default Footer;