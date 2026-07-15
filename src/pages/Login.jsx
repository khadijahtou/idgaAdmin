import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/temp";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    login(
      {
        name: "Admin",
        email: "admin@idga.com",
      },
      "fake-token",
    );

    navigate("/");
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-slate-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-xl rounded-3xl p-8 w-full max-w-md">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <img
            src="/logoIcon.png"
            alt="IDGA Logo"
            className="h-20 w-auto mb-4"
          />

          <h1 className="text-3xl font-bold text-center">Welcome Back</h1>

          <p className="text-gray-500 text-center mt-2">
            Access the IDGA Admin Portal
          </p>
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium">
            Email Address
          </label>

          <input
            type="email"
            placeholder="admin@idga.com"
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium">Password</label>

          <input
            type="password"
            placeholder="••••••••"
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Button */}
        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-xl transition"
        >
          Sign In
        </button>

        <p className="text-center text-sm text-gray-500 mt-6">
          Secure administrative access
        </p>
      </div>
    </div>
  );
};

export default Login;
