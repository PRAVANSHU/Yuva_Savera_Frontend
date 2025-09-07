import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout/Layout";

// Public pages
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import HowItWorksPage from "./pages/HowItWorksPage";
import CampaignsPage from "./pages/CampaignsPage";
import PoliticalAwarenessPage from "./pages/PoliticalAwarenessPage";
import VolunteerRegistrationPage from "./pages/VolunteerRegistrationPage";
import SubmitHelpRequestPage from "./pages/SubmitHelpRequestPage";
import BrowseRequestsPage from "./pages/BrowseRequestsPage";
import ProfileDashboardPage from "./pages/ProfileDashboardPage";
import ImpactDashboardPage from "./pages/ImpactDashboardPage";
import StoryWallPage from "./pages/StoryWallPage";
import PartnerRegistrationPage from "./pages/PartnerRegistrationPage";
import ContactPage from "./pages/ContactPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SubmitStoryPage from "./pages/SubmitStoryPage";
import ReportIssuePage from "./pages/ReportIssuePage";
import VolunteerDashboard from './pages/VolunteerDashboard';

// Admin pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageStories from "./pages/admin/core/ManageStories";

// Moderator layout + pages
import ModeratorDashboardLayout from "./pages/admin/moderator/ModeratorDashboardLayout";
import ModeratorDashboard from "./pages/admin/moderator/ModeratorDashboard";
import ContentApproval from "./pages/admin/moderator/ContentApproval";
import ReportedContent from "./pages/admin/moderator/ReportedContent";

function App() {
  const userInfo = JSON.parse(localStorage.getItem("userInfo") || "null");

  return (
    <Router>
      <Routes>
        {/* ================= Public Routes with Layout ================= */}
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="how-it-works" element={<HowItWorksPage />} />
          <Route path="campaigns" element={<CampaignsPage />} />
          <Route path="political-awareness" element={<PoliticalAwarenessPage />} />
          <Route path="volunteer-registration" element={<VolunteerRegistrationPage />} />
          <Route path="submit-help-request" element={<SubmitHelpRequestPage />} />
          <Route path="browse-requests" element={<BrowseRequestsPage />} />
          <Route path="profile-dashboard" element={<ProfileDashboardPage />} />
          <Route path="impact-dashboard" element={<ImpactDashboardPage />} />
          <Route path="story-wall" element={<StoryWallPage />} />
          <Route path="partner-registration" element={<PartnerRegistrationPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="submit-story" element={<SubmitStoryPage />} />
          <Route path="/admin/stories" element={<ManageStories />} />
          <Route path="/report-issue" element={<ReportIssuePage />} />
          <Route path="/dashboard" element={<VolunteerDashboard />} />

          {/* ================ Admin Dashboard (Core + District) ================ */}
          <Route
            path="/admin/*"
            element={
              userInfo && ["core_admin", "district_lead"].includes(userInfo.role) ? (
                <AdminDashboard />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
        </Route>

        {/* ================ Moderator Routes (outside Layout) ================ */}
        {/* redirect plain /moderator → /moderator/dashboard */}
        <Route path="/moderator" element={<Navigate to="/moderator/dashboard" replace />} />

        <Route
          path="/moderator/*"
          element={
            userInfo && userInfo.role === "moderator" ? (
              <ModeratorDashboardLayout />
            ) : (
              <Navigate to="/" replace />
            )
          }
        >
          <Route path="dashboard" element={<ModeratorDashboard />} />
          <Route path="content" element={<ContentApproval />} />
          <Route path="reported" element={<ReportedContent />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
