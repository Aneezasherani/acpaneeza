import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        setLoading(true);
        const res = await axios.get("http://localhost:5000/api/users", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUsers(res.data);
        setError(null);
      } catch (err) {
        setError(err.response?.data.message || "Failed to fetch users");
        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-indigo-300 to-purple-300 p-8">
      <div className="max-w-5xl mx-auto bg-white/70 backdrop-blur-md p-10 rounded-3xl shadow-2xl border-2 border-indigo-200">
        <h2 className="text-4xl font-extrabold text-center text-indigo-700 mb-6 font-mono">
          ✏️ Admin Dashboard
        </h2>
        <h3 className="text-xl font-semibold text-center text-gray-700 mb-4">
          Registered Users
        </h3>

        {loading ? (
          <p className="text-center text-gray-600 font-medium">Loading users...</p>
        ) : error ? (
          <p className="text-center text-red-600 font-semibold">{error}</p>
        ) : users.length === 0 ? (
          <p className="text-center text-gray-600">No users found.</p>
        ) : (
          <div className="overflow-x-auto mt-4">
            <table className="min-w-full bg-white rounded-xl shadow-md overflow-hidden">
              <thead className="bg-indigo-200 text-indigo-800 font-semibold">
                <tr>
                  <th className="px-6 py-3 text-left">Name</th>
                  <th className="px-6 py-3 text-left">Email</th>
                  <th className="px-6 py-3 text-left">Role</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, idx) => (
                  <tr
                    key={user._id}
                    className={`${idx % 2 === 0 ? "bg-white" : "bg-blue-50"
                      } text-gray-700 hover:bg-indigo-100 transition`}
                  >
                    <td className="px-6 py-4">{user.name}</td>
                    <td className="px-6 py-4">{user.email}</td>
                    <td className="px-6 py-4">{user.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
