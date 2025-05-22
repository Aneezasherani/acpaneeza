// src/components/ReminderModal.jsx
import React from "react";

const ReminderModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">⏰ Daily Reminder</h2>
        <p className="text-gray-700">
          You haven’t logged any health data today. Stay on track with your goals!
        </p>
        <button
          onClick={onClose}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600"
        >
          Got it!
        </button>
      </div>
    </div>
  );
};

export default ReminderModal;
