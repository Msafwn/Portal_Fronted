import React, { createContext, useContext, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  Bell,
  Search,
  LogOut,
  User,
  ChevronDown,
  Menu,
  LayoutDashboard,
} from 'lucide-react';
import {
  selectCurrentUser,
  logOut,
} from '../../store/slices/authSlice';
import { useLogoutUserMutation } from '../../store/api/authApiSlice';

const NavbarContext = createContext(null);

export const Navbar = ({ children, onToggleSidebar, className = '' }) => {
  return (
    <NavbarContext.Provider value={{ onToggleSidebar }}>
      <header className={`h-14 bg-white border-b border-slate-200 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30 ${className}`}>
        {children}
      </header>
    </NavbarContext.Provider>
  );
};

const Brand = ({ title = 'Smart Career AI', subtitle = 'Portal' }) => {
  const { onToggleSidebar } = useContext(NavbarContext);

  return (
    <div className="flex items-center gap-3">
      {onToggleSidebar && (
        <button
          type="button"
          onClick={onToggleSidebar}
          className="lg:hidden p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
        >
          <Menu className="w-5 h-5" />
        </button>
      )}
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center shadow-sm shadow-blue-600/30">
          <Sparkles className="w-4 h-4" />
        </div>
        <div>
          <h1 className="text-xs font-bold text-slate-900 leading-tight">
            {title}
          </h1>
          <p className="text-[10px] text-blue-600 font-medium leading-none">
            {subtitle}
          </p>
        </div>
      </div>
    </div>
  );
};

const SearchBar = ({ placeholder = 'Search jobs, roles, skills...', value, onChange }) => {
  return (
    <div className="hidden md:flex items-center relative w-72 lg:w-96">
      <Search className="w-3.5 h-3.5 absolute left-3 text-slate-400 pointer-events-none" />
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all"
      />
    </div>
  );
};

const Actions = ({ children }) => {
  return <div className="flex items-center gap-2">{children}</div>;
};

const NotificationBtn = ({ count = 0, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="relative p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
    >
      <Bell className="w-4 h-4" />
      {count > 0 && (
        <span className="absolute top-1 right-1 w-2 h-2 bg-blue-600 rounded-full ring-2 ring-white" />
      )}
    </button>
  );
};

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApi] = useLogoutUserMutation();

  const handleLogout = async () => {
    try {
      await logoutApi().unwrap();
    } catch {
    } finally {
      dispatch(logOut());
      navigate('/login');
    }
  };

  const roleLabel = user?.role?.replace('_', ' ') || 'User';

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
      >
        <div className="w-7 h-7 rounded-lg bg-blue-50 border border-blue-200 text-blue-700 flex items-center justify-center font-bold text-xs">
          {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
        </div>
        <div className="text-left hidden sm:block">
          <p className="text-xs font-semibold text-slate-800 leading-tight">
            {user?.name || 'My Profile'}
          </p>
          <span className="text-[10px] text-blue-600 capitalize font-medium">
            {roleLabel}
          </span>
        </div>
        <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1 w-48 bg-white border border-slate-200 rounded-xl shadow-lg shadow-slate-200/50 py-1 z-50 animate-in fade-in slide-in-from-top-1">
          <div className="px-3 py-2 border-b border-slate-100">
            <p className="text-xs font-semibold text-slate-900 truncate">
              {user?.name}
            </p>
            <p className="text-[10px] text-slate-500 truncate">{user?.email}</p>
          </div>

          {user?.role === 'employer' && (
            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                navigate('/employer/dashboard');
              }}
              className="w-full text-left px-3 py-1.5 text-xs text-blue-700 hover:bg-blue-50 font-semibold flex items-center gap-2 transition-colors cursor-pointer"
            >
              <LayoutDashboard className="w-3.5 h-3.5 text-blue-600" />
              <span>Employer Dashboard</span>
            </button>
          )}

          {user?.role === 'admin' || user?.role === 'super_admin' ? (
            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                navigate('/admin/dashboard');
              }}
              className="w-full text-left px-3 py-1.5 text-xs text-purple-700 hover:bg-purple-50 font-semibold flex items-center gap-2 transition-colors cursor-pointer"
            >
              <LayoutDashboard className="w-3.5 h-3.5 text-purple-600" />
              <span>Admin Dashboard</span>
            </button>
          ) : null}

          <button
            type="button"
            onClick={() => {
              setIsOpen(false);
              navigate(user?.role === 'employer' ? '/employer/company' : '/profile');
            }}
            className="w-full text-left px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2 transition-colors cursor-pointer"
          >
            <User className="w-3.5 h-3.5 text-slate-400" />
            <span>Profile Settings</span>
          </button>

          <button
            type="button"
            onClick={handleLogout}
            className="w-full text-left px-3 py-1.5 text-xs text-rose-600 hover:bg-rose-50 flex items-center gap-2 transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5 text-rose-400" />
            <span>Sign Out</span>
          </button>
        </div>
      )}
    </div>
  );
};

Navbar.Brand = Brand;
Navbar.SearchBar = SearchBar;
Navbar.Actions = Actions;
Navbar.NotificationBtn = NotificationBtn;
Navbar.UserMenu = UserMenu;

export default Navbar;
