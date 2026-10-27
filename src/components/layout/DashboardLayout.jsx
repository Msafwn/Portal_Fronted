import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';

export const DashboardLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)}>
        <Sidebar.Header
          title="Career Navigation"
          onClose={() => setIsSidebarOpen(false)}
        />
        <Sidebar.Nav>
          <Sidebar.RoleNav />
        </Sidebar.Nav>
        <Sidebar.Footer>
          <div className="p-2 rounded-lg bg-blue-50/80 border border-blue-200/60 text-[11px] text-blue-800">
            <span className="font-semibold block">AI Matching Active</span>
            <span className="text-[10px] text-blue-600">Dual-cookie authenticated</span>
          </div>
        </Sidebar.Footer>
      </Sidebar>

      <div className="flex-1 flex flex-col min-w-0">
        <Navbar onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}>
          <Navbar.Brand />
          <Navbar.SearchBar />
          <Navbar.Actions>
            <Navbar.NotificationBtn />
            <Navbar.UserMenu />
          </Navbar.Actions>
        </Navbar>

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children || <Outlet />}
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default DashboardLayout;
