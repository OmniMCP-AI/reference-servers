import React, { useState } from "react";
import {
  FiSearch,
  FiStar,
  FiChevronLeft,
  FiChevronRight,
  FiMoreVertical,
  FiTrash2,
  FiMail,
  FiAlertCircle,
  FiEdit,
  FiSend,
} from "react-icons/fi";

interface EmailMessage {
  id: number;
  sender: string;
  subject: string;
  time: string;
  label: "primary" | "work" | "social" | "friends" | null;
  isStarred: boolean;
  isChecked: boolean;
}

const InboxPage: React.FC = () => {
  const [messages, setMessages] = useState<EmailMessage[]>([
    {
      id: 1,
      sender: "Jullu Jalal",
      subject: "Our Bachelor of Commerce program is ACBSP-accredited.",
      time: "8:38 AM",
      label: "primary",
      isStarred: false,
      isChecked: false,
    },
    {
      id: 2,
      sender: "Minerva Barnett",
      subject: "Get Best Advertiser In Your Side Pocket",
      time: "8:13 AM",
      label: "work",
      isStarred: false,
      isChecked: false,
    },
    {
      id: 3,
      sender: "Willie Blake",
      subject: "Our Bachelor of Commerce program is ACBSP-accredited.",
      time: "8:38 AM",
      label: "primary",
      isStarred: false,
      isChecked: false,
    },
    {
      id: 4,
      sender: "Minerva Barnett",
      subject: "Get Best Advertiser In Your Side Pocket",
      time: "8:13 AM",
      label: "work",
      isStarred: false,
      isChecked: false,
    },
    {
      id: 5,
      sender: "Peter Lewis",
      subject: "Vacation Home Rental Success",
      time: "7:52 PM",
      label: "friends",
      isStarred: false,
      isChecked: false,
    },
    {
      id: 6,
      sender: "Lora Houston",
      subject: "Vacation Home Rental Success",
      time: "7:52 PM",
      label: "friends",
      isStarred: false,
      isChecked: false,
    },
    {
      id: 7,
      sender: "Clifford Morgan",
      subject: "Enhance Your Brand Potential With Giant Advertising Blimps",
      time: "4:13 PM",
      label: "social",
      isStarred: false,
      isChecked: false,
    },
    {
      id: 8,
      sender: "Olga Hogan",
      subject: "Enhance Your Brand Potential With Giant Advertising Blimps",
      time: "4:13 PM",
      label: "social",
      isStarred: false,
      isChecked: false,
    },
    {
      id: 9,
      sender: "Cecilia Webster",
      subject: "Always Look On The Bright Side Of Life",
      time: "3:52 PM",
      label: "friends",
      isStarred: false,
      isChecked: false,
    },
    {
      id: 10,
      sender: "Anthony Briggs",
      subject: "Free Classifieds Using Them To Promote Your Stuff Online",
      time: "7:52 PM",
      label: null,
      isStarred: true,
      isChecked: false,
    },
    {
      id: 11,
      sender: "Fanny Weaver",
      subject: "Free Classifieds Using Them To Promote Your Stuff Online",
      time: "7:52 PM",
      label: null,
      isStarred: true,
      isChecked: false,
    },
    {
      id: 12,
      sender: "Harvey Manning",
      subject: "Curling Irons Are As Individual As The Women Who Use Them",
      time: "2:30 PM",
      label: null,
      isStarred: true,
      isChecked: false,
    },
  ]);

  const toggleStar = (id: number) => {
    setMessages(
      messages.map((message) =>
        message.id === id
          ? { ...message, isStarred: !message.isStarred }
          : message
      )
    );
  };

  const toggleCheck = (id: number) => {
    setMessages(
      messages.map((message) =>
        message.id === id
          ? { ...message, isChecked: !message.isChecked }
          : message
      )
    );
  };

  // Get label name and color based on label type
  const getLabelInfo = (label: string | null) => {
    switch (label) {
      case "primary":
        return {
          name: "Primary",
          className:
            "bg-[rgba(0,182,155,0.2)] text-[#00b69b] rounded px-1.5 py-0.5 text-xs font-semibold",
        };
      case "work":
        return {
          name: "Work",
          className:
            "bg-[rgba(253,154,86,0.2)] text-[#fd9a56] rounded px-1.5 py-0.5 text-xs font-semibold",
        };
      case "social":
        return {
          name: "Social",
          className:
            "bg-[rgba(90,140,255,0.2)] text-[#5a8cff] rounded px-1.5 py-0.5 text-xs font-semibold",
        };
      case "friends":
        return {
          name: "Friends",
          className:
            "bg-[rgba(212,86,253,0.2)] text-[#d456fd] rounded px-1.5 py-0.5 text-xs font-semibold",
        };
      default:
        return { name: "", className: "" };
    }
  };

  return (
    <div className="p-6 bg-[#F5F6FA] min-h-screen">
      <h1 className="text-3xl font-bold text-[#202224] mb-6">Inbox</h1>

      <div className="flex gap-6">
        {/* Left Sidebar */}
        <div className="w-[260px] bg-white rounded-[14px] border border-[#B9B9B9]/30 p-4">
          {/* Compose Button */}
          <button className="w-full bg-[#4880FF] text-white font-bold py-3 px-4 rounded-lg mb-6 shadow-[0_0_0_0_rgba(72,128,255,0.4)] animate-pulse">
            + Compose
          </button>

          {/* My Email Section */}
          <div className="mb-6">
            <h2 className="text-[16px] font-bold mb-4">My Email</h2>

            <div className="space-y-4">
              {/* Inbox */}
              <div className="flex items-center p-2 rounded bg-[rgba(72,128,255,0.1)]">
                <FiMail className="text-[#4880FF] mr-3" />
                <span className="font-bold text-[#4880FF]">Inbox</span>
                <span className="ml-auto text-[#4880FF] text-sm opacity-80">
                  1253
                </span>
              </div>

              {/* Starred */}
              <div className="flex items-center p-2 rounded hover:bg-[rgba(72,128,255,0.05)] transition-colors cursor-pointer">
                <FiStar className="text-gray-700 mr-3" />
                <span className="font-semibold">Starred</span>
                <span className="ml-auto text-gray-500 text-sm">2</span>
              </div>

              {/* Sent */}
              <div className="flex items-center p-2 rounded hover:bg-[rgba(72,128,255,0.05)] transition-colors cursor-pointer">
                <FiSend className="text-gray-700 mr-3" />
                <span className="font-semibold">Sent</span>
                <span className="ml-auto text-gray-500 text-sm">24,532</span>
              </div>

              {/* Draft */}
              <div className="flex items-center p-2 rounded hover:bg-[rgba(72,128,255,0.05)] transition-colors cursor-pointer">
                <FiEdit className="text-gray-700 mr-3" />
                <span className="font-semibold">Draft</span>
                <span className="ml-auto text-gray-500 text-sm">09</span>
              </div>

              {/* Spam */}
              <div className="flex items-center p-2 rounded hover:bg-[rgba(72,128,255,0.05)] transition-colors cursor-pointer">
                <FiAlertCircle className="text-gray-700 mr-3" />
                <span className="font-semibold">Spam</span>
                <span className="ml-auto text-gray-500 text-sm">14</span>
              </div>

              {/* Bin */}
              <div className="flex items-center p-2 rounded hover:bg-[rgba(72,128,255,0.05)] transition-colors cursor-pointer">
                <FiTrash2 className="text-gray-700 mr-3" />
                <span className="font-semibold">Bin</span>
                <span className="ml-auto text-gray-500 text-sm">9</span>
              </div>
            </div>
          </div>

          {/* Labels Section */}
          <div className="mb-6">
            <h2 className="text-[16px] font-bold mb-4">Labels</h2>

            <div className="space-y-3">
              {/* Primary Label */}
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 border-2 border-[#00b69b] rounded"></div>
                <span className="font-semibold">Primary</span>
              </div>

              {/* Work Label */}
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 border-2 border-[#fd9a56] rounded"></div>
                <span className="font-semibold">Work</span>
              </div>

              {/* Social Label */}
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 border-2 border-blue-500 rounded"></div>
                <span className="font-semibold">Social</span>
              </div>

              {/* Friends Label */}
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 border-2 border-purple-500 rounded"></div>
                <span className="font-semibold">Friends</span>
              </div>
            </div>
          </div>

          {/* Create New Label */}
          <div className="flex items-center justify-between text-gray-500 mt-6 cursor-pointer transition-all hover:text-[#4880FF]">
            <span className="font-semibold">Create New Label</span>
            <span className="text-xl transition-transform duration-300 hover:rotate-90">
              +
            </span>
          </div>
        </div>

        {/* Right Side - Email List */}
        <div className="flex-1 bg-white rounded-[14px] border border-[#B9B9B9]/30 overflow-hidden">
          {/* Search Bar */}
          <div className="p-4 border-b border-gray-200">
            <div className="relative">
              <input
                type="text"
                placeholder="Search mail"
                className="w-full h-10 pl-10 pr-4 bg-[#F5F6FA] border border-[#D5D5D5] rounded-full text-sm outline-none transition-all focus:bg-white focus:border-[#4880ff] focus:shadow-[0_0_0_3px_rgba(72,128,255,0.1)]"
              />
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            </div>
          </div>

          {/* Email List */}
          <div className="divide-y divide-gray-200">
            {messages.map((message) => (
              <div
                key={message.id}
                className="hover:bg-[rgba(72,128,255,0.05)] transition-colors"
              >
                <div className="flex items-center p-4">
                  {/* Checkbox */}
                  <div className="mr-3">
                    <div
                      className={`w-4 h-4 border border-gray-400 rounded cursor-pointer transition-all ${
                        message.isChecked
                          ? "bg-[#4880ff] border-[#4880ff] relative after:content-[''] after:absolute after:left-1.5 after:top-0.5 after:w-1 after:h-2 after:border-r-2 after:border-b-2 after:border-white after:rotate-45"
                          : "hover:border-[#4880ff] hover:bg-[rgba(72,128,255,0.1)]"
                      }`}
                      onClick={() => toggleCheck(message.id)}
                    />
                  </div>

                  {/* Star */}
                  <button
                    onClick={() => toggleStar(message.id)}
                    className="mr-3"
                  >
                    <FiStar
                      className={`transition-all transform hover:scale-110 ${
                        message.isStarred
                          ? "text-[#ffd56d] fill-[#ffd56d]"
                          : "text-gray-400"
                      }`}
                    />
                  </button>

                  {/* Message Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-bold text-sm truncate">
                        {message.sender}
                      </h3>
                      <div className="flex items-center gap-2">
                        {message.label && (
                          <span
                            className={getLabelInfo(message.label).className}
                          >
                            {getLabelInfo(message.label).name}
                          </span>
                        )}
                        <span className="text-xs text-gray-500">
                          {message.time}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-800 opacity-90 truncate">
                      {message.subject}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination/Actions Bar */}
          <div className="flex justify-between items-center p-4 border-t border-gray-200">
            <div className="text-sm text-gray-500">Showing 1-12 of 1,253</div>
            <div className="flex items-center gap-2">
              {/* Quick Actions */}
              <div className="flex items-center bg-[#FAFBFD] border border-[#D5D5D5] rounded-xl px-2 py-1 mr-4">
                <button className="p-2 text-gray-600">
                  <FiTrash2 />
                </button>
                <div className="h-5 w-px bg-gray-300 mx-1"></div>
                <button className="p-2 text-gray-600">
                  <FiMoreVertical />
                </button>
              </div>

              {/* Pagination */}
              <div className="flex items-center bg-[#FAFBFD] border border-[#D5D5D5] rounded-lg">
                <button className="px-3 py-2 text-gray-600 hover:text-[#4880ff] transition-colors">
                  <FiChevronLeft />
                </button>
                <div className="h-5 w-px bg-gray-300 opacity-70"></div>
                <button className="px-3 py-2 text-gray-600 hover:text-[#4880ff] transition-colors">
                  <FiChevronRight />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InboxPage;
