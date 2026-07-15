import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const AdminLayout = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Fixed Sidebar */} <Sidebar />
      {/* Main Area */}
      <div className="md:ml-64 flex flex-col min-h-screen">
        {/* Fixed Navbar */}
        <Navbar />

        {/* Page Content */}
        <main className="flex-1 p-4 md:p-6  overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
