import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddHabitLog = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: "",
        description: "",
        frequency: "",
    });

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.name || !form.frequency) {
            alert("Please fill in all required fields.");
            return;
        }

        try {
            const token = localStorage.getItem("token");
            if (!token) {
                alert("You must be logged in.");
                navigate("/login");
                return;
            }

            await axios.post("http://localhost:5000/api/habits", form, {
                headers: { Authorization: `Bearer ${token}` },
            });

            navigate("/habit-dashboard");
        } catch (err) {
            console.error("Error adding habit:", err);
            alert("Failed to add habit. Try again.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-300 via-rose-400 to-purple-400 p-6">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-lg space-y-6 border-4 border-pink-200"
            >
                <h2 className="text-3xl font-bold text-center text-rose-600 font-mono">
                    🌱 Add New Habit
                </h2>

                <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Habit Name"
                    className="w-full p-3 rounded-xl shadow-inner border-2 border-rose-200 focus:outline-none focus:ring-4 focus:ring-pink-300 font-semibold"
                    required
                />

                <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    placeholder="Short Description (optional)"
                    rows="3"
                    className="w-full p-3 rounded-xl shadow-inner border-2 border-rose-200 focus:outline-none focus:ring-4 focus:ring-pink-300 font-semibold"
                ></textarea>

                <select
                    name="frequency"
                    value={form.frequency}
                    onChange={handleChange}
                    className="w-full p-3 rounded-xl shadow-inner border-2 border-rose-200 focus:outline-none focus:ring-4 focus:ring-pink-300 font-semibold"
                    required
                >
                    <option value="">Select Frequency</option>
                    <option value="Daily">Daily</option>
                    <option value="Weekly">Weekly</option>
                </select>

                <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold tracking-wide shadow-lg transform transition-transform hover:scale-105 hover:shadow-2xl"
                >
                    ➕ Add Habit
                </button>
            </form>
        </div>
    );
};

export default AddHabitLog;
