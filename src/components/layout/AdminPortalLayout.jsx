import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { AdminPortalProvider, useAdminPortal } from '../../context/AdminPortalContext';
import { AdminSidebar } from '../admin/common/AdminSidebar';
import { AdminTopBar } from '../admin/common/AdminTopBar';

const AdminPortalShell = () => {
  const { sidebarOpen, setSidebarOpen } = useAdminPortal();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Desktop & Tablet Permanent Docked Sidebar (Tablet: w-12 icon rail, Laptop: w-60, Desktop: w-68 full sidebar, 2XL/3XL/4K Scaled) */}
      <aside className="hidden md:flex w-12 lg:w-60 xl:w-68 2xl:w-80 3xl:w-96 4k:w-[26rem] lg:min-w-[15rem] xl:min-w-[17rem] 2xl:min-w-[20rem] 3xl:min-w-[24rem] 4k:min-w-[26rem] shrink-0 bg-gradient-to-b from-[#0b1f4c] via-[#091b42] to-[#071536] text-blue-100 flex-col justify-between border-r border-[#1e3a7a]/60 h-screen sticky top-0 z-30 shadow-xl shadow-blue-950/20 overflow-hidden transition-[width] duration-300">
        <AdminSidebar isDrawer={false} />
      </aside>

      {/* Mobile Drawer (Screens < 768px) */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity"
          />
          <aside className="relative z-50 w-72 max-w-[85vw] bg-gradient-to-b from-[#0b1f4c] via-[#091b42] to-[#071536] text-blue-100 flex flex-col justify-between h-full border-r border-[#1e3a7a]/60 shadow-2xl">
            <AdminSidebar isDrawer={true} />
          </aside>
        </div>
      )}

      {/* Main Right Content Workspace */}
      <div className="flex-1 flex flex-col min-w-0 h-screen max-h-screen overflow-y-auto">
        <AdminTopBar />

        {/* Dynamic Admin Page Outlet - Unconstrained for 4K / Ultra-wide */}
        <main className="flex-1 p-4 sm:p-5 lg:p-6 xl:p-8 2xl:p-10 3xl:p-12 4k:p-16 max-w-7xl 2xl:max-w-[2000px] 3xl:max-w-[2400px] 4k:max-w-[2800px] w-full mx-auto space-y-6 2xl:space-y-8 3xl:space-y-10 flex flex-col justify-between min-h-[calc(100vh-8rem)]">
          <Outlet />
        </main>

        {/* Portal Footer */}
        <footer className="mt-auto bg-white border-t border-slate-200/80 py-4 2xl:py-6 px-6 2xl:px-10 text-center text-xs 2xl:text-sm 3xl:text-base text-slate-500">
          <div className="w-full px-2 sm:px-4 2xl:px-8 flex flex-col sm:flex-row items-center justify-between gap-2">
            <p>© 2026 Smart Career Role Match AI System — Super Admin Console.</p>
            <div className="flex items-center gap-4 text-[11px] 2xl:text-xs 3xl:text-sm">
              <Link to="/contact" className="hover:text-blue-600 transition-colors">
                Support Desk
              </Link>
              <Link to="/" className="hover:text-blue-600 transition-colors">
                Home
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentUser, setCredentials } from '../../store/slices/authSlice';
import { useGetMeQuery } from '../../store/api/authApiSlice';

export const AdminPortalLayout = () => {
  const reduxUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();

  // Rehydrate authenticated admin profile from HttpOnly cookie session if store is empty
  const { data: meData, isLoading } = useGetMeQuery(undefined, {
    skip: !!reduxUser,
  });

  React.useEffect(() => {
    if (meData?.data && !reduxUser) {
      dispatch(setCredentials({ user: meData.data }));
    }
  }, [meData, reduxUser, dispatch]);

  const activeUser = reduxUser || meData?.data;

  if (isLoading && !activeUser) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white">
        <div className="w-10 h-10 border-3 border-blue-500 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-sm font-semibold text-slate-300">Checking Administrator Privileges...</p>
      </div>
    );
  }

  return (
    <AdminPortalProvider initialUser={activeUser}>
      <AdminPortalShell />
    </AdminPortalProvider>
  );
};

export default AdminPortalLayout;
