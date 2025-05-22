import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <main className="flex items-start min-h-screen bg-white px-12 py-20">
      <div className="max-w-md">
        <h1 className="text-6xl font-extrabold text-blue-900 mb-6 leading-tight">
          Welcome to <br />
          <span className="text-blue-600">Habit Tracker</span>
        </h1>
        <p className="text-gray-700 text-lg mb-10">
          Build and maintain daily habits like reading, praying, or drinking water.
        </p>
        <div className="flex gap-5">
          <Link
            to="/login"
            className="bg-blue-700 hover:bg-blue-800 text-white px-8 py-3 rounded-lg font-semibold shadow-md transition"
            aria-label="Go to Login page"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold shadow-md transition"
            aria-label="Go to Register page"
          >
            Register
          </Link>
        </div>
        <p className="mt-12 text-sm text-gray-500 italic max-w-xs">
          * Track your habits, set reminders, and monitor your progress!
        </p>
      </div>
    </main>
  );
};

export default Home;
