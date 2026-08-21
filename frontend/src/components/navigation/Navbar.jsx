import { useState, useEffect } from "react";
import { NavLink, useLocation, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";

export function getBreadcrumbs(pathname) {
  if (pathname === "/") return ["Dashboard"];
  if (pathname.startsWith("/progress")) return ["Preparation", "My Progress"];
  if (pathname.startsWith("/login")) return ["Authentication", "Sign In"];
  if (pathname.startsWith("/register")) return ["Authentication", "Register"];
  if (pathname.startsWith("/verify-email")) return ["Authentication", "Verify Email"];
  if (pathname.startsWith("/forgot-password")) return ["Authentication", "Forgot Password"];
  if (pathname.startsWith("/reset-password")) return ["Authentication", "Reset Password"];
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
  const { user, isAuthenticated, logout } = useAuth();

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
        className={`fixed top-0 bottom-0 left-0 z-50 flex flex-col border-r border-[#27272A] bg-[#0E0E11] overflow-hidden transition-[width,transform] duration-300 ease-in-out ${
          mobileOpen ? "translate-x-0 w-64" : "-translate-x-full lg:translate-x-0"
        } ${sidebarCollapsed ? "lg:w-20" : "lg:w-64"}`}
      >
        {/* Brand / Logo Header */}
        <div className="flex h-16 items-center justify-between px-4 border-b border-[#27272A] shrink-0 overflow-hidden">
          <NavLink
            to="/"
            onClick={() => { if (mobileOpen) setMobileOpen(false); }}
            className="flex items-center gap-3 overflow-hidden min-w-0"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-black font-extrabold text-base shadow-sm">
              P
            </div>
            <span
              className={`text-lg font-bold tracking-tight text-white whitespace-nowrap transition-all duration-300 ease-in-out ${
                sidebarCollapsed && !mobileOpen
                  ? "opacity-0 -translate-x-2 max-w-0 overflow-hidden pointer-events-none"
                  : "opacity-100 translate-x-0 max-w-[150px]"
              }`}
            >
              PlacePrep
            </span>
          </NavLink>

          {/* Mobile close button */}
          <button
            onClick={() => setMobileOpen(false)}
            className="lg:hidden p-1.5 text-zinc-400 hover:text-white rounded-md shrink-0"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Sidebar Nav Items List */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden px-3 py-4 space-y-1.5 scrollbar-thin scrollbar-thumb-zinc-800">
          
          {/* 1. Dashboard */}
          <NavLink
            to="/"
            onClick={() => { if (mobileOpen) setMobileOpen(false); }}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-150 overflow-hidden ${
                isActive
                  ? "bg-zinc-800/90 text-white font-semibold border border-zinc-700/60 shadow-sm"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-900 border border-transparent"
              }`
            }
            title={sidebarCollapsed && !mobileOpen ? "Dashboard" : undefined}
          >
            <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
            </svg>
            <span
              className={`whitespace-nowrap transition-all duration-300 ease-in-out ${
                sidebarCollapsed && !mobileOpen
                  ? "opacity-0 -translate-x-2 max-w-0 overflow-hidden pointer-events-none"
                  : "opacity-100 translate-x-0 max-w-[200px]"
              }`}
            >
              Dashboard
            </span>
          </NavLink>

          {/* 1.5 My Progress */}
          <NavLink
            to="/progress"
            onClick={() => { if (mobileOpen) setMobileOpen(false); }}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-150 overflow-hidden ${
                isActive
                  ? "bg-zinc-800/90 text-white font-semibold border border-zinc-700/60 shadow-sm"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-900 border border-transparent"
              }`
            }
            title={sidebarCollapsed && !mobileOpen ? "My Progress" : undefined}
          >
            <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
            </svg>
            <span
              className={`whitespace-nowrap transition-all duration-300 ease-in-out ${
                sidebarCollapsed && !mobileOpen
                  ? "opacity-0 -translate-x-2 max-w-0 overflow-hidden pointer-events-none"
                  : "opacity-100 translate-x-0 max-w-[200px]"
              }`}
            >
              My Progress
            </span>
          </NavLink>

          {/* 2. DSA */}
          <NavLink
            to="/dsa"
            onClick={() => { if (mobileOpen) setMobileOpen(false); }}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-150 overflow-hidden ${
                isActive
                  ? "bg-zinc-800/90 text-white font-semibold border border-zinc-700/60 shadow-sm"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-900 border border-transparent"
              }`
            }
            title={sidebarCollapsed && !mobileOpen ? "DSA" : undefined}
          >
            <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18c-2.305 0-4.408.867-6 2.292m0-14.25v14.25" />
            </svg>
            <span
              className={`whitespace-nowrap transition-all duration-300 ease-in-out ${
                sidebarCollapsed && !mobileOpen
                  ? "opacity-0 -translate-x-2 max-w-0 overflow-hidden pointer-events-none"
                  : "opacity-100 translate-x-0 max-w-[200px]"
              }`}
            >
              DSA
            </span>
          </NavLink>

          {/* 3. Company wise DSA */}
          <NavLink
            to="/company-dsa"
            onClick={() => { if (mobileOpen) setMobileOpen(false); }}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-150 overflow-hidden ${
                isActive
                  ? "bg-zinc-800/90 text-white font-semibold border border-zinc-700/60 shadow-sm"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-900 border border-transparent"
              }`
            }
            title={sidebarCollapsed && !mobileOpen ? "Company wise DSA" : undefined}
          >
            <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5s.75 0 .75.75v1.5c0 .75-.75.75-.75.75H9m0-3h1.5m0 3v3.75M9 13.5h1.5s.75 0 .75.75v1.5c0 .75-.75.75-.75.75H9m0-3h1.5" />
            </svg>
            <span
              className={`whitespace-nowrap transition-all duration-300 ease-in-out ${
                sidebarCollapsed && !mobileOpen
                  ? "opacity-0 -translate-x-2 max-w-0 overflow-hidden pointer-events-none"
                  : "opacity-100 translate-x-0 max-w-[200px]"
              }`}
            >
              Company wise DSA
            </span>
          </NavLink>

          {/* 4. System Design Sheet */}
          <NavLink
            to="/system-design"
            onClick={() => { if (mobileOpen) setMobileOpen(false); }}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-150 overflow-hidden ${
                isActive
                  ? "bg-zinc-800/90 text-white font-semibold border border-zinc-700/60 shadow-sm"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-900 border border-transparent"
              }`
            }
            title={sidebarCollapsed && !mobileOpen ? "System Design Sheet" : undefined}
          >
            <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
            </svg>
            <span
              className={`whitespace-nowrap transition-all duration-300 ease-in-out ${
                sidebarCollapsed && !mobileOpen
                  ? "opacity-0 -translate-x-2 max-w-0 overflow-hidden pointer-events-none"
                  : "opacity-100 translate-x-0 max-w-[200px]"
              }`}
            >
              System Design Sheet
            </span>
          </NavLink>

          {/* 5. Core Subjects Collapsible Accordion */}
          <div>
            <button
              onClick={() => {
                if (sidebarCollapsed && !mobileOpen) {
                  setSidebarCollapsed(false);
                  setCoreSubjectsOpen(true);
                } else {
                  setCoreSubjectsOpen((prev) => !prev);
                }
              }}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-150 overflow-hidden ${
                ["/os", "/oop", "/subjects"].some((p) => location.pathname.startsWith(p))
                  ? "text-white bg-zinc-900/90 font-semibold border border-zinc-800"
                  : "text-zinc-300 hover:text-white hover:bg-zinc-900/60 border border-transparent"
              }`}
              title={sidebarCollapsed && !mobileOpen ? "Core Subjects" : undefined}
            >
              <div className="flex items-center gap-3 min-w-0 overflow-hidden">
                <svg className="w-5 h-5 shrink-0 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18c-2.305 0-4.408.867-6 2.292m0-14.25v14.25" />
                </svg>
                <span
                  className={`whitespace-nowrap transition-all duration-300 ease-in-out ${
                    sidebarCollapsed && !mobileOpen
                      ? "opacity-0 -translate-x-2 max-w-0 overflow-hidden pointer-events-none"
                      : "opacity-100 translate-x-0 max-w-[200px]"
                  }`}
                >
                  Core Subjects
                </span>
              </div>
              <svg
                className={`w-4 h-4 text-zinc-500 shrink-0 transition-all duration-300 ease-in-out ${
                  coreSubjectsOpen ? "rotate-180" : ""
                } ${
                  sidebarCollapsed && !mobileOpen
                    ? "opacity-0 -translate-x-2 max-w-0 overflow-hidden pointer-events-none"
                    : "opacity-100 max-w-[20px]"
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </button>

            {/* Core Subjects Sub-Items: Operating Systems & OOPs only */}
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                coreSubjectsOpen && (!sidebarCollapsed || mobileOpen)
                  ? "max-h-32 opacity-100 ml-4 pl-3 border-l border-zinc-800 my-1 space-y-1"
                  : "max-h-0 opacity-0 my-0 border-transparent pointer-events-none"
              }`}
            >
              <NavLink
                to="/os"
                onClick={() => { if (mobileOpen) setMobileOpen(false); }}
                className={({ isActive }) =>
                  `block px-2.5 py-1.5 rounded-md text-xs sm:text-sm font-medium whitespace-nowrap transition-colors duration-150 ${
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
                onClick={() => { if (mobileOpen) setMobileOpen(false); }}
                className={({ isActive }) =>
                  `block px-2.5 py-1.5 rounded-md text-xs sm:text-sm font-medium whitespace-nowrap transition-colors duration-150 ${
                    isActive
                      ? "bg-zinc-800 text-white font-semibold"
                      : "text-zinc-400 hover:text-white hover:bg-zinc-900"
                  }`
                }
              >
                OOPs
              </NavLink>
            </div>
          </div>

        </div>

        {/* Sidebar Footer User/Status info */}
        <div className="p-3 border-t border-[#27272A] bg-zinc-950/60 shrink-0 overflow-hidden">
          {isAuthenticated ? (
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="h-8 w-8 rounded-full bg-zinc-800 border border-zinc-700 text-white font-semibold text-xs flex items-center justify-center shrink-0">
                {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
              </div>
              <div
                className={`min-w-0 transition-all duration-300 ease-in-out ${
                  sidebarCollapsed && !mobileOpen
                    ? "opacity-0 -translate-x-2 max-w-0 overflow-hidden pointer-events-none"
                    : "opacity-100 translate-x-0 max-w-[160px]"
                }`}
              >
                <p className="text-xs font-semibold text-white truncate whitespace-nowrap">{user?.name}</p>
                <p className="text-[10px] text-zinc-400 truncate whitespace-nowrap">{user?.email}</p>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse shrink-0 ml-1" />
              <span
                className={`text-xs font-medium text-zinc-400 whitespace-nowrap transition-all duration-300 ease-in-out ${
                  sidebarCollapsed && !mobileOpen
                    ? "opacity-0 -translate-x-2 max-w-0 overflow-hidden pointer-events-none"
                    : "opacity-100 translate-x-0 max-w-[160px]"
                }`}
              >
                Placement Prep Active
              </span>
            </div>
          )}
        </div>
      </aside>

      {/* Top Header Bar for Main Content Area */}
      <header className={`sticky top-0 z-20 h-16 border-b border-[#27272A] bg-[#0B0B0B]/90 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between transition-[padding-left] duration-300 ease-in-out ${
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
        <div className="flex items-center gap-2.5">
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-zinc-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span className="font-medium text-white">{user?.name}</span>
              </div>
              <button
                onClick={logout}
                className="px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-700/80 text-xs font-medium text-zinc-300 hover:text-white transition-colors"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="px-3.5 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-medium text-zinc-200 hover:text-white transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="px-3.5 py-1.5 rounded-lg bg-white hover:bg-zinc-200 text-black font-semibold text-xs transition-colors"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </header>
    </>
  );
}

export default Navbar;
