import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { selectCurrentUser, selectIsAuthenticated, setCredentials } from '../store/slices/authSlice';
import { useGetMeQuery } from '../store/api/authApiSlice';
import { Building2, GraduationCap, ShieldCheck } from 'lucide-react';

export const useUserPortal = () => {
  const dispatch = useDispatch();
  const reduxUser = useSelector(selectCurrentUser);
  const { data: meData } = useGetMeQuery(undefined, {
    skip: !!reduxUser,
  });

  useEffect(() => {
    if (meData?.data && !reduxUser) {
      dispatch(setCredentials({ user: meData.data }));
    }
  }, [meData, reduxUser, dispatch]);

  const user = reduxUser || meData?.data;
  const isAuthenticated = useSelector(selectIsAuthenticated) || !!user;

  if (!isAuthenticated || !user) {
    return {
      isAuthenticated: false,
      user: null,
      portalPath: '/login',
      portalName: 'Employer Portal',
      PortalIcon: Building2,
      primaryLabel: 'Create Free Account',
      portalLabel: 'Go to Portal',
      roleBadge: null,
      secondaryPath: '/login',
      secondaryLabel: 'Employer Portal',
    };
  }

  const role = user.role || 'candidate';
  let portalPath = '/dashboard';
  let portalName = 'Candidate Portal';
  let PortalIcon = GraduationCap;
  let portalLabel = 'Go to Candidate Portal';
  let roleBadge = 'Candidate';
  let secondaryPath = '/jobs';
  let secondaryLabel = 'Explore Role Matches';

  if (role === 'admin' || role === 'super_admin') {
    portalPath = '/admin/dashboard';
    portalName = 'Admin Portal';
    PortalIcon = ShieldCheck;
    portalLabel = 'Go to Admin Console';
    roleBadge = 'Admin';
    secondaryPath = '/admin/logs';
    secondaryLabel = 'Audit & Security Logs';
  } else if (role === 'employer') {
    portalPath = '/employer/dashboard';
    portalName = 'Employer Portal';
    PortalIcon = Building2;
    portalLabel = 'Go to Employer Portal';
    roleBadge = 'Employer';
    secondaryPath = '/employer/jobs';
    secondaryLabel = 'Manage Job Vacancies';
  } else {
    portalPath = '/dashboard';
    portalName = 'Candidate Portal';
    PortalIcon = GraduationCap;
    portalLabel = 'Go to Candidate Portal';
    roleBadge =
      role === 'student'
        ? 'Student'
        : role === 'fresh_graduate'
        ? 'Fresh Graduate'
        : role === 'professional'
        ? 'Professional'
        : 'Candidate';
    secondaryPath = '/jobs';
    secondaryLabel = 'Explore Role Matches';
  }

  return {
    isAuthenticated: true,
    user,
    portalPath,
    portalName,
    PortalIcon,
    primaryLabel: 'Go to Portal',
    portalLabel,
    roleBadge,
    secondaryPath,
    secondaryLabel,
  };
};

export default useUserPortal;
