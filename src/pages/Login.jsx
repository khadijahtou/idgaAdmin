import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import api from "../api/axios";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.post("/auth/login", {
        email,
        password,
      });

      login(response.data.user, response.data.token);

      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
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
            placeholder="john.doe@idga.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium">Password</label>

          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Button */}
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-xl transition"
        >
          {loading ? "Signing In..." : "Sign In"}
        </button>

        <p className="text-center text-sm text-gray-500 mt-6">
          Secure administrative access
        </p>
      </div>
    </div>
  );
};

export default Login;
