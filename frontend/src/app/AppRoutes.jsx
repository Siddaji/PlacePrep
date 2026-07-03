import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout.jsx";
import HomePage from "../pages/HomePage.jsx";
import DsaPage from "../pages/DsaPage.jsx";
import SystemDesignPage from "../pages/SystemDesignPage.jsx";
import SubjectsPage from "../pages/SubjectsPage.jsx";

function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/dsa" element={<DsaPage />} />
        <Route path="/system-design" element={<SystemDesignPage />} />
        <Route path="/subjects" element={<SubjectsPage />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;