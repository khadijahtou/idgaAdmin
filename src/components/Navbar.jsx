import { useAuth } from "../context/temp";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className=" bg-white shadow px-6 py-4 flex justify-between items-center">
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-semibold">IDGA Admin Dashboard</h1>
      </div>

      <div className="flex items-center gap-4">
        {/* <span>{user?.name}</span> */}

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Navbar;
