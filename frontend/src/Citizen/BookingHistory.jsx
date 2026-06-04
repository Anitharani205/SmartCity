import React, { useEffect, useState } from "react";
import API from "../services/api";
import Sidebar from "./components/Sidebar";   // ✅ IMPORT SIDEBAR

export default function BookingHistory() {

  const [services, setServices] = useState([]);

  const loadServices = async () => {

    try {

      const email = localStorage.getItem("email");

      const res = await API.get(
        `/services/citizen/${email}`
      );

      setServices(res.data);

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {

    loadServices();

    const interval = setInterval(() => {
      loadServices();
    }, 5000);

    return () => clearInterval(interval);

  }, []);

  const pendingServices = services.filter(
    (s) => s.status !== "Resolved"
  );

  const resolvedServices = services.filter(
    (s) => s.status === "Resolved"
  );

  return (

    <div className="bg-gray-100 min-h-screen">

      {/* ✅ SIDEBAR */}
      <Sidebar />

      {/* ✅ CONTENT */}
      <div className="ml-64 p-8">

        {/* HEADER */}
        <div className="mb-10">

          <h1 className="text-4xl font-bold text-gray-800">
            Service Booking History
          </h1>

          <p className="text-gray-500 mt-2">
            Track your booked municipal services
          </p>

        </div>

        {/* PENDING */}
        <h2 className="text-2xl font-semibold mb-5 text-yellow-600">
          Pending Services
        </h2>

        <div className="space-y-5 mb-12">

          {pendingServices.length === 0 ? (

            <div className="bg-white p-6 rounded-xl shadow">
              No Pending Services
            </div>

          ) : (

            pendingServices.map((s) => (

              <div
                key={s.id || s._id}
                className="bg-white p-6 rounded-2xl shadow"
              >

                <div className="flex justify-between mb-4">

                  <div>
                    <h3 className="text-2xl font-bold">
                      {s.service}
                    </h3>

                    <p className="text-gray-500">
                      Date: {s.date}
                    </p>
                  </div>

                  <span className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full text-sm">
                    {s.status}
                  </span>

                </div>

                <p><strong>Address:</strong> {s.address}</p>

                <p>
                  <strong>Assigned Staff:</strong>{" "}
                  {s.assignedStaffName || "Not Assigned"}
                </p>

                {s.mapLocation && (
                  <a
                    href={s.mapLocation}
                    target="_blank"
                    rel="noreferrer"
                    className="text-green-600 underline"
                  >
                    Open Map Location
                  </a>
                )}

              </div>
            ))
          )}

        </div>

        {/* RESOLVED */}
        <h2 className="text-2xl font-semibold mb-5 text-green-600">
          Resolved Services
        </h2>

        <div className="space-y-5">

          {resolvedServices.length === 0 ? (

            <div className="bg-white p-6 rounded-xl shadow">
              No Resolved Services
            </div>

          ) : (

            resolvedServices.map((s) => (

              <div
                key={s.id || s._id}
                className="bg-green-50 p-6 rounded-2xl shadow"
              >

                <div className="flex justify-between mb-4">

                  <div>
                    <h3 className="text-2xl font-bold">
                      {s.service}
                    </h3>

                    <p className="text-gray-500">
                      Date: {s.date}
                    </p>
                  </div>

                  <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm">
                    Resolved
                  </span>

                </div>

                <p><strong>Address:</strong> {s.address}</p>

                <p>
                  <strong>Completed By:</strong>{" "}
                  {s.assignedStaffName}
                </p>

                {s.mapLocation && (
                  <a
                    href={s.mapLocation}
                    target="_blank"
                    rel="noreferrer"
                    className="text-green-600 underline block mb-3"
                  >
                    Open Map Location
                  </a>
                )}

                {s.progressNote && (
                  <div className="bg-white p-4 rounded-lg mt-5">
                    <strong>Staff Note:</strong>
                    <p className="mt-2 text-gray-700">
                      {s.progressNote}
                    </p>
                  </div>
                )}

                {s.proofImage && (
                  <a
                    href={s.proofImage}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 underline block mt-4"
                  >
                    View Proof
                  </a>
                )}

              </div>
            ))
          )}

        </div>

      </div>

    </div>
  );
}