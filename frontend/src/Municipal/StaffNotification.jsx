import { useEffect, useState } from "react";
import API from "../services/api";
import MunicipalSidebar from "./components/MunicipalSidebar";

export default function StaffNotification() {

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const email = localStorage.getItem("email");
    const res = await API.get(`/notifications/staff/${email}`);
    setNotifications(res.data);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}
      <div className="w-64 fixed h-full bg-gray-900 text-white">
        <MunicipalSidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-64 p-6">

        <h1 className="text-3xl font-bold mb-6">
          Staff Notifications
        </h1>

        {notifications.length === 0 ? (
          <p className="text-gray-500">No notifications</p>
        ) : (
          notifications.map((n) => (
            <div
              key={n.id}
              className="bg-white p-4 rounded shadow mb-4"
            >
              <p className="mb-2">{n.message}</p>

              <p className="text-sm text-gray-500">
                {n.createdAt}
              </p>
            </div>
          ))
        )}

      </div>
    </div>
  );
}