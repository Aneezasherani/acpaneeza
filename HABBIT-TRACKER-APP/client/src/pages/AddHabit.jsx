import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddHabit = () => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    frequency: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.frequency) {
      alert("Please fill in required fields: Name and Frequency.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You must be logged in to add a habit.");
        navigate("/login");
        return;
      }

      await axios.post("http://localhost:5000/api/habits", form, {
        headers: { Authorization: `Bearer ${token}` },
      });

      navigate("/habit-dashboard");
    } catch (err) {
      console.error("Failed to add habit:", err);
      alert("Failed to add habit. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-lg space-y-6 border-4 border-purple-300"
      >
        <h2 className="text-3xl font-extrabold text-center text-rose-600 font-mono">
          Create a New Habit
        </h2>

        <input
          type="text"
          name="name"
          placeholder="Habit Name"
          value={form.name}
          onChange={handleChange}
          className="w-full p-3 rounded-xl shadow-inner border-2 border-rose-200 focus:outline-none focus:ring-4 focus:ring-purple-300 font-semibold"
          required
        />

        <textarea
          name="description"
          placeholder="Short Description (optional)"
          value={form.description}
          onChange={handleChange}
          className="w-full p-3 rounded-xl shadow-inner border-2 border-rose-200 focus:outline-none focus:ring-4 focus:ring-purple-300 font-semibold"
          rows="3"
        ></textarea>

        <select
          name="frequency"
          value={form.frequency}
          onChange={handleChange}
          className="w-full p-3 rounded-xl shadow-inner border-2 border-rose-200 focus:outline-none focus:ring-4 focus:ring-purple-300 font-semibold"
          required
        >
          <option value="">Select Frequency</option>
          <option value="Daily">Daily</option>
          <option value="Weekly">Weekly</option>
        </select>

        <button
          type="submit"
          className="w-full py-3 rounded-xl bg-gradient-to-r from-rose-500 via-purple-500 to-pink-500 text-white font-bold tracking-wide shadow-lg transform transition-transform hover:scale-105 hover:shadow-2xl"
        >
          🚀 Add Habit
        </button>
      </form>
    </div>
  );
};

export default AddHabit;
