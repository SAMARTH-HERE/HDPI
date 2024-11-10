import React, { useState } from 'react';
import { FaBox, FaUser, FaCommentDots, FaCalendar, FaSuitcase } from "react-icons/fa";
import { TbUsers } from "react-icons/tb";
import { Link } from "react-router-dom";

const Sidebar = () => {
    const [activeLink, setActiveLink] = useState(0);
    const handleLinkClick = (index) => {
        setActiveLink(index);
    };

    const SIDEBAR_LINKS = [
        { id: 1, path: "/", name: "Dashboard", icon: FaBox },
        { id: 2, path: "/setting", name: "Jobs", icon: TbUsers },
        { id: 3, path: "/Candidate", name: "Candidates", icon: FaCommentDots },
        { id: 4, path: "/projects", name: "Projects", icon: FaSuitcase },
        { id: 5, path: "/clients", name: "Clients", icon: FaUser },
        { id: 6, path: "/work", name: "Work Plan", icon: FaCalendar },
    ];

    return (
        <div className="w-56 fixed left-0 top-0 z-10 h-screen border-r bg-white" style={{ paddingTop: '50px' }}>
            <ul className='mt-6 space-y-1 pl-7'>
                {SIDEBAR_LINKS.map(link => {
                    const IconComponent = link.icon;
                    return (
                        <li key={link.id} className={`font-medium rounded-md py-2 hover:bg-gray-100 hover:text-indigo-500 ${activeLink === link.id ? "bg-indigo-100" : ""}`}>
                            <Link to={link.path} className="flex items-center px-4 justify-start space-x-2" onClick={() => handleLinkClick(link.id)}>
                                <IconComponent className="sidebar-icon" />
                                <span className="text-sm text-gray-500">{link.name}</span>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default Sidebar;
