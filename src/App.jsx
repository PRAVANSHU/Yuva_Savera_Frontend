import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout/Layout";
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

// Admin dashboards
import AdminDashboard from "./pages/admin/AdminDashboard";

function App() {
  // Get logged-in user from localStorage
  const userInfo = JSON.parse(localStorage.getItem("userInfo") || "null");

  return (
    <Router>
      <Routes>
        {/* Public / Normal routes */}
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

          {/* Admin route */}
          <Route
            path="/admin/*"
            element={
              userInfo && ["core_admin", "district_lead", "moderator"].includes(userInfo.role) ? (
                <AdminDashboard />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
