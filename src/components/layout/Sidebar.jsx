import React, { createContext } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  LayoutDashboard,
  Sparkles,
  Target,
  Briefcase,
  FileText,
  User,
  PlusCircle,
  Users,
  Building2,
  X,
  HelpCircle,
} from 'lucide-react';
import { selectCurrentUser } from '../../store/slices/authSlice';

const SidebarContext = createContext(null);

export const Sidebar = ({ isOpen, onClose, children, className = '' }) => {
  return (
    <SidebarContext.Provider value={{ isOpen, onClose }}>
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      <aside
        className={`fixed lg:static top-0 bottom-0 left-0 z-50 w-60 bg-white border-r border-slate-200 flex flex-col justify-between transition-transform duration-200 ease-in-out shrink-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } ${className}`}
      >
        {children}
      </aside>
    </SidebarContext.Provider>
  );
};

const Header = ({ title = 'Navigation', onClose }) => {
  return (
    <div className="h-14 px-4 flex items-center justify-between border-b border-slate-100">
      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
        {title}
      </span>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="lg:hidden p-1 text-slate-400 hover:text-slate-700 rounded-md cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

const Nav = ({ children }) => {
  return <nav className="p-3 space-y-1 overflow-y-auto flex-1">{children}</nav>;
};

const Item = ({ to, icon: Icon, label, badge }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all ${
          isActive
            ? 'bg-blue-600 text-white shadow-sm shadow-blue-600/30'
            : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
        }`
      }
    >
      <div className="flex items-center gap-2.5">
        {Icon && <Icon className="w-4 h-4 shrink-0" />}
        <span>{label}</span>
      </div>
      {badge && (
        <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-blue-100 text-blue-700 font-semibold">
          {badge}
        </span>
      )}
    </NavLink>
  );
};

const RoleNav = () => {
  const user = useSelector(selectCurrentUser);
  const isEmployer = user?.role === 'employer';

  if (isEmployer) {
    return (
      <>
        <Item to="/employer/dashboard" icon={LayoutDashboard} label="Dashboard" />
        <Item to="/employer/post-job" icon={PlusCircle} label="Post New Job" />
        <Item to="/employer/jobs" icon={Briefcase} label="Manage Jobs" />
        <Item to="/employer/candidates" icon={Users} label="Ranked Candidates" badge="AI" />
        <Item to="/employer/profile" icon={Building2} label="Company Profile" />
      </>
    );
  }

  return (
    <>
      <Item to="/dashboard" icon={LayoutDashboard} label="Dashboard" />
      <Item to="/matches" icon={Sparkles} label="Role Matching" badge="AI" />
      <Item to="/skills-gap" icon={Target} label="Skill Gap Analysis" />
      <Item to="/jobs" icon={Briefcase} label="Browse Jobs" />
      <Item to="/applications" icon={FileText} label="My Applications" />
      <Item to="/support" icon={HelpCircle} label="Support Desk" />
      <Item to="/profile" icon={User} label="My Profile" />
    </>
  );
};

const Footer = ({ children }) => {
  return (
    <div className="p-3 border-t border-slate-100 bg-slate-50/50">
      {children}
    </div>
  );
};

Sidebar.Header = Header;
Sidebar.Nav = Nav;
Sidebar.Item = Item;
Sidebar.RoleNav = RoleNav;
Sidebar.Footer = Footer;

export default Sidebar;
