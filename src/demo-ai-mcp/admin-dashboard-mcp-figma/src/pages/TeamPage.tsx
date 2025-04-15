import { useState } from "react";
import avatar from "../assets/images/people/Image.png";
import avatar1 from "../assets/images/people/Image-1.png";
import avatar2 from "../assets/images/people/Image-2.png";
import avatar3 from "../assets/images/people/Image-3.png";
import avatar4 from "../assets/images/people/Image-4.png";
import avatar5 from "../assets/images/people/Image-5.png";
import avatar6 from "../assets/images/people/Image-6.png";
import avatar7 from "../assets/images/people/Image-7.png";
import avatar8 from "../assets/images/people/Image-8.png";
import avatar9 from "../assets/images/people/Image-9.png";
import avatar10 from "../assets/images/people/Image-10.png";
import avatar11 from "../assets/images/people/Image-11.png";

interface TeamMember {
  id: number;
  name: string;
  role: string;
  email: string;
  avatarUrl: string;
}

export default function TeamPage() {
  const [teamMembers, _setTeamMembers] = useState<TeamMember[]>([
    {
      id: 1,
      name: "Jason Price",
      role: "Admin",
      email: "janick_parisian@yahoo.com",
      avatarUrl: avatar,
    },
    {
      id: 2,
      name: "Jukkoe Sisao",
      role: "CEO",
      email: "sibyl_kozey@gmail.com",
      avatarUrl: avatar1,
    },
    {
      id: 3,
      name: "Harriet King",
      role: "CTO",
      email: "nadia_block@hotmail.com",
      avatarUrl: avatar2,
    },
    {
      id: 4,
      name: "Lenora Benson",
      role: "Lead",
      email: "felix.wallace@kund.us",
      avatarUrl: avatar3,
    },
    {
      id: 5,
      name: "Olivia Reese",
      role: "Strategist",
      email: "kemmer.hattie@crenim.us",
      avatarUrl: avatar4,
    },
    {
      id: 6,
      name: "Bertha Valdez",
      role: "CEO",
      email: "loraine.knolpin@tromp.io",
      avatarUrl: avatar5,
    },
    {
      id: 7,
      name: "Harriett Payne",
      role: "Digital Marketer",
      email: "nannie_west@estrella.tv",
      avatarUrl: avatar6,
    },
    {
      id: 8,
      name: "George Bryant",
      role: "Social Media",
      email: "delmer.kling@gmail.com",
      avatarUrl: avatar7,
    },
    {
      id: 9,
      name: "Lily French",
      role: "Strategist",
      email: "lucienne.herman@hotmail.com",
      avatarUrl: avatar8,
    },
    {
      id: 10,
      name: "Howard Adkins",
      role: "CEO",
      email: "wiegand.leonor@herman.us",
      avatarUrl: avatar9,
    },
    {
      id: 11,
      name: "Earl Bowman",
      role: "Digital Marketer",
      email: "waina_altenwerth@nicolette.tv",
      avatarUrl: avatar10,
    },
    {
      id: 12,
      name: "Patrick Padilla",
      role: "Social Media",
      email: "octavia.renown@gleicher.net",
      avatarUrl: avatar11,
    },
  ]);

  const [searchTerm, _setSearchTerm] = useState("");

  const filteredMembers = teamMembers.filter(
    (member) =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="px-8 py-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-[#202224] text-3xl font-bold">Team</h1>
        <button className="bg-[#4379EE] text-white font-bold py-3 px-6 rounded-md hover:-translate-y-[2px] hover:shadow-[0_4px_8px_rgba(67,121,238,0.2)] hover:bg-[#3668d8] transition duration-200">
          Add New Member
        </button>
      </div>

      {/* Team Members Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredMembers.map((member) => (
          <div
            key={member.id}
            className="bg-white rounded-lg shadow-sm p-6 flex flex-col items-center text-center transition-all hover:shadow-md"
          >
            <div className="relative">
              <img
                src={member.avatarUrl}
                alt={`${member.name}'s avatar`}
                className="w-16 h-16 rounded-full object-cover mb-4"
              />
            </div>
            <h3 className="font-medium text-gray-900 mb-1">{member.name}</h3>
            <p className="text-sm text-gray-500 mb-2">{member.role}</p>
            <p className="text-xs text-gray-400 break-all">{member.email}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
