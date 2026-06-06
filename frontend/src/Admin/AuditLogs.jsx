import React, { useEffect, useState } from "react";
import API from "../services/api";
import AdminSidebar from "./components/AdminSidebar";

export default function AuditLogs() {
  const [logs, setLogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const logsPerPage = 10; // ✅ CHANGED TO 10

  useEffect(() => {
    loadLogs();
  }, []);

  const loadLogs = async () => {
    try {
      const res = await API.get("/audit/all");
      setLogs(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // ================= PAGINATION =================
  const indexOfLast = currentPage * logsPerPage;
  const indexOfFirst = indexOfLast - logsPerPage;

  const currentLogs = logs.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(logs.length / logsPerPage);

  return (
    <div className="flex h-screen bg-gray-100">

      <AdminSidebar />

      <div className="flex-1 p-6 overflow-y-auto">

        <h1 className="text-2xl font-bold mb-4">
          Audit Logs
        </h1>

        <table className="w-full bg-white shadow">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2">Time</th>
              <th className="p-2">Admin</th>
              <th className="p-2">Action</th>
              <th className="p-2">Target</th>
              <th className="p-2">Details</th>
            </tr>
          </thead>

          <tbody>
            {currentLogs.map((l, i) => (
              <tr key={i} className="border-t">
                <td className="p-2">{l.time}</td>
                <td className="p-2">{l.admin}</td>
                <td className="p-2">{l.action}</td>
                <td className="p-2">{l.target}</td>
                <td className="p-2">{l.details}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* ================= PAGINATION ================= */}
        <div className="flex justify-end items-center mt-6 gap-4">

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
            className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
          >
            Next
          </button>

        </div>

      </div>
    </div>
  );
}