import React, { useEffect, Suspense, lazy } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { AppToaster } from './components/ui/Toast';
import ErrorBoundary from './components/common/ErrorBoundary';
import PageLoader from './components/common/PageLoader';
import {
  selectCurrentUser,
  setCredentials,
} from './store/slices/authSlice';
import { useGetMeQuery } from './store/api/authApiSlice';

// ============================================================================
// LAZY-LOADED PUBLIC PAGES
// ============================================================================
const Landing = lazy(() => import('./pages/Landing'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const Contact = lazy(() => import('./pages/Contact'));
const NotFound = lazy(() => import('./pages/NotFound'));

// ============================================================================
// LAZY-LOADED CANDIDATE PORTAL & PAGES
// ============================================================================
const CandidatePortalLayout = lazy(() => import('./components/layout/CandidatePortalLayout'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const JobFeed = lazy(() => import('./pages/JobFeed'));
const RoleMatches = lazy(() => import('./pages/RoleMatches'));
const JobDetails = lazy(() => import('./pages/JobDetails'));
const Applications = lazy(() => import('./pages/Applications'));
const Profile = lazy(() => import('./pages/Profile'));
const CandidateSupport = lazy(() => import('./pages/CandidateSupport'));
const CareerChat = lazy(() => import('./pages/CareerChat'));
const InterviewPrep = lazy(() => import('./pages/InterviewPrep'));

// ============================================================================
// LAZY-LOADED EMPLOYER PORTAL & PAGES
// ============================================================================
const EmployerPortalLayout = lazy(() => import('./components/layout/EmployerPortalLayout'));
const EmployerDashboard = lazy(() => import('./pages/EmployerDashboard'));
const EmployerPostJob = lazy(() => import('./pages/EmployerPostJob'));
const EmployerJobs = lazy(() => import('./pages/EmployerJobs'));
const EmployerApplicants = lazy(() => import('./pages/EmployerApplicants'));
const EmployerCompany = lazy(() => import('./pages/EmployerCompany'));

// ============================================================================
// LAZY-LOADED ADMIN PORTAL & PAGES
// ============================================================================
const AdminPortalLayout = lazy(() => import('./components/layout/AdminPortalLayout'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const AdminUsers = lazy(() => import('./pages/AdminUsers'));
const AdminEmployers = lazy(() => import('./pages/AdminEmployers'));
const AdminJobs = lazy(() => import('./pages/AdminJobs'));
const AdminAiSettings = lazy(() => import('./pages/AdminAiSettings'));
const AdminLogs = lazy(() => import('./pages/AdminLogs'));

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
    <ErrorBoundary>
      <AppToaster />

      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Public Pages */}
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
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
