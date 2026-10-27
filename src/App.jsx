import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { AppToaster } from './components/ui/Toast';
import Login from './pages/Login';
import Register from './pages/Register';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import JobFeed from './pages/JobFeed';
import RoleMatches from './pages/RoleMatches';
import JobDetails from './pages/JobDetails';
import Applications from './pages/Applications';
import Profile from './pages/Profile';
import Contact from './pages/Contact';
import CandidateSupport from './pages/CandidateSupport';
import CareerChat from './pages/CareerChat';
import InterviewPrep from './pages/InterviewPrep';
import NotFound from './pages/NotFound';
import { CandidatePortalLayout } from './components/layout/CandidatePortalLayout';
import { EmployerPortalLayout } from './components/layout/EmployerPortalLayout';
import { AdminPortalLayout } from './components/layout/AdminPortalLayout';
import EmployerDashboard from './pages/EmployerDashboard';
import EmployerPostJob from './pages/EmployerPostJob';
import EmployerJobs from './pages/EmployerJobs';
import EmployerApplicants from './pages/EmployerApplicants';
import EmployerCompany from './pages/EmployerCompany';
import AdminDashboard from './pages/AdminDashboard';
import AdminUsers from './pages/AdminUsers';
import AdminEmployers from './pages/AdminEmployers';
import AdminJobs from './pages/AdminJobs';
import AdminAiSettings from './pages/AdminAiSettings';
import AdminLogs from './pages/AdminLogs';
import {
  selectCurrentUser,
  selectIsAuthenticated,
  setCredentials,
  logOut,
} from './store/slices/authSlice';
import { useLogoutUserMutation, useGetMeQuery } from './store/api/authApiSlice';
import { Sparkles, LogOut, CheckCircle, Briefcase, Building2 } from 'lucide-react';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const user = useSelector(selectCurrentUser);
  const location = useLocation();
  const dispatch = useDispatch();

  // Auto-authenticate using HTTP-only cookie on reload / direct URL navigation
  const { data: meData, isLoading } = useGetMeQuery(undefined, {
    skip: !!user,
  });

  useEffect(() => {
    if (meData?.data && !user) {
      dispatch(setCredentials({ user: meData.data }));
    }
  }, [meData, user, dispatch]);

  const activeUser = user || meData?.data;

  // Show security verification loader while checking credentials
  if (isLoading && !activeUser) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white">
        <div className="w-10 h-10 border-3 border-blue-500 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-sm font-semibold text-slate-300">Checking security permissions...</p>
      </div>
    );
  }

  // 1. If not logged in, strictly redirect to Login page
  if (!activeUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 2. Admins have cross-portal access to inspect Candidate and Employer portals
  if (activeUser.role === 'admin' || activeUser.role === 'super_admin') {
    return children;
  }

  // 3. Role-based isolation
  if (allowedRoles && !allowedRoles.includes(activeUser.role)) {
    if (activeUser.role === 'employer') {
      return <Navigate to="/employer/dashboard" replace />;
    }
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

function App() {
  const user = useSelector(selectCurrentUser);
  const dispatch = useDispatch();

  // Auto-authenticate using HTTP-only cookie on initial mount across any page
  const { data: meData } = useGetMeQuery(undefined, {
    skip: !!user,
  });

  useEffect(() => {
    if (meData?.data && !user) {
      dispatch(setCredentials({ user: meData.data }));
    }
  }, [meData, user, dispatch]);

  return (
    <>
      <AppToaster />

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/public-contact" element={<Contact />} />

        {/* Candidate Portal Routes */}
        <Route
          element={
            <ProtectedRoute allowedRoles={['student', 'fresh_graduate', 'professional', 'experienced']}>
              <CandidatePortalLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/candidate" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/career-chat" element={<CareerChat />} />
          <Route path="/interview-prep" element={<InterviewPrep />} />
          <Route path="/jobs" element={<JobFeed />} />
          <Route path="/matches" element={<RoleMatches />} />
          <Route path="/jobs/:id" element={<JobDetails />} />
          <Route path="/applications" element={<Applications />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/support" element={<CandidateSupport />} />
        </Route>

        {/* Employer Portal Routes */}
        <Route
          element={
            <ProtectedRoute allowedRoles={['employer']}>
              <EmployerPortalLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/employer" element={<Navigate to="/employer/dashboard" replace />} />
          <Route path="/employer/dashboard" element={<EmployerDashboard />} />
          <Route path="/employer/post-job" element={<EmployerPostJob />} />
          <Route path="/employer/jobs" element={<EmployerJobs />} />
          <Route path="/employer/applicants" element={<EmployerApplicants />} />
          <Route path="/employer/company" element={<EmployerCompany />} />
          <Route path="/employer/profile" element={<Navigate to="/employer/company" replace />} />
        </Route>

        {/* Admin Portal Routes */}
        <Route
          element={
            <ProtectedRoute allowedRoles={['admin', 'super_admin']}>
              <AdminPortalLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/employers" element={<AdminEmployers />} />
          <Route path="/admin/jobs" element={<AdminJobs />} />
          <Route path="/admin/ai-settings" element={<AdminAiSettings />} />
          <Route path="/admin/logs" element={<AdminLogs />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;


