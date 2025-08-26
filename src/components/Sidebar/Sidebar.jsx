import { useState } from "react";
import { Home, LayoutDashboard, Users, Settings, LogOut, MessageSquare } from 'lucide-react';
import { NavLink, useNavigate } from "react-router-dom";
import './Sidebar.css';
import { useDispatch } from "react-redux";
import { logout } from "../../features/user/userSlice";


const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const sidebarItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { name: 'Contacts', icon: MessageSquare, path: '/contacts' },
    { name: 'Users', icon: Users, path: '/users' },
    { name: 'Settings', icon: Settings, path: '/settings' },
  ];

  return (
    <aside
      className={`sidebar ${isSidebarOpen ? 'sidebar-open' : ''}`}
      onMouseEnter={() => setIsSidebarOpen(true)}
      onMouseLeave={() => setIsSidebarOpen(false)}
    >
      <div className="sidebar-logo-container">
        <img
          src="/profile.jpg"
          alt="Company Logo"
          className="sidebar-logo"
        />
        {isSidebarOpen && (
          <span className="sidebar-logo-text">Admin Panel</span>
        )}
      </div>

      <div className="sidebar-divider"></div>

      <nav className="sidebar-nav">
        <ul className="sidebar-list">
          {sidebarItems.map((item) => (
            <li key={item.name} className="sidebar-item">
              <NavLink to={item.path}
                className="sidebar-link"
              >
                <item.icon className="sidebar-icon" />
                {isSidebarOpen && (
                  <span className="sidebar-text">
                    {item.name}
                  </span>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="sidebar-divider"></div>
      <div className="sidebar-link logout-link" onClick={() => {dispatch(logout()); navigate('/');} }>
        <LogOut className="sidebar-icon" />
        {isSidebarOpen && (
          <span className="sidebar-text">Logout</span>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;