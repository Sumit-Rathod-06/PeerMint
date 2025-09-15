// components/NotificationsCard.jsx
import React from "react";

const NotificationsCard = ({ notifications }) => {
  return (
    <div className="bg-white shadow rounded-lg p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">Notifications</h2>
      <ul className="space-y-2">
        {notifications.map((n, idx) => (
          <li key={idx} className="text-gray-700 border-b pb-2">
            {n}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationsCard;
