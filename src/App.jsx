import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import HowItWorksPage from './pages/HowItWorksPage';
import CampaignsPage from './pages/CampaignsPage';
import PoliticalAwarenessPage from './pages/PoliticalAwarenessPage';
import VolunteerRegistrationPage from './pages/VolunteerRegistrationPage';
import SubmitHelpRequestPage from './pages/SubmitHelpRequestPage';
import BrowseRequestsPage from './pages/BrowseRequestsPage';
import ProfileDashboardPage from './pages/ProfileDashboardPage';
import ImpactDashboardPage from './pages/ImpactDashboardPage';
import StoryWallPage from './pages/StoryWallPage';
import PartnerRegistrationPage from './pages/PartnerRegistrationPage';
import ContactPage from './pages/ContactPage';
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <Router>
      <Routes>
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
        </Route>
      </Routes>
    </Router>
  );
}

export default App;