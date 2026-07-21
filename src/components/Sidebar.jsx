import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  PlusCircle,
  MessageSquare,
  CalendarCheck,
  Users,
  Mail,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded transition ${
      isActive ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-200"
    }`;

  return (
    <aside
      className={`min-h-[calc(100vh-73px)] bg-white shadow-md p-4 shrink-0 transition-all duration-300 ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      {/* HEADER */}
      <div
        className={`flex items-center mb-6 ${
          collapsed ? "justify-center" : "justify-between"
        }`}
      >
        {!collapsed && <h1 className="text-xl font-bold">Admin Panel</h1>}

        <button
          onClick={() => setCollapsed((prev) => !prev)}
          className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-gray-200"
        >
          {collapsed ? <ChevronRight size={22} /> : <ChevronLeft size={22} />}
        </button>
      </div>

      {/* NAVIGATION */}
      <nav className="space-y-2">
        <NavLink to="/" end className={linkClass}>
          <LayoutDashboard size={20} />
          {!collapsed && <span>Dashboard</span>}
        </NavLink>

        <NavLink to="/content" className={linkClass}>
          <FileText size={20} />
          {!collapsed && <span>Content</span>}
        </NavLink>

        <NavLink to="/content/create" className={linkClass}>
          <PlusCircle size={20} />
          {!collapsed && <span>Create Content</span>}
        </NavLink>

        <NavLink to="/comments" className={linkClass}>
          <MessageSquare size={20} />
          {!collapsed && <span>Comments</span>}
        </NavLink>

        <NavLink to="/consultations" className={linkClass}>
          <CalendarCheck size={20} />
          {!collapsed && <span>Consultations</span>}
        </NavLink>

        <NavLink to="/enrollments" className={linkClass}>
          <Users size={20} />
          {!collapsed && <span>Enrollments</span>}
        </NavLink>

        <NavLink to="/newsletter" className={linkClass}>
          <Mail size={20} />
          {!collapsed && <span>Newsletter</span>}
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
