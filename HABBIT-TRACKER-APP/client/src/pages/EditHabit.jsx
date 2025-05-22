import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditHabit = () => {
  const { id } = useParams(); // Get habit ID from route
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    description: "",
    frequency: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHabit = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("You must be logged in.");
        navigate("/login");
        return;
      }

      try {
        const res = await axios.get(`http://localhost:5000/api/habits/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        // If your backend returns { habit: {...} }, use res.data.habit
        setForm(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching habit:", err.response?.data || err.message || err);
        alert("Failed to fetch habit details.");
        setLoading(false);
      }
    };

    fetchHabit();
  }, [id, navigate]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.frequency) {
      alert("Please fill in required fields.");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Session expired. Please login again.");
        navigate("/login");
        return;
      }

      await axios.put(`http://localhost:5000/api/habits/${id}`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Habit updated successfully!");
      navigate("/habit-dashboard");
    } catch (err) {
      console.error("Failed to update habit:", err.response?.data || err.message || err);
      alert("Failed to update habit. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-400 via-purple-400 to-pink-400 p-6">
        <p className="text-white text-lg font-semibold">Loading habit details...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-400 via-purple-400 to-pink-400 p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-lg space-y-6 border-4 border-rose-300"
      >
        <h2 className="text-3xl font-extrabold text-center text-purple-700 font-mono">
          ✏️ Edit Habit
        </h2>

        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Habit Name"
          className="w-full p-3 rounded-xl shadow-inner border-2 border-purple-200 focus:outline-none focus:ring-4 focus:ring-rose-300 font-semibold"
          required
        />

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Short Description"
          className="w-full p-3 rounded-xl shadow-inner border-2 border-purple-200 focus:outline-none focus:ring-4 focus:ring-rose-300 font-semibold"
          rows="3"
        ></textarea>

        <select
          name="frequency"
          value={form.frequency}
          onChange={handleChange}
          className="w-full p-3 rounded-xl shadow-inner border-2 border-purple-200 focus:outline-none focus:ring-4 focus:ring-rose-300 font-semibold"
          required
        >
          <option value="">Select Frequency</option>
          <option value="Daily">Daily</option>
          <option value="Weekly">Weekly</option>
        </select>

        <button
          type="submit"
          className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-500 to-rose-500 text-white font-bold tracking-wide shadow-lg transform transition-transform hover:scale-105 hover:shadow-2xl"
        >
          ✅ Update Habit
        </button>
      </form>
    </div>
  );
};

export default EditHabit;
