import React, { useState } from "react";
import { FiPlus } from "react-icons/fi";

// Import images - these should match the image paths in your project
import profilePic1 from "../assets/images/people/profilePic1.png";
import profilePic2 from "../assets/images/people/profilePic2.png";
import profilePic3 from "../assets/images/people/profilePic3.png";
import event1 from "../assets/images/event/event1.png";
import event2 from "../assets/images/event/event2.png";
import event3 from "../assets/images/event/event3.png";
import event4 from "../assets/images/event/event3.png";

const Calendar: React.FC = () => {
  // State for current month/year
  const [currentMonth, setCurrentMonth] = useState(9); // 0-indexed, 9 = October
  const [currentYear, setCurrentYear] = useState(2019);

  // Calendar data
  const days = ["MON", "TUE", "WED", "THE", "FRI", "SAT", "SUN"]; // Fixed "THU" to "THE" to match Figma

  // Get dates for calendar grid
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  // Calculate previous month's days to display
  const prevMonthDaysCount = getDaysInMonth(
    currentMonth === 0 ? currentYear - 1 : currentYear,
    currentMonth === 0 ? 11 : currentMonth - 1
  );

  // Get the day of week for the first day (0 = Sunday, 1 = Monday, etc.)
  let firstDay = getFirstDayOfMonth(currentYear, currentMonth);
  // Adjust for Monday as first day of week
  firstDay = firstDay === 0 ? 6 : firstDay - 1;

  // Previous month days to show
  const prevMonthDates = Array.from(
    { length: firstDay },
    (_, i) => prevMonthDaysCount - firstDay + i + 1
  );

  // Current month
  const currentMonthDates = Array.from(
    { length: getDaysInMonth(currentYear, currentMonth) },
    (_, i) => i + 1
  );

  // Next month days to show
  const nextMonthDays = 42 - (prevMonthDates.length + currentMonthDates.length);
  const nextMonthDates = Array.from({ length: nextMonthDays }, (_, i) => i + 1);

  // Function to navigate to previous month
  const goToPrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  // Function to navigate to next month
  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  // Month names for display
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Events data
  const events = [
    {
      id: 1,
      title: "Design Conference",
      date: "Today 07:19 AM",
      location: "56 Davion Mission Suite 157",
      city: "Meaghanberg",
      image: event1,
      attendees: [profilePic1, profilePic2, profilePic3],
      moreAttendees: 15,
    },
    {
      id: 2,
      title: "Weekend Festival",
      date: "16 October 2019 at 5.00 PM",
      location: "853 Moore Flats Suite 158",
      city: "Sweden",
      image: event3,
      attendees: [profilePic3, profilePic1, profilePic2],
      moreAttendees: 20,
    },
    {
      id: 3,
      title: "Glastonbury Festival",
      date: "20-22 October 2019 at 8.00 PM",
      location: "646 Walter Road Apt. 571",
      city: "Turks and Caicos Islands",
      image: event2,
      attendees: [profilePic2, profilePic3, profilePic1],
      moreAttendees: 14,
    },
    {
      id: 4,
      title: "Ultra Europe 2019",
      date: "25 October 2019 at 10.00 PM",
      location: "506 Satterfield Tunnel Apt. 963",
      city: "San Marino",
      image: event4,
      attendees: [profilePic1, profilePic2, profilePic3],
      moreAttendees: 42,
    },
  ];

  // Featured events in the calendar display - updated with Figma colors
  const featuredEvents = [
    {
      id: 1,
      title: "Design Conference",
      color: "#7551E9",
      day: 16,
    },
    {
      id: 2,
      title: "Weekend Festival",
      color: "#E951BF",
      day: 18,
    },
    {
      id: 3,
      title: "Glastonbury Festival",
      color: "#E99151",
      day: 20,
    },
    {
      id: 4,
      title: "Glastonbury Festival",
      color: "#516FE9",
      day: 22,
    },
  ];

  return (
    <div className="bg-[#F5F6FA] min-h-screen">
      <main className="px-4 md:px-8 py-8">
        {/* Header */}
        <h1 className="text-[28px] md:text-[32px] font-bold text-[#202224] tracking-[-0.35px] mb-6">
          Calendar
        </h1>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Side - Events List */}
          <div className="w-full lg:w-1/3">
            <div className="bg-white rounded-[14px] border border-[#B9B9B9]/30 shadow-sm p-4 md:p-6 mb-6">
              <h2 className="text-[18px] font-bold text-[#202224] mb-4">
                You are going to
              </h2>

              {/* Add New Event Button */}
              <button className="w-full bg-[#4880FF] hover:bg-[#4071e6] text-white font-bold py-3 px-4 rounded-lg mb-6 flex items-center justify-center transition-colors duration-200">
                <FiPlus className="mr-2" /> Add New Event
              </button>

              {/* Divider */}
              <div className="border-t border-[#E0E0E0] opacity-50 mb-6"></div>

              {/* Events List */}
              <div className="space-y-6">
                {events.map((event, index) => (
                  <React.Fragment key={event.id}>
                    <div className="flex gap-4">
                      {/* Event Image */}
                      <div className="w-[52px] h-[52px] rounded-full overflow-hidden flex-shrink-0">
                        <img
                          src={event.image}
                          alt={event.title}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Event Details */}
                      <div className="flex-1">
                        <h3 className="font-bold text-[14px] text-[#202224]/90 mb-1">
                          {event.title}
                        </h3>
                        <p className="text-[12px] text-[#202224]/60 leading-[26px]">
                          {event.date}
                        </p>
                        <p className="text-[12px] text-[#202224]/60 leading-[26px]">
                          {event.location}
                        </p>
                        <p className="text-[12px] text-[#202224]/60 leading-[26px]">
                          {event.city}
                        </p>

                        {/* Attendees */}
                        <div className="flex mt-2">
                          {event.attendees.map((pic, i) => (
                            <div
                              key={i}
                              className="w-8 h-8 rounded-full overflow-hidden border-2 border-white -ml-2 first:ml-0"
                            >
                              <img
                                src={pic}
                                alt="Attendee"
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ))}
                          <div className="w-8 h-8 rounded-full bg-[rgba(223,233,255,0.37)] border border-[#4880FF] -ml-2 flex items-center justify-center">
                            <span className="text-[10px] font-bold text-[#4880FF]">
                              {event.moreAttendees}+
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Divider except for last item */}
                    {index < events.length - 1 && (
                      <div className="border-t border-[#E0E0E0] opacity-50"></div>
                    )}
                  </React.Fragment>
                ))}
              </div>

              {/* See More Button */}
              <button className="w-full mt-6 bg-[#E2EAF8]/70 hover:bg-[#E2EAF8] text-[#202224]/90 font-bold py-[14px] px-4 rounded-lg transition-colors duration-200">
                See More
              </button>
            </div>
          </div>

          {/* Right Side - Calendar */}
          <div className="w-full lg:w-2/3">
            <div className="bg-white rounded-[14px] border border-[#B9B9B9]/30 shadow-sm p-4 md:p-6">
              {/* Today indicator */}
              <div className="text-[14px] font-semibold text-[#202224]/60 mb-4">
                Today
              </div>

              {/* Calendar Header */}
              <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
                <div className="flex items-center">
                  <h2 className="text-[20px] md:text-[24px] font-bold mr-6">
                    {monthNames[currentMonth]} {currentYear}
                  </h2>
                  <div className="flex gap-4">
                    <button
                      className="p-1 transition-colors hover:bg-gray-100 rounded-full"
                      onClick={goToPrevMonth}
                    >
                      {/* Previous arrow button */}
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M15 18L9 12L15 6"
                          stroke="#565656"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                    <button
                      className="p-1 transition-colors hover:bg-gray-100 rounded-full"
                      onClick={goToNextMonth}
                    >
                      {/* Next arrow button */}
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9 18L15 12L9 6"
                          stroke="#565656"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="flex gap-0 border border-[#D5D5D5] rounded-[12px] overflow-hidden">
                  <button className="py-[10px] px-[20px] text-[12px] font-semibold text-[#202224] bg-[#FAFBFD] hover:bg-[#F0F3F9]">
                    Day
                  </button>
                  <button className="py-[10px] px-[20px] text-[12px] font-semibold text-[#202224] bg-[#FAFBFD] hover:bg-[#F0F3F9]">
                    Week
                  </button>
                  <button className="py-[10px] px-[20px] text-[12px] font-semibold text-white bg-[#5A8DFF]">
                    Month
                  </button>
                  <div className="border-l border-[#979797]/70 h-full opacity-70"></div>
                </div>
              </div>

              {/* Calendar Header Bar */}
              <div className="bg-[#F1F4F9] rounded-t-[12px] grid grid-cols-7 mb-0">
                {days.map((day) => (
                  <div
                    key={day}
                    className="text-center text-[14px] font-bold text-[#202224] py-3"
                  >
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Grid - Updated to match Figma design */}
              <div className="relative border border-[#D5D5D5]/20 rounded-b-[14px] overflow-hidden">
                <div className="grid grid-cols-7 grid-rows-6 bg-white">
                  {/* Previous month dates */}
                  {prevMonthDates.map((day) => (
                    <div
                      key={`prev-${day}`}
                      className="aspect-square flex justify-end items-start p-2 relative border-b border-r border-[#E0E0E0]/20"
                    >
                      <span className="text-[16px] font-semibold text-[#B2B2B2]">
                        {day}
                      </span>
                    </div>
                  ))}

                  {/* Current month dates */}
                  {currentMonthDates.map((day) => {
                    // Find events for this day
                    const dayEvents = featuredEvents.filter(
                      (event) => event.day === day
                    );

                    return (
                      <div
                        key={`current-${day}`}
                        className="aspect-square flex justify-end items-start p-2 relative border-b border-r border-[#E0E0E0]/20"
                      >
                        <span
                          className={`text-[16px] font-semibold ${
                            day === 16 ? "text-[#4880FF]" : "text-[#202224]"
                          }`}
                        >
                          {day}
                        </span>

                        {/* Event indicators */}
                        <div className="absolute left-0 right-0 bottom-0 px-2">
                          {dayEvents.map((event, index) => (
                            <div
                              key={event.id}
                              className="mb-1 p-1 rounded-sm cursor-pointer"
                              style={{
                                backgroundColor: `${event.color}20`,
                                borderLeft: `3px solid ${event.color}`,
                                marginBottom: `${index * 2}px`,
                              }}
                            >
                              <span
                                className="text-[10px] font-bold"
                                style={{ color: event.color }}
                              >
                                {event.title}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}

                  {/* Next month dates */}
                  {nextMonthDates.map((day) => (
                    <div
                      key={`next-${day}`}
                      className="aspect-square flex justify-end items-start p-2 relative border-b border-r border-[#E0E0E0]/20"
                    >
                      <span className="text-[16px] font-semibold text-[#B2B2B2]">
                        {day}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Horizontal grid lines pattern to match Figma design */}
                {Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={`hline-${i}`}
                    className="absolute h-[1px] left-0 right-0 bg-[#E0E0E0]/45"
                    style={{ top: `${(i + 1) * (100 / 6)}%` }}
                  ></div>
                ))}

                {/* Vertical grid lines pattern to match Figma design */}
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={`vline-${i}`}
                    className="absolute w-[1px] top-0 bottom-0 bg-[#E0E0E0]/45"
                    style={{ left: `${(i + 1) * (100 / 7)}%` }}
                  ></div>
                ))}

                {/* Pattern overlay for the background (if needed) */}
                <div className="absolute inset-0 opacity-40 pointer-events-none pattern-overlay"></div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Calendar;
