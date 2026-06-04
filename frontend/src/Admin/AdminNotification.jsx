import { useEffect, useState } from "react";
import API from "../services/api";
import AdminSidebar from "./components/AdminSidebar";

export default function AdminNotification() {

  const [notifications, setNotifications] = useState([]);

  
  const [currentPage, setCurrentPage] = useState(1);

  const notificationsPerPage = 5;

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {

    try {

      const res = await API.get("/notifications/admin");

      setNotifications(res.data);

    } catch (err) {

      console.log("Error loading notifications", err);
    }
  };

  
  const indexOfLastNotification =
    currentPage * notificationsPerPage;

  const indexOfFirstNotification =
    indexOfLastNotification -
    notificationsPerPage;

  const currentNotifications =
    notifications.slice(
      indexOfFirstNotification,
      indexOfLastNotification
    );

  const totalPages =
    Math.ceil(
      notifications.length /
      notificationsPerPage
    );

  return (
    <div className="flex bg-gray-100 min-h-screen">

     
      <AdminSidebar />

      
      <div className="flex-1 p-8">

        <h1 className="text-3xl font-bold mb-6">
          Admin Notifications
        </h1>

        {notifications.length === 0 ? (

          <p className="text-gray-500">
            No notifications yet
          </p>

        ) : (

          <>
            <div className="space-y-4">

              {currentNotifications.map((n) => (

                <div
                  key={n.id}
                  className="bg-white p-4 rounded-xl shadow border-l-4 border-blue-500"
                >

                  <p className="text-gray-800 font-medium">
                    {n.message}
                  </p>

                  <div className="flex justify-between mt-2 text-sm text-gray-500">

                    <span>
                      Role: {n.role}
                    </span>

                    <span>
                      {n.createdAt}
                    </span>

                  </div>

                </div>
              ))}

            </div>

            {/* PAGINATION */}
            <div className="flex justify-center gap-3 mt-6">

              <button
                disabled={currentPage === 1}
                onClick={() =>
                  setCurrentPage(currentPage - 1)
                }
                className="bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
              >
                Prev
              </button>

              <span className="font-semibold">
                Page {currentPage} of {totalPages}
              </span>

              <button
                disabled={currentPage === totalPages}
                onClick={() =>
                  setCurrentPage(currentPage + 1)
                }
                className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
              >
                Next
              </button>

            </div>
          </>
        )}

      </div>

    </div>
  );
}
