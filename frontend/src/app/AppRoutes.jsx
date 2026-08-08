import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout.jsx";
import HomePage from "../pages/HomePage.jsx";
import DsaPage from "../pages/DsaPage.jsx";
import SystemDesignPage from "../pages/SystemDesignPage.jsx";
import SystemDesignDetailPage from "../pages/SystemDesignDetailPage.jsx";
import OsPage from "../pages/OsPage.jsx";
import OsVideosPage from "../pages/OsVideosPage.jsx";
import OopPage from "../pages/OopPage.jsx";
import OopVideosPage from "../pages/OopVideosPage.jsx";
import SubjectsPage from "../pages/SubjectsPage.jsx";
import RoadmapPage from "../pages/RoadmapPage.jsx";
import CompanyDsaPage from "../pages/CompanyDsaPage.jsx";
import NotFound from "../pages/NotFound.jsx";

function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/dsa" element={<DsaPage />} />
        <Route path="/system-design" element={<SystemDesignPage />} />
        <Route path="/system-design/:id" element={<SystemDesignDetailPage />} />
        <Route path="/os" element={<OsPage />} />
        <Route path="/os/videos" element={<OsVideosPage />} />
        <Route path="/oop" element={<OopPage />} />
        <Route path="/oop/videos" element={<OopVideosPage />} />
        <Route path="/subjects" element={<SubjectsPage />} />
        <Route path="/roadmap" element={<RoadmapPage />} />
        <Route path="/company-dsa" element={<CompanyDsaPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
