import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const linkClass = ({ isActive }) =>
    `block px-4 py-2 rounded transition ${
      isActive ? "bg-blue-600 text-white" : "hover:bg-gray-200"
    }`;

  return (
    <div className="fixed left-0 top-0 w-64 min-h-screen bg-white shadow-md p-4">
      <h1 className="text-xl font-bold mb-6">Admin Panel</h1>

      <nav className="space-y-2">
        <NavLink to="/" end className={linkClass}>
          Dashboard
        </NavLink>

        <NavLink to="/content" className={linkClass}>
          Content
        </NavLink>

        <NavLink to="/content/create" className={linkClass}>
          Create Content
        </NavLink>
        <NavLink to="/comments" className={linkClass}>
          Comments
        </NavLink>
        <NavLink to="/consultations" className={linkClass}>
          Consultations
        </NavLink>
        <NavLink to="/enrollments" className={linkClass}>
          Enrollments
        </NavLink>
        <NavLink to="/newsletter" className={linkClass}>
          Newsletter
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
