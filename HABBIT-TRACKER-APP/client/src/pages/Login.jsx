import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/users/login", form);

      const token = res.data.token;
      const role = res.data.user?.role;

      if (!token || !role) {
        alert("Login failed: Invalid server response.");
        return;
      }

      login(token, role);
      navigate(role === "admin" ? "/admin-dashboard" : "/user-dashboard");
    } catch (err) {
      console.error("Login error:", err);
      alert(err.response?.data?.message || "Login failed.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-sky-200 to-blue-300 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white/20 backdrop-blur-xl rounded-3xl shadow-2xl border border-blue-300 p-8">
        <h2 className="text-3xl text-center font-extrabold text-blue-800 mb-6 tracking-wide font-serif">
          Login to Your Account 🔐
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 text-blue-700 font-semibold">Email</label>
            <input
              type="email"
              name="email"
              placeholder="example@mail.com"
              onChange={handleChange}
              value={form.email}
              className="w-full p-3 rounded-lg border-2 border-blue-300 bg-white/70 text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-blue-700 font-semibold">Password</label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              onChange={handleChange}
              value={form.password}
              className="w-full p-3 rounded-lg border-2 border-blue-300 bg-white/70 text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-sky-500 to-blue-600 text-white font-bold rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
