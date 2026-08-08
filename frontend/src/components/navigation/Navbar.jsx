import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";

export function getBreadcrumbs(pathname) {
  if (pathname === "/") return ["Dashboard"];
  if (pathname.startsWith("/dsa")) return ["Preparation", "DSA"];
  if (pathname.startsWith("/company-dsa")) return ["Preparation", "Company Wise DSA"];
  if (pathname.startsWith("/system-design")) return ["Preparation", "System Design Sheet"];
  if (pathname.startsWith("/os/videos")) return ["Preparation", "Core Subjects", "OS Videos"];
  if (pathname.startsWith("/os")) return ["Preparation", "Core Subjects", "Operating Systems"];
  if (pathname.startsWith("/oop/videos")) return ["Preparation", "Core Subjects", "OOP Videos"];
  if (pathname.startsWith("/oop")) return ["Preparation", "Core Subjects", "OOPs"];
  if (pathname.startsWith("/subjects")) return ["Preparation", "Core Subjects", "CS Notes"];
  if (pathname.startsWith("/roadmap")) return ["Preparation", "8-Week Roadmap"];
  return ["Preparation", "Overview"];
}

function Navbar({ sidebarCollapsed, setSidebarCollapsed, mobileOpen, setMobileOpen }) {
  const location = useLocation();

  // Accordion state for Core Subjects
  const [coreSubjectsOpen, setCoreSubjectsOpen] = useState(
    ["/os", "/oop", "/subjects"].some((p) => location.pathname.startsWith(p))
  );

  // Keep Core Subjects open if user navigates into its topics
  useEffect(() => {
    if (["/os", "/oop", "/subjects"].some((p) => location.pathname.startsWith(p))) {
      setCoreSubjectsOpen(true);
    }
  }, [location.pathname]);

  const breadcrumbs = getBreadcrumbs(location.pathname);

  return (
    <>
      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 flex flex-col border-r border-[#27272A] bg-[#0E0E11] transition-all duration-300 ${
          mobileOpen ? "translate-x-0 w-64" : "-translate-x-full lg:translate-x-0"
        } ${sidebarCollapsed ? "lg:w-20" : "lg:w-64"}`}
      >
        {/* Brand / Logo Header */}
        <div className="flex h-16 items-center justify-between px-4 border-b border-[#27272A] shrink-0">
          <NavLink
            to="/"
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-3 overflow-hidden"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-black font-extrabold text-base shadow-sm">
              P
            </div>
            {(!sidebarCollapsed || mobileOpen) && (
              <span className="text-lg font-bold tracking-tight text-white whitespace-nowrap">
                PlacePrep
              </span>
            )}
          </NavLink>

          {/* Mobile close button */}
          <button
            onClick={() => setMobileOpen(false)}
            className="lg:hidden p-1.5 text-zinc-400 hover:text-white rounded-md"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Sidebar Nav Items List */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1.5 scrollbar-thin scrollbar-thumb-zinc-800">
          
          {/* 1. Dashboard */}
          <NavLink
            to="/"
            onClick={() => setMobileOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                isActive
                  ? "bg-zinc-800/90 text-white font-semibold border border-zinc-700/60 shadow-sm"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-900"
              }`
            }
            title="Dashboard"
          >
            <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
            </svg>
            {(!sidebarCollapsed || mobileOpen) && <span>Dashboard</span>}
          </NavLink>

          {/* 2. DSA */}
          <NavLink
            to="/dsa"
            onClick={() => setMobileOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                isActive
                  ? "bg-zinc-800/90 text-white font-semibold border border-zinc-700/60 shadow-sm"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-900"
              }`
            }
            title="DSA"
          >
            <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18c-2.305 0-4.408.867-6 2.292m0-14.25v14.25" />
            </svg>
            {(!sidebarCollapsed || mobileOpen) && <span>DSA</span>}
          </NavLink>

          {/* 3. Company wise DSA */}
          <NavLink
            to="/company-dsa"
            onClick={() => setMobileOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                isActive
                  ? "bg-zinc-800/90 text-white font-semibold border border-zinc-700/60 shadow-sm"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-900"
              }`
            }
            title="Company wise DSA"
          >
            <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5s.75 0 .75.75v1.5c0 .75-.75.75-.75.75H9m0-3h1.5m0 3v3.75M9 13.5h1.5s.75 0 .75.75v1.5c0 .75-.75.75-.75.75H9m0-3h1.5" />
            </svg>
            {(!sidebarCollapsed || mobileOpen) && <span>Company wise DSA</span>}
          </NavLink>

          {/* 4. System Design Sheet */}
          <NavLink
            to="/system-design"
            onClick={() => setMobileOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                isActive
                  ? "bg-zinc-800/90 text-white font-semibold border border-zinc-700/60 shadow-sm"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-900"
              }`
            }
            title="System Design Sheet"
          >
            <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
            </svg>
            {(!sidebarCollapsed || mobileOpen) && <span>System Design Sheet</span>}
          </NavLink>

          {/* 5. Core Subjects Collapsible Accordion */}
          <div>
            <button
              onClick={() => setCoreSubjectsOpen((prev) => !prev)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                ["/os", "/oop", "/subjects"].some((p) => location.pathname.startsWith(p))
                  ? "text-white bg-zinc-900/90 font-semibold"
                  : "text-zinc-300 hover:text-white hover:bg-zinc-900/60"
              }`}
              title="Core Subjects"
            >
              <div className="flex items-center gap-3 min-w-0">
                <svg className="w-5 h-5 shrink-0 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18c-2.305 0-4.408.867-6 2.292m0-14.25v14.25" />
                </svg>
                {(!sidebarCollapsed || mobileOpen) && <span className="truncate">Core Subjects</span>}
              </div>
              {(!sidebarCollapsed || mobileOpen) && (
                <svg
                  className={`w-4 h-4 text-zinc-500 transition-transform ${
                    coreSubjectsOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              )}
            </button>

            {/* Core Subjects Sub-Items: Operating Systems & OOPs only */}
            {coreSubjectsOpen && (!sidebarCollapsed || mobileOpen) && (
              <div className="ml-4 pl-3 border-l border-zinc-800 my-1 space-y-1">
                <NavLink
                  to="/os"
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `block px-2.5 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-zinc-800 text-white font-semibold"
                        : "text-zinc-400 hover:text-white hover:bg-zinc-900"
                    }`
                  }
                >
                  Operating Systems
                </NavLink>

                <NavLink
                  to="/oop"
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `block px-2.5 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-zinc-800 text-white font-semibold"
                        : "text-zinc-400 hover:text-white hover:bg-zinc-900"
                    }`
                  }
                >
                  OOPs
                </NavLink>
              </div>
            )}
          </div>

        </div>

        {/* Sidebar Footer User/Status info */}
        {(!sidebarCollapsed || mobileOpen) && (
          <div className="p-3 border-t border-[#27272A] bg-zinc-950/60">
            <div className="flex items-center gap-2.5 px-2 py-1.5">
              <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-medium text-zinc-400">Placement Prep Active</span>
            </div>
          </div>
        )}
      </aside>

      {/* Top Header Bar for Main Content Area */}
      <header className={`sticky top-0 z-20 h-16 border-b border-[#27272A] bg-[#0B0B0B]/90 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between transition-all duration-300 ${
        sidebarCollapsed ? "lg:pl-20" : "lg:pl-64"
      }`}>
        <div className="flex items-center gap-3">
          {/* Desktop Toggle Button */}
          <button
            onClick={() => setSidebarCollapsed((prev) => !prev)}
            className="hidden lg:flex items-center justify-center p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
            title={sidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
            title="Open Sidebar"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>

          {/* Breadcrumbs matching image header standard */}
          <nav className="flex items-center gap-2 text-xs sm:text-sm font-medium text-zinc-400">
            {breadcrumbs.map((item, index) => (
              <span key={index} className="flex items-center gap-2">
                {index > 0 && (
                  <svg className="w-3.5 h-3.5 text-zinc-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                )}
                <span className={index === breadcrumbs.length - 1 ? "text-white font-semibold" : "text-zinc-400"}>
                  {item}
                </span>
              </span>
            ))}
          </nav>
        </div>

        {/* Right header actions */}
        <div className="flex items-center gap-3">
          <NavLink
            to="/"
            className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs font-medium text-zinc-300 hover:text-white transition-colors">
          </NavLink>
        </div>
      </header>
    </>
  );
}

export default Navbar;
