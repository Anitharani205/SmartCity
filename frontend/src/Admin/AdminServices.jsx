import React, { useEffect, useState } from "react";
import AdminSidebar from "./components/AdminSidebar";
import API from "../services/api";

export default function AdminServices() {
  const [bookings, setBookings] = useState([]);
  const [staff, setStaff] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      const res = await API.get("/services");
      setBookings(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const loadStaff = async (category) => {
    try {
      const res = await API.get(`/users/department/${category}`);
      setStaff(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const assignService = async (id, staffName, staffEmail) => {
    try {
      await API.put(`/services/assign/${id}`, {
        assignedStaffName: staffName,
        assignedStaffEmail: staffEmail,
      });

      alert(`Assigned to ${staffName}`);
      loadServices();
    } catch (err) {
      console.log(err);
      alert("Assignment Failed");
    }
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBookings = bookings.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // 🔴 FORCE 5 PAGES (UI ONLY)
  const totalPages = Math.max(
    5,
    Math.ceil(bookings.length / itemsPerPage)
  );

  return (
    <div className="flex bg-gray-100 min-h-screen">

      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-screen w-64 bg-white shadow-lg z-50">
        <AdminSidebar />
      </div>

      {/* Main */}
      <div className="flex-1 ml-64 p-8">

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800">
            Service Management
          </h1>
          <p className="text-gray-500 mt-2">
            Assign municipal staff to citizen services
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

          <div className="overflow-x-auto">
            <table className="w-full">

              <thead className="bg-gradient-to-r from-green-600 to-emerald-600 text-white">
                <tr>
                  <th className="p-4 text-left">Service</th>
                  <th className="p-4 text-left">Citizen Details</th>
                  <th className="p-4 text-left">Address & Map</th>
                  <th className="p-4 text-left">Status</th>
                  <th className="p-4 text-left">Assigned Staff</th>
                  <th className="p-4 text-center">Assign Service</th>
                </tr>
              </thead>

              <tbody>
                {currentBookings.map((b) => (
                  <tr key={b.id} className="border-b hover:bg-gray-50">

                    <td className="p-4">
                      <div className="font-semibold">{b.service}</div>
                      <div className="text-sm text-gray-500">
                        Date: {b.date}
                      </div>
                    </td>

                    <td className="p-4">
                      <div>{b.citizenName}</div>
                      <div className="text-sm text-gray-500">{b.citizen}</div>
                    </td>

                    <td className="p-4">
                      <div>{b.address}</div>

                      {b.mapLocation && (
                        <a
                          href={b.mapLocation}
                          target="_blank"
                          rel="noreferrer"
                          className="text-green-600 underline text-sm"
                        >
                          Open Map
                        </a>
                      )}
                    </td>

                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          b.status === "Resolved"
                            ? "bg-green-100 text-green-700"
                            : b.status === "In Progress"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {b.status}
                      </span>
                    </td>

                    <td className="p-4">
                      {b.assignedStaffName || (
                        <span className="text-gray-400">Not Assigned</span>
                      )}
                    </td>

                    <td className="p-4 text-center">
                      <select
                        defaultValue=""
                        onClick={() => loadStaff(b.category)}
                        onChange={(e) => {
                          const selected = staff.find(
                            (s) => s.email === e.target.value
                          );

                          if (selected) {
                            assignService(
                              b.id,
                              selected.name,
                              selected.email
                            );
                          }
                        }}
                        className="border px-4 py-2 rounded-lg"
                      >
                        <option value="">Select Staff</option>
                        {staff.map((s) => (
                          <option key={s.id} value={s.email}>
                            {s.name} ({s.activeTasks})
                          </option>
                        ))}
                      </select>
                    </td>

                  </tr>
                ))}
              </tbody>

            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center p-5 border-t bg-gray-50">

            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
            >
              Prev
            </button>

            <div className="text-gray-700 font-medium">
              Page <span className="font-bold">{currentPage}</span> of{" "}
              <span className="font-bold">{totalPages}</span>
            </div>

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="px-4 py-2 bg-green-600 text-white rounded disabled:opacity-50"
            >
              Next
            </button>

          </div>

        </div>
      </div>
    </div>
  );
}