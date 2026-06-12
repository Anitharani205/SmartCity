import { useEffect, useState } from "react";
import API from "../services/api";
import Sidebar from "./components/Sidebar";

export default function CitizenNotification() {

  const [notifications, setNotifications] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const notificationsPerPage = 5;

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    const email = localStorage.getItem("email");
    const res = await API.get(`/notifications/citizen/${email}`);
    setNotifications(res.data);
    setCurrentPage(1);
  };

  const refresh = async () => {
    const email = localStorage.getItem("email");
    const res = await API.get(`/notifications/citizen/${email}`);
    setNotifications(res.data);
    setCurrentPage(1);
  };

  const indexOfLast = currentPage * notificationsPerPage;
  const indexOfFirst = indexOfLast - notificationsPerPage;

  const complaints = notifications.filter(
  (n) => n.complaintId && !n.serviceId
);

const services = notifications.filter(
  (n) => n.serviceId
);

  

  return (
    <div className="flex bg-gray-100 min-h-screen">

      <Sidebar />

      <div className="flex-1 ml-64 p-8">

        <h1 className="text-3xl font-bold mb-6">
          Citizen Notifications
        </h1>

        
        <h2 className="text-blue-600 font-bold mb-3">
          Complaints
        </h2>

        {complaints.map((n) => (
          <div key={n.id} className="bg-white p-4 mb-3 rounded shadow">

            <p className="mb-3">{n.message}</p>

            <div className="flex gap-2">

              <button
                className="bg-green-600 text-white px-3 py-1 rounded"
                onClick={async () => {
                  const feedback = prompt("Enter feedback") || "";

                  await API.put(`/complaints/feedback/${n.complaintId}`, {
                    citizenApproval: "APPROVED",
                    citizenFeedback: feedback
                  });

                  alert("Approved");
                  refresh();
                }}
              >
                Approve
              </button>

              <button
                className="bg-red-600 text-white px-3 py-1 rounded"
                onClick={async () => {
                  const feedback = prompt("Reason for rejection") || "";

                  await API.put(`/complaints/feedback/${n.complaintId}`, {
                    citizenApproval: "REJECTED",
                    citizenFeedback: feedback
                  });

                  alert("Rejected");
                  refresh();
                }}
              >
                Reject
              </button>

            </div>
          </div>
        ))}

     
        <h2 className="text-green-600 font-bold mb-3 mt-6">
          Services
        </h2>

        {services.map((n) => (
          <div key={n.id} className="bg-white p-4 mb-3 rounded shadow">

            <p className="mb-3">{n.message}</p>

            <div className="flex gap-2">

              <button
                className="bg-green-600 text-white px-3 py-1 rounded"
                onClick={async () => {
                  const feedback = prompt("Enter feedback") || "";

                  await API.put(`/services/feedback/${n.serviceId}`, {
                    status: "APPROVED",
                    progressNote: feedback
                  });

                  alert("Approved");
                  refresh();
                }}
              >
                Approve
              </button>

              <button
                className="bg-red-600 text-white px-3 py-1 rounded"
                onClick={async () => {
                  const feedback = prompt("Reason") || "";

                  await API.put(`/services/feedback/${n.serviceId}`, {
                    status: "REJECTED",
                    progressNote: feedback
                  });

                  alert("Rejected");
                  refresh();
                }}
              >
                Reject
              </button>

            </div>

          </div>
        ))}

      </div>
    </div>
  );
}