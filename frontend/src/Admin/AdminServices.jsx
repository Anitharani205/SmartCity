import React, { useEffect, useState } from "react";
import AdminSidebar from "./components/AdminSidebar";
import API from "../services/api";

export default function AdminServices() {

  const [bookings, setBookings] = useState([]);

  
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;

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

  const indexOfLastItem =
    currentPage * itemsPerPage;

  const indexOfFirstItem =
    indexOfLastItem - itemsPerPage;

  const currentBookings =
    bookings.slice(
      indexOfFirstItem,
      indexOfLastItem
    );

  const totalPages = Math.ceil(
    bookings.length / itemsPerPage
  );

  return (
    <div className="flex bg-gray-100 min-h-screen">

      
      <div className="fixed left-0 top-0 h-screen w-64 bg-white shadow-lg z-50">
        <AdminSidebar />
      </div>

      
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

                  <th className="p-4 text-left">
                    Service
                  </th>

                  <th className="p-4 text-left">
                    Citizen Details
                  </th>

                  <th className="p-4 text-left">
                    Address & Map
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

              <tbody>

                {currentBookings.map((b) => (

                  <tr
                    key={b.id}
                    className="border-b hover:bg-gray-50 transition"
                  >

                   
                    <td className="p-4">

                      <div className="font-semibold text-gray-800">
                        {b.service}
                      </div>

                      <div className="text-sm text-gray-500">
                        Date: {b.date}
                      </div>

                    </td>

                    
                    <td className="p-4">

                      <div className="font-medium text-gray-800">
                        {b.citizenName}
                      </div>

                      <div className="text-sm text-gray-500">
                        {b.citizen}
                      </div>

                    </td>

                   
                    <td className="p-4">

                      <div className="text-gray-700">
                        {b.address}
                      </div>

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
                        className={`px-3 py-1 rounded-full text-sm font-medium
                        ${
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

        
          <div className="flex justify-center items-center gap-2 p-6">

            <button
              onClick={() =>
                setCurrentPage((prev) =>
                  prev > 1 ? prev - 1 : prev
                )
              }
              className="px-4 py-2 bg-gray-200 rounded-lg"
            >
              Prev
            </button>

            {[...Array(totalPages)].map((_, index) => (

              <button
                key={index}
                onClick={() =>
                  setCurrentPage(index + 1)
                }
                className={`px-4 py-2 rounded-lg
                  ${
                    currentPage === index + 1
                      ? "bg-green-600 text-white"
                      : "bg-gray-200"
                  }`}
              >
                {index + 1}
              </button>

            ))}

            <button
              onClick={() =>
                setCurrentPage((prev) =>
                  prev < totalPages
                    ? prev + 1
                    : prev
                )
              }
              className="px-4 py-2 bg-gray-200 rounded-lg"
            >
              Next
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

