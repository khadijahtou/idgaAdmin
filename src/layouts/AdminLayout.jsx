import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const AdminLayout = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Navbar at the very top */}
      <Navbar />

      {/* Sidebar + Main Content */}
      <div className="flex">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Area */}
        <main className="flex-1 p-4 md:p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
