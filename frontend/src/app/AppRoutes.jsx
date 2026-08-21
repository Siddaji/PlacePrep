import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout.jsx";
import HomePage from "../pages/HomePage.jsx";
import DsaPage from "../pages/DsaPage.jsx";
import SystemDesignPage from "../pages/SystemDesignPage.jsx";
import SystemDesignDetailPage from "../pages/SystemDesignDetailPage.jsx";
import OopPage from "../pages/OopPage.jsx";
import OopVideosPage from "../pages/OopVideosPage.jsx";
import OsPage from "../pages/OsPage.jsx";
import OsVideosPage from "../pages/OsVideosPage.jsx";
import SubjectsPage from "../pages/SubjectsPage.jsx";
import RoadmapPage from "../pages/RoadmapPage.jsx";
import CompanyDsaPage from "../pages/CompanyDsaPage.jsx";
import LoginPage from "../pages/LoginPage.jsx";
import RegisterPage from "../pages/RegisterPage.jsx";
import VerifyEmailPage from "../pages/VerifyEmailPage.jsx";
import ForgotPasswordPage from "../pages/ForgotPasswordPage.jsx";
import ResetPasswordPage from "../pages/ResetPasswordPage.jsx";
import NotFound from "../pages/NotFound.jsx";
import ProgressPage from "../pages/ProgressPage.jsx";

function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
         <Route path="/progress" element={<ProgressPage />} />
        <Route path="/dsa" element={<DsaPage />} />
        <Route path="/system-design" element={<SystemDesignPage />} />
        <Route path="/system-design/:id" element={<SystemDesignDetailPage />} />
        <Route path="/oop" element={<OopPage />} />
        <Route path="/oop/videos" element={<OopVideosPage />} />
        <Route path="/os" element={<OsPage />} />
        <Route path="/os/videos" element={<OsVideosPage />} />
        <Route path="/subjects" element={<SubjectsPage />} />
        <Route path="/roadmap" element={<RoadmapPage />} />
        <Route path="/company-dsa" element={<CompanyDsaPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/verify-email" element={<VerifyEmailPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
