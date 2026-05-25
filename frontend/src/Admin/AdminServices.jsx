import React, { useEffect, useState } from "react";
import AdminSidebar from "./components/AdminSidebar";
import API from "../services/api";

export default function AdminServices() {

  const [bookings, setBookings] = useState([]);

  const staffMap = {
    Sarah: "sarah@municipal.com",
    David: "david@municipal.com",
    Michael: "michael@municipal.com"
  };

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

  const assignService = async (id, staff) => {

    try {

      await API.put(`/services/assign/${id}`, {
        assignedStaffName: staff,
        assignedStaffEmail: staffMap[staff]
      });

      alert(`Assigned to ${staff}`);

      loadServices();

    } catch (err) {

      console.log(err);

      alert("Assignment Failed");
    }
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">

      {/* SIDEBAR */}
      <div className="fixed left-0 top-0 h-screen w-64 bg-white shadow-lg z-50">
        <AdminSidebar />
      </div>

      {/* CONTENT */}
      <div className="flex-1 ml-64 p-8">

        {/* HEADER */}
        <div className="mb-8">

          <h1 className="text-4xl font-bold text-gray-800">
            Service Management
          </h1>

          <p className="text-gray-500 mt-2">
            Assign municipal staff to citizen services
          </p>

        </div>

        {/* TABLE CARD */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

          <div className="overflow-x-auto">

            <table className="w-full">

              {/* HEADER */}
              <thead className="bg-gradient-to-r from-green-600 to-emerald-600 text-white">

                <tr>

                  <th className="p-4 text-left">
                    Service
                  </th>

                  <th className="p-4 text-left">
                    Citizen
                  </th>

                  <th className="p-4 text-left">
                    Location
                  </th>

                  <th className="p-4 text-left">
                    Status
                  </th>

                  <th className="p-4 text-left">
                    Assigned Staff
                  </th>

                  <th className="p-4 text-center">
                    Assign Service
                  </th>

                </tr>

              </thead>

              {/* BODY */}
              <tbody>

                {bookings.map((b) => (

                  <tr
                    key={b.id}
                    className="border-b hover:bg-gray-50 transition"
                  >

                    {/* SERVICE */}
                    <td className="p-4 font-semibold text-gray-800">
                      {b.service}
                    </td>

                    {/* CITIZEN */}
                    <td className="p-4 text-gray-700">
                      {b.citizen}
                    </td>

                    {/* LOCATION */}
                    <td className="p-4 text-gray-700">
                      {b.location}
                    </td>

                    {/* STATUS */}
                    <td className="p-4">

                      <span className={`px-3 py-1 rounded-full text-sm font-medium
                        ${b.status === "Resolved"
                          ? "bg-green-100 text-green-700"
                          : b.status === "In Progress"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                        }`}
                      >
                        {b.status}
                      </span>

                    </td>

                    {/* STAFF */}
                    <td className="p-4 text-gray-700">

                      {b.assignedStaffName ? (
                        <span className="font-medium">
                          {b.assignedStaffName}
                        </span>
                      ) : (
                        <span className="text-gray-400">
                          Not Assigned
                        </span>
                      )}

                    </td>

                    {/* DROPDOWN */}
                    <td className="p-4 text-center">

                      <select
                        defaultValue=""
                        onChange={(e) => {
                          if (e.target.value) {
                            assignService(
                              b.id,
                              e.target.value
                            );
                          }
                        }}
                        className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                      >

                        <option value="">
                          Select Staff
                        </option>

                        <option value="Sarah">
                          Sarah
                        </option>

                        <option value="David">
                          David
                        </option>

                        <option value="Michael">
                          Michael
                        </option>

                      </select>

                    </td>

                  </tr>
                ))}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </div>
  );
}