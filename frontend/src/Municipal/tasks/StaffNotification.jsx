import React from "react";

export default function StaffNotifications({ notifications }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4">Notifications</h2>

      {notifications.length === 0 ? (
        <p>No notifications</p>
      ) : (
        notifications.map((n) => (
          <div key={n.id} className="border p-3 mb-2 rounded">
            <p>{n.message}</p>
            <small>{n.time}</small>
          </div>
        ))
      )}
    </div>
  );
}