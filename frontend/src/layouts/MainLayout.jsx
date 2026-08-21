import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/navigation/Navbar.jsx";
import Footer from "../components/navigation/Footer.jsx";
import ScrollToTop from "../components/common/ScrollToTop.jsx";

function MainLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0B0B0B] text-[#F5F5F5] font-sans relative overflow-x-hidden">
      <ScrollToTop />

      {/* Sidebar + Top Header Navigation */}
      <Navbar
        sidebarCollapsed={sidebarCollapsed}
        setSidebarCollapsed={setSidebarCollapsed}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      {/* Main Right Content Panel with Responsive Left Padding */}
      <div
        className={`flex flex-col min-h-screen transition-[padding-left] duration-300 ease-in-out ${
          sidebarCollapsed ? "lg:pl-20" : "lg:pl-64"
        }`}
      >
        <main className="flex-1 flex flex-col min-w-0">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default MainLayout;
