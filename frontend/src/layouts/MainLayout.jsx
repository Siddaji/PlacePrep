import React, { useState } from "react";
import { useLocation, useOutlet } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Navbar from "../components/navigation/Navbar.jsx";
import Footer from "../components/navigation/Footer.jsx";
import ScrollToTop from "../components/common/ScrollToTop.jsx";

function AnimatedOutlet() {
  const location = useLocation();
  const element = useOutlet();
  const shouldReduceMotion = useReducedMotion();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        initial={
          shouldReduceMotion
            ? { opacity: 0 }
            : { opacity: 0, y: 8 }
        }
        animate={
          shouldReduceMotion
            ? { opacity: 1 }
            : { opacity: 1, y: 0 }
        }
        exit={
          shouldReduceMotion
            ? { opacity: 0 }
            : { opacity: 0.05, y: -6 }
        }
        transition={{
          duration: 0.22,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="flex-1 flex flex-col w-full"
        style={{ willChange: "transform, opacity" }}
      >
        {element && React.cloneElement(element, { key: location.pathname })}
      </motion.div>
    </AnimatePresence>
  );
}

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
        className={`flex flex-col min-h-screen transition-all duration-300 ${
          sidebarCollapsed ? "lg:pl-20" : "lg:pl-64"
        }`}
      >
        <main className="flex-1 flex flex-col min-w-0">
          <AnimatedOutlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default MainLayout;
