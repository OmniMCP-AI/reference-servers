import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  FiHome,
  FiBox,
  FiInbox,
  FiList,
  FiDollarSign,
  FiCalendar,
  FiCheckSquare,
  FiUsers,
  FiFileText,
  FiGrid,
  FiLayout,
  FiSettings,
  FiLogOut,
  FiStar,
  FiDatabase,
  FiPhone,
} from "react-icons/fi";
import { NavSection } from "../../types";

interface SidebarProps {
  logoText1: string;
  logoText2: string;
  activePath?: string;
  onNavigate?: (path: string, isLogout?: boolean) => void;
  onLogout?: () => void;
  isExpanded?: boolean;
}

/**
 * Sidebar Component
 *
 * Main navigation sidebar with categorized navigation links
 *
 * @param {string} logoText1 - Text to display in the logo area
 * @param {string} logoText2 - Text to display in the logo area
 * @param {string} activePath - Optional currently active path to highlight
 * @param {function} onNavigate - Optional callback when navigation item is clicked
 * @param {function} onLogout - Optional callback to handle logout
 * @param {boolean} isExpanded - Whether the sidebar is expanded or collapsed
 */
const Sidebar: React.FC<SidebarProps> = ({
  logoText1,
  logoText2,
  activePath,
  onNavigate,
  onLogout,
  isExpanded = true,
}) => {
  const location = useLocation();
  const currentPath = activePath || location.pathname;

  // Navigation data structure
  const navSections: NavSection[] = [
    {
      items: [
        {
          name: "Dashboard",
          path: "/dashboard",
          isActive: currentPath === "/dashboard",
        },
        {
          name: "Products",
          path: "/products",
          isActive: currentPath === "/products",
        },
        {
          name: "Favorites",
          path: "/favorites",
          isActive: currentPath === "/favorites",
        },
        { name: "Inbox", path: "/inbox", isActive: currentPath === "/inbox" },
        {
          name: "Order Lists",
          path: "/order-lists",
          isActive: currentPath === "/order-lists",
        },
        {
          name: "Product Stock",
          path: "/product-stock",
          isActive: currentPath === "/product-stock",
        },
      ],
    },
    {
      items: [
        {
          name: "Pricing",
          path: "/pricing",
          isActive: currentPath === "/pricing",
        },
        {
          name: "Calendar",
          path: "/calendar",
          isActive: currentPath === "/calendar",
        },
        { name: "To-Do", path: "/todo", isActive: currentPath === "/todo" },
        {
          name: "Contact",
          path: "/contact",
          isActive: currentPath === "/contact",
        },
        {
          name: "Invoice",
          path: "/invoice",
          isActive: currentPath === "/invoice",
        },
        {
          name: "UI Elements",
          path: "/ui-elements",
          isActive: currentPath === "/ui-elements",
        },
        { name: "Team", path: "/team", isActive: currentPath === "/team" },
        { name: "Table", path: "/table", isActive: currentPath === "/table" },
      ],
    },
    {
      items: [
        {
          name: "Settings",
          path: "/settings",
          isActive: currentPath === "/settings",
        },
        { name: "Logout", path: "/logout", isActive: false },
      ],
    },
  ];

  // Map icon component based on navigation item name
  const getIconForNav = (name: string) => {
    switch (name.toLowerCase()) {
      case "dashboard":
        return <FiHome />;
      case "products":
        return <FiBox />;
      case "favorites":
        return <FiStar />;
      case "inbox":
        return <FiInbox />;
      case "order lists":
        return <FiList />;
      case "product stock":
        return <FiDatabase />;
      case "calendar":
        return <FiCalendar />;
      case "pricing":
        return <FiDollarSign />;
      case "to-do":
        return <FiCheckSquare />;
      case "contact":
        return <FiPhone />;
      case "invoice":
        return <FiFileText />;
      case "ui elements":
        return <FiGrid />;
      case "team":
        return <FiUsers />;
      case "table":
        return <FiLayout />;
      case "settings":
        return <FiSettings />;
      case "logout":
        return <FiLogOut />;
      default:
        return <FiBox />;
    }
  };

  // Handle navigation item click
  const handleNavClick = (path: string) => {
    // Special case for logout
    if (path === "/logout") {
      if (onLogout) {
        onLogout();
      } else if (onNavigate) {
        onNavigate(path, true);
      }
      return;
    }

    // Regular navigation
    if (onNavigate) {
      onNavigate(path);
    }
  };

  // Use a transition for smooth width change
  const sidebarWidth = isExpanded ? "w-[260px]" : "w-[70px]";

  return (
    <aside
      className={`${sidebarWidth} bg-white border-r border-divider-color p-0 flex flex-col h-screen fixed left-0 top-0 z-10 overflow-y-auto transition-all duration-300 ease-in-out`}
    >
      {/* Logo */}
      <div
        className={`text-primary text-center text-xl font-extrabold py-[30px] ${
          isExpanded ? "px-[25px]" : "px-[10px]"
        } mb-[10px] tracking-[-0.2px]`}
      >
        {isExpanded ? (
          <>
            <span className="text-primary">{logoText1}</span>
            <span className="text-secondary">{logoText2}</span>
          </>
        ) : (
          <span className="text-primary">{logoText1.charAt(0)}</span>
        )}
      </div>

      <nav>
        {navSections.map((section, sectionIndex) => (
          <React.Fragment key={sectionIndex}>
            {/* Add section title if exists */}
            {sectionIndex === 1 && isExpanded && (
              <p className="py-[10px] px-[25px] text-xs font-bold tracking-[0.26px] text-secondary/60 mb-[5px] uppercase">
                PAGES
              </p>
            )}

            {/* Navigation Items */}
            <ul className="list-none mb-[5px]">
              {section.items.map((item, itemIndex) => (
                <li key={itemIndex}>
                  {item.path === "/logout" ? (
                    <button
                      className={`flex items-center w-full py-3 ${
                        isExpanded
                          ? "px-[25px] justify-start"
                          : "px-[10px] justify-center"
                      } text-primary-text text-sm font-semibold tracking-[0.3px] relative transition-colors hover:bg-gray-100`}
                      onClick={() => handleNavClick(item.path)}
                      title={!isExpanded ? item.name : undefined}
                    >
                      <i
                        className={`${
                          isExpanded ? "mr-[10px]" : ""
                        } text-base flex items-center justify-center opacity-80 w-5`}
                      >
                        {getIconForNav(item.name)}
                      </i>
                      {isExpanded && <span>{item.name}</span>}
                    </button>
                  ) : (
                    <NavLink
                      to={item.path}
                      className={({ isActive }: { isActive: boolean }) =>
                        `flex items-center py-3 ${
                          isExpanded
                            ? "px-[25px] justify-start"
                            : "px-[10px] justify-center"
                        } text-primary-text text-sm font-semibold tracking-[0.3px] relative transition-colors ${
                          isActive
                            ? "bg-primary text-white relative before:content-[''] before:absolute before:top-0 before:left-0 before:w-1 before:h-full before:bg-primary"
                            : "hover:bg-gray-100"
                        }`
                      }
                      onClick={() => handleNavClick(item.path)}
                      title={!isExpanded ? item.name : undefined}
                    >
                      <i
                        className={`${
                          isExpanded ? "mr-[10px]" : ""
                        } text-base flex items-center justify-center opacity-80 w-5`}
                      >
                        {getIconForNav(item.name)}
                      </i>
                      {isExpanded && <span>{item.name}</span>}
                    </NavLink>
                  )}
                </li>
              ))}
            </ul>

            {/* Add divider between sections */}
            {sectionIndex < navSections.length - 1 && (
              <div className="h-[1px] bg-divider-color my-[15px] w-full"></div>
            )}
          </React.Fragment>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
