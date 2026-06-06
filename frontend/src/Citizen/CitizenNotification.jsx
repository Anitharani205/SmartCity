import { useEffect, useState } from "react";
import API from "../services/api";
import Sidebar from "./components/Sidebar";

export default function CitizenNotification() {
  const [notifications, setNotifications] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const notificationsPerPage = 5;

  useEffect(() => {
    const email = localStorage.getItem("email");
    console.log("Logged Citizen Email =", email);
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    try {
      const email = localStorage.getItem("email");
      const res = await API.get(`/notifications/citizen/${email}`);
      setNotifications(res.data);
    } catch (err) {
      console.log("Notification Error", err);
    }
  };

  // ================= PAGINATION =================
  const indexOfLast = currentPage * notificationsPerPage;
  const indexOfFirst = indexOfLast - notificationsPerPage;

  const currentNotifications = notifications.slice(
    indexOfFirst,
    indexOfLast
  );

  const totalPages = Math.ceil(
    notifications.length / notificationsPerPage
  );

  return (
    <div className="flex bg-gray-100 min-h-screen">

      <Sidebar />

      <div className="flex-1 ml-64 p-8">

        <h1 className="text-3xl font-bold mb-6">
          Citizen Notifications
        </h1>

        {notifications.length === 0 ? (
          <div className="bg-white p-6 rounded-xl shadow">
            No notifications yet
          </div>
        ) : (
          <>
            <div className="space-y-4">

              {currentNotifications.map((n) => (
                <div
                  key={n.id}
                  className="bg-white p-4 rounded-xl shadow border-l-4 border-green-500"
                >
                  <p className="font-medium">{n.message}</p>

                  {n.proofImage && (
                    <div className="mt-3">
                      <img
                        src={n.proofImage}
                        alt="proof"
                        className="w-20 h-20 object-cover rounded border cursor-pointer hover:scale-105 transition"
                        onClick={() =>
                          window.open(n.proofImage, "_blank")
                        }
                      />

                      <a
                        href={n.proofImage}
                        target="_blank"
                        rel="noreferrer"
                        className="text-green-600 text-sm underline ml-2"
                      >
                        View Proof
                      </a>
                    </div>
                  )}

                  <div className="flex justify-between mt-2 text-sm text-gray-500">
                    <span>{n.role}</span>
                    <span>{n.createdAt}</span>
                  </div>
                </div>
              ))}

            </div>

            {/* ================= PAGINATION (NO NUMBERS) ================= */}
            <div className="flex justify-end items-center mt-10 gap-4">

              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
                className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
              >
                Prev
              </button>

              <div className="text-gray-700 font-medium">
                Page {currentPage} of {totalPages || 1}
              </div>

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
                className="px-4 py-2 bg-green-600 text-white rounded disabled:opacity-50"
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