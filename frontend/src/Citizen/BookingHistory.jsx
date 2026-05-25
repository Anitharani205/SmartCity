import React, { useEffect, useState } from "react";
import API from "../services/api";

export default function BookingHistory() {

  const [services, setServices] = useState([]);

  // LOAD SERVICES
  const loadServices = async () => {

    try {

      const email =
        localStorage.getItem("email");

      const res = await API.get(
        `/services/citizen/${email}`
      );

      console.log("SERVICE HISTORY:", res.data);

      setServices(res.data);

    } catch (err) {

      console.log(err);
    }
  };

  // AUTO REFRESH
  useEffect(() => {

    loadServices();

    const interval = setInterval(() => {
      loadServices();
    }, 5000);

    return () => clearInterval(interval);

  }, []);

  // FILTERS
  const pendingServices = services.filter(
    (s) => s.status !== "Resolved"
  );

  const resolvedServices = services.filter(
    (s) => s.status === "Resolved"
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      <h1 className="text-3xl font-bold mb-8">
        Service Booking History
      </h1>

      {/* PENDING */}
      <h2 className="text-2xl font-semibold mb-4">
        Pending Services
      </h2>

      <div className="space-y-4 mb-10">

        {pendingServices.length === 0 ? (

          <div className="bg-white p-5 rounded shadow">
            No Pending Services
          </div>

        ) : (

          pendingServices.map((s) => (

            <div
              key={s.id || s._id}
              className="bg-white p-5 rounded shadow"
            >

              <h3 className="text-xl font-bold mb-2">
                {s.service}
              </h3>

              <p>
                <strong>Location:</strong>
                {" "} {s.location}
              </p>

              <p>
                <strong>Status:</strong>
                {" "} {s.status}
              </p>

              <p>
                <strong>Date:</strong>
                {" "} {s.date}
              </p>

            </div>
          ))
        )}

      </div>

      {/* RESOLVED */}
      <h2 className="text-2xl font-semibold mb-4">
        Resolved Services
      </h2>

      <div className="space-y-4">

        {resolvedServices.length === 0 ? (

          <div className="bg-white p-5 rounded shadow">
            No Resolved Services
          </div>

        ) : (

          resolvedServices.map((s) => (

            <div
              key={s.id || s._id}
              className="bg-green-50 p-5 rounded shadow"
            >

              <h3 className="text-xl font-bold mb-2">
                {s.service}
              </h3>

              <p>
                <strong>Location:</strong>
                {" "} {s.location}
              </p>

              <p>
                <strong>Status:</strong>
                {" "} {s.status}
              </p>

              <p>
                <strong>Date:</strong>
                {" "} {s.date}
              </p>

              {/* NOTE */}
              {s.progressNote && (

                <div className="bg-white p-3 rounded mt-4">

                  <strong>Staff Note:</strong>

                  <p>{s.progressNote}</p>

                </div>
              )}

              {/* PROOF */}
              {s.proofImage && (

                <a
                  href={s.proofImage}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 underline block mt-3"
                >
                  View Proof
                </a>
              )}

            </div>
          ))
        )}

      </div>

    </div>
  );
}