import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/users/register", form);
      alert("Registration successful! Please login.");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-sky-200 to-blue-300 p-6">
      <div className="w-full max-w-md bg-white/20 backdrop-blur-xl rounded-3xl shadow-2xl border border-blue-300 p-8">
        <h2 className="text-3xl text-center font-extrabold text-blue-800 mb-6 tracking-wide font-serif">
          Create Your Account 💼
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 text-blue-700 font-semibold">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              onChange={handleChange}
              className="w-full p-3 rounded-lg border-2 border-blue-300 bg-white/70 text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-blue-700 font-semibold">Email</label>
            <input
              type="email"
              name="email"
              placeholder="example@mail.com"
              onChange={handleChange}
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
              className="w-full p-3 rounded-lg border-2 border-blue-300 bg-white/70 text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-blue-700 font-semibold">Role</label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border-2 border-blue-300 bg-white/70 text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-sky-500 to-blue-600 text-white font-bold rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
