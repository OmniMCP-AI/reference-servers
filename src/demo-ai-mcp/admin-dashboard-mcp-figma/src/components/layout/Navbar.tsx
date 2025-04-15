import React, { useState, useRef, useEffect } from "react";
import {
  FiBell,
  FiSearch,
  FiChevronDown,
  FiMenu,
  FiLogOut,
  FiUser,
  FiSettings,
  FiActivity,
  FiKey,
  FiCheck,
} from "react-icons/fi";
import englishIcon from "../../assets/icons/english-flag.svg";
import frenchIcon from "../../assets/icons/french-flag.svg";
import spanishIcon from "../../assets/icons/spanish-flag.svg";
import defaultAvatar from "../../assets/images/people/profile-pic.png";

interface NavbarProps {
  userName?: string;
  userAvatar?: string;
  onLogout?: () => void;
  toggleSidebar?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({
  userName = "Moni Roy",
  userAvatar = defaultAvatar,
  onLogout,
  toggleSidebar = () => {},
}) => {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  // Refs for dropdown menus
  const userMenuRef = useRef<HTMLDivElement>(null);
  const langMenuRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);

  // Mock data - in a real app, these would be dynamic
  const notifications = 6;
  const userRole = "Admin";

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setUserMenuOpen(false);
      }
      if (
        langMenuRef.current &&
        !langMenuRef.current.contains(event.target as Node)
      ) {
        setLangMenuOpen(false);
      }
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(event.target as Node)
      ) {
        setNotificationsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleUserMenu = () => {
    setUserMenuOpen(!userMenuOpen);
    setLangMenuOpen(false);
    setNotificationsOpen(false);
  };

  const toggleLangMenu = () => {
    setLangMenuOpen(!langMenuOpen);
    setUserMenuOpen(false);
    setNotificationsOpen(false);
  };

  const toggleNotifications = () => {
    setNotificationsOpen(!notificationsOpen);
    setUserMenuOpen(false);
    setLangMenuOpen(false);
  };

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
  };

  return (
    <div className="h-16 flex items-center justify-between px-8 py-4 border-b border-divider-color bg-white shadow-sm z-10">
      {/* Left area - Search */}
      <div className="flex items-center">
        <button
          onClick={toggleSidebar}
          className="text-xl text-gray-600 mr-4 cursor-pointer p-1 rounded hover:bg-gray-100 transition-colors"
        >
          <FiMenu className="w-5 h-5" />
        </button>
        <div className="relative w-[280px] md:w-[420px]">
          <input
            type="text"
            className="w-full h-10 pl-10 pr-4 rounded-[19px] bg-[#F5F6FA] text-sm text-primary-text outline-none focus:ring-1 focus:ring-primary focus:bg-white transition-all border border-[#D5D5D5]"
            placeholder="Search"
          />
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary/70" />
        </div>
      </div>

      {/* Right area - User info and notifications */}
      <div className="flex items-center space-x-6">
        {/* Notification icon */}
        <div className="relative" ref={notificationsRef}>
          <button
            onClick={toggleNotifications}
            className="w-9 h-9 rounded-full flex items-center justify-center bg-[#F93C65]/10 hover:bg-[#F93C65]/20 transition-colors"
          >
            <FiBell className="text-xl text-[#202224]" />
          </button>
          {notifications > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center bg-[#F93C65] text-white text-xs font-bold rounded-full">
              {notifications > 9 ? "9+" : notifications}
            </span>
          )}

          {/* Notification dropdown */}
          {notificationsOpen && (
            <div className="absolute right-0 mt-3 w-[300px] bg-white rounded-[14px] shadow-[0px_9px_40px_0px_rgba(0,0,0,0.06)] py-4 z-[100]">
              <h3 className="text-[15px] font-semibold text-[#404040] px-4 pb-4">
                Notification
              </h3>
              <div className="border-t border-[#979797]/25">
                <div className="flex items-center p-4 hover:bg-gray-50 cursor-pointer">
                  <div className="rounded-full w-8 h-8 bg-gradient-to-b from-[#4E96FF] to-[#80C9FC] flex items-center justify-center text-white mr-3">
                    <FiSettings size={14} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#202224]">
                      Settings
                    </p>
                    <p className="text-xs text-[#B5B5B5]">Update Dashboard</p>
                  </div>
                </div>
                <div className="flex items-center p-4 hover:bg-gray-50 cursor-pointer">
                  <div className="rounded-full w-8 h-8 bg-gradient-to-b from-[#F97FD9] to-[#FFC1E6] flex items-center justify-center text-white mr-3">
                    <FiActivity size={14} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#202224]">
                      Event Update
                    </p>
                    <p className="text-xs text-[#B5B5B5]">
                      An event date update again
                    </p>
                  </div>
                </div>
                <div className="flex items-center p-4 hover:bg-gray-50 cursor-pointer">
                  <div className="rounded-full w-8 h-8 bg-gradient-to-b from-[#9E8FFF] to-[#EBCBFF] flex items-center justify-center text-white mr-3">
                    <FiUser size={14} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#202224]">
                      Profile
                    </p>
                    <p className="text-xs text-[#B5B5B5]">
                      Update your profile
                    </p>
                  </div>
                </div>
                <div className="flex items-center p-4 hover:bg-gray-50 cursor-pointer">
                  <div className="rounded-full w-8 h-8 bg-gradient-to-b from-[#FF8F8F] to-[#FFC1C1] flex items-center justify-center text-white mr-3">
                    <FiBell size={14} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#202224]">
                      Application Error
                    </p>
                    <p className="text-xs text-[#B5B5B5]">
                      Check Your runnung application
                    </p>
                  </div>
                </div>
              </div>
              <div className="border-t border-[#979797]/25 mt-2 pt-2 px-4 flex justify-center">
                <button className="text-[13px] text-[#A8A8A8] hover:text-[#4880FF]">
                  See all notification
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Language Selector */}
        <div
          className="hidden md:flex items-center gap-2 cursor-pointer text-[#646464] text-sm font-semibold"
          onClick={toggleLangMenu}
          ref={langMenuRef}
        >
          <div className="w-5 h-5 overflow-hidden rounded-[5px] border border-[#D8D8D8]/50">
            <img
              src={englishIcon}
              alt="english"
              className="w-full h-full object-cover"
            />
          </div>
          <span>English</span>
          <FiChevronDown className="text-[#646464] text-sm" />

          {/* Language dropdown */}
          {langMenuOpen && (
            <div className="absolute right-100 top-16 w-[200px] bg-white rounded-[14px] shadow-[0px_9px_40px_0px_rgba(0,0,0,0.1)] py-4 z-[100]">
              <h3 className="text-[15px] font-normal text-[#404040] px-4 pb-4">
                Select Language
              </h3>
              <div className="border-t border-[#979797]/25">
                <div className="flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer">
                  <div className="flex items-center">
                    <div className="w-5 h-5 rounded overflow-hidden border border-[#D8D8D8]/50 mr-3">
                      <img
                        src={englishIcon}
                        alt="English"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-sm font-semibold text-[#404040]">
                      English
                    </span>
                  </div>
                  <FiCheck className="text-[#565656]" />
                </div>
                <div className="flex items-center p-4 hover:bg-gray-50 cursor-pointer">
                  <div className="w-5 h-5 rounded overflow-hidden border border-[#D8D8D8]/50 mr-3">
                    <img
                      src={frenchIcon}
                      alt="French"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-sm font-semibold text-[#404040]">
                    French
                  </span>
                </div>
                <div className="flex items-center p-4 hover:bg-gray-50 cursor-pointer">
                  <div className="w-5 h-5 rounded overflow-hidden border border-[#D8D8D8]/50 mr-3">
                    <img
                      src={spanishIcon}
                      alt="Spanish"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-sm font-semibold text-[#404040]">
                    Spanish
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User info */}
        <div className="relative" ref={userMenuRef}>
          <div
            className="flex items-center cursor-pointer px-2 py-1"
            onClick={toggleUserMenu}
          >
            <div className="w-8 h-8 rounded-full mr-3 overflow-hidden">
              <img
                src={userAvatar}
                alt={userName}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = defaultAvatar;
                }}
              />
            </div>
            <div className="hidden md:block">
              <p className="text-[#404040] font-bold text-sm">{userName}</p>
              <p className="text-[#565656] text-xs">{userRole}</p>
            </div>
            <FiChevronDown className="text-[#5C5C5C] ml-2" />
          </div>

          {/* User dropdown menu */}
          {userMenuOpen && (
            <div className="absolute right-0 mt-3 w-[200px] bg-white rounded-[14px] shadow-[0px_9px_40px_0px_rgba(0,0,0,0.1)] py-2 z-50">
              <div className="py-2 px-4 hover:bg-gray-50 cursor-pointer flex items-center">
                <FiSettings className="text-[#4E96FF] mr-3" />
                <span className="text-sm font-semibold text-[#404040]">
                  Manage Account
                </span>
              </div>
              <div className="border-t border-[#979797]/25 my-1"></div>
              <div className="py-2 px-4 hover:bg-gray-50 cursor-pointer flex items-center">
                <FiKey className="text-[#F97FD9] mr-3" />
                <span className="text-sm font-semibold text-[#404040]">
                  Change Password
                </span>
              </div>
              <div className="border-t border-[#979797]/25 my-1"></div>
              <div className="py-2 px-4 hover:bg-gray-50 cursor-pointer flex items-center">
                <FiActivity className="text-[#9E8FFF] mr-3" />
                <span className="text-sm font-semibold text-[#404040]">
                  Activity Log
                </span>
              </div>
              <div className="border-t border-[#979797]/25 my-1"></div>
              <div
                className="py-2 px-4 hover:bg-gray-50 cursor-pointer flex items-center"
                onClick={handleLogout}
              >
                <FiLogOut className="text-[#FF8F8F] mr-3" />
                <span className="text-sm font-semibold text-[#404040]">
                  Log out
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
