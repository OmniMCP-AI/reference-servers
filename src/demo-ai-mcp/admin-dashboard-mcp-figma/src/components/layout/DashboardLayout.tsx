import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { useAuth } from "../../contexts/AuthContext";

/**
 * DashboardLayout provides the main layout structure for all authenticated pages
 * It includes the Sidebar, Navbar and main content area
 */
const DashboardLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

  // Toggle sidebar expanded/collapsed state
  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  // Handle logout
  const handleLogout = () => {
    logout();
  };

  // Get user's name or default
  const userName = user?.name || "User";
  const userAvatar = user?.avatar || "";

  // Calculate main content margin based on sidebar width
  const mainContentMargin = isSidebarExpanded ? "ml-[260px]" : "ml-[70px]";

  return (
    <div className="flex h-screen bg-[#f5f6fa]">
      {/* Sidebar */}
      <Sidebar
        logoText1="Dash"
        logoText2="Stack"
        onLogout={handleLogout}
        isExpanded={isSidebarExpanded}
      />

      <div
        className={`flex-1 flex flex-col overflow-hidden ${mainContentMargin} transition-all duration-300 ease-in-out`}
      >
        {/* Navbar */}
        <Navbar
          userName={userName}
          userAvatar={userAvatar}
          onLogout={handleLogout}
          toggleSidebar={toggleSidebar}
        />

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
