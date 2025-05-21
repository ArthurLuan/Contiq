import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import DashboardHome from './pages/dashboard/DashboardHome';
import ScriptGenerator from './pages/dashboard/ScriptGenerator';
import ContentAnalyzer from './pages/dashboard/ContentAnalyzer';
import BannerCreator from './pages/dashboard/BannerCreator';
import SocialMediaScheduler from './pages/dashboard/SocialMediaScheduler';
import AnalyticsDashboard from './pages/dashboard/AnalyticsDashboard';
import TrendingContent from './pages/dashboard/TrendingContent';
import YourContent from './pages/dashboard/YourContent';
import NotFound from './pages/NotFound';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }>
            <Route index element={<DashboardHome />} />
            <Route path="trending" element={<TrendingContent />} />
            <Route path="scripts" element={<ScriptGenerator />} />
            <Route path="content-analyzer" element={<ContentAnalyzer />} />
            <Route path="banners" element={<BannerCreator />} />
            <Route path="social-media" element={<SocialMediaScheduler />} />
            <Route path="analytics" element={<AnalyticsDashboard />} />
            <Route path="your-content" element={<YourContent />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;