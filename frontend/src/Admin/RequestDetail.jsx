import React, { useState } from "react";

import {
  Download,
  Edit,
  Bell,
  Clock,
  CheckCircle,
} from "lucide-react";

import AdminSidebar from "./components/AdminSidebar";

export default function RequestDetail() {

  const [selectedTech, setSelectedTech] =
    useState("Robert Fox");

  const [assignedStaff, setAssignedStaff] =
    useState(null);

  const [notification, setNotification] =
    useState("");

  const [status, setStatus] =
    useState("Pending Allocation");

  const [resolutionNotes, setResolutionNotes] =
    useState("");

  const [staffNotifications, setStaffNotifications] =
    useState([]);

  const timeline = [
    "Request Submitted",
    "Under Review",
    "Technician Selection",
    "Work In Progress",
  ];

  const technicians = [
    {
      name: "Robert Fox",
      role: "Master Plumber",
      distance: "2km away",
      workload: "Low Workload",
      recommended: true,
    },

    {
      name: "Jane Cooper",
      role: "Senior Technician",
      distance: "5km away",
      workload: "High Workload",
      recommended: false,
    },

    {
      name: "Michael Lee",
      role: "Water Systems Expert",
      distance: "3km away",
      workload: "Moderate Workload",
      recommended: false,
    },
  ];

  const handleAssign = (name) => {

    setAssignedStaff(name);

    setStatus("Assigned");

    setNotification(
      `✅ ${name} assigned successfully`
    );

    setStaffNotifications((prev) => [
      {
        staff: name,
        message:
          `New Water Leakage request assigned to ${name}`,
        time: new Date().toLocaleTimeString(),
      },

      ...prev,
    ]);

    setTimeout(() => {
      setNotification("");
    }, 3000);
  };

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">

      <AdminSidebar />

      <div className="flex-1 flex flex-col overflow-auto">

        {/* HEADER */}

        <div className="bg-white border-b p-5 flex justify-between items-center">

          <div>

            <p className="text-sm text-gray-500">
              Dashboard › Service Requests ›
              Request #SR-1205
            </p>

            <div className="flex items-center gap-3 mt-2">

              <h2 className="text-3xl font-bold">
                Request #SR-1205
              </h2>

              <span
                className={`px-4 py-1 rounded-full text-sm font-medium ${
                  status === "Assigned"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {status}
              </span>

              <span className="bg-red-100 text-red-700 px-4 py-1 rounded-full text-sm font-medium">
                Urgent Priority
              </span>

            </div>

            <p className="text-gray-500 mt-2">
              Water Leakage Report
            </p>

          </div>

          <div className="flex gap-3">

            <button className="flex items-center gap-2 bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300">

              <Download size={18} />

              Export Report

            </button>

            <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">

              <Edit size={18} />

              Edit Request

            </button>

          </div>

        </div>

        {/* NOTIFICATIONS */}

        <div className="p-6 pb-0">

          {notification && (

            <div className="bg-blue-100 text-blue-700 px-4 py-3 rounded-xl mb-4">

              {notification}

            </div>

          )}

          {assignedStaff && (

            <div className="bg-green-100 text-green-700 px-4 py-3 rounded-xl">

              Assigned Technician:

              <span className="font-semibold ml-2">
                {assignedStaff}
              </span>

            </div>

          )}

        </div>

        {/* BODY */}

        <div className="flex gap-6 p-6">

          {/* LEFT SIDE */}

          <div className="flex-1 space-y-6">

            {/* BOOKING DETAILS */}

            <Card title="Request Details">

              <div className="grid grid-cols-2 gap-6">

                <Info
                  label="Citizen"
                  value="Johnathan Doe"
                />

                <Info
                  label="Service Type"
                  value="Water Leakage Report"
                />

                <Info
                  label="Booking Slot"
                  value="09:00 AM - 11:00 AM"
                />

                <Info
                  label="Location"
                  value="123 Maple Avenue, Sector 4"
                />

                <Info
                  label="Reported Date"
                  value="20 May 2026"
                />

                <Info
                  label="Last Updated"
                  value="21 May 2026"
                />

              </div>

            </Card>

            {/* PROBLEM DESCRIPTION */}

            <Card title="Problem Description">

              <p className="text-gray-700 leading-relaxed mb-5">

                There is a major water leak coming
                from the main pipe near the driveway.
                Water is flooding the sidewalk and
                creating danger for pedestrians.

              </p>

              <img
                src="https://images.unsplash.com/photo-1606857521015-7f9fcf423740"
                alt="Water Leakage"
                className="rounded-2xl w-full h-80 object-cover"
              />

            </Card>

            {/* TIMELINE */}

            <Card title="Request Timeline">

              <div className="space-y-5">

                {timeline.map((step, index) => (

                  <div
                    key={index}
                    className="flex items-center gap-4"
                  >

                    <div className="w-4 h-4 bg-blue-600 rounded-full"></div>

                    <p className="font-medium">
                      {step}
                    </p>

                  </div>

                ))}

              </div>

            </Card>

            {/* RESOLUTION NOTES */}

            <Card title="Resolution Notes">

              <textarea
                value={resolutionNotes}
                onChange={(e) =>
                  setResolutionNotes(
                    e.target.value
                  )
                }
                placeholder="Enter final resolution notes..."
                className="w-full border rounded-xl p-4 h-40 outline-none focus:ring-2 focus:ring-blue-400"
              />

              <button className="mt-4 bg-black text-white px-5 py-3 rounded-xl hover:bg-gray-800">

                Save Notes

              </button>

            </Card>

            {/* MUNICIPAL NOTIFICATIONS */}

            <Card title="Municipal Notifications">

              {staffNotifications.length === 0 ? (

                <p className="text-gray-500">
                  No notifications yet
                </p>

              ) : (

                <div className="space-y-4">

                  {staffNotifications.map(
                    (n, index) => (

                      <div
                        key={index}
                        className="bg-blue-50 border border-blue-200 rounded-xl p-4"
                      >

                        <div className="flex items-center gap-2 mb-2">

                          <Bell
                            size={16}
                            className="text-blue-600"
                          />

                          <p className="font-semibold">
                            {n.staff}
                          </p>

                        </div>

                        <p className="text-sm text-gray-700">
                          {n.message}
                        </p>

                        <p className="text-xs text-gray-400 mt-2">
                          {n.time}
                        </p>

                      </div>

                    )
                  )}

                </div>

              )}

            </Card>

          </div>

          {/* RIGHT SIDE */}

          <div className="w-96 space-y-6">

            {/* STATUS */}

            <Card title="Update Request Status">

              <select
                value={status}
                onChange={(e) =>
                  setStatus(e.target.value)
                }
                className="w-full border rounded-xl p-3 mb-4"
              >

                <option>
                  Pending Allocation
                </option>

                <option>Assigned</option>

                <option>
                  Work In Progress
                </option>

                <option>Resolved</option>

              </select>

              <button className="w-full bg-black text-white py-3 rounded-xl">

                Update Status

              </button>

            </Card>

            {/* STAFF */}

            <Card title="Staff Allocation">

              <p className="text-sm text-gray-500 mb-5">

                Select technician for assignment

              </p>

              {technicians.map((tech, index) => (

                <Technician
                  key={index}
                  name={tech.name}
                  role={tech.role}
                  distance={tech.distance}
                  workload={tech.workload}
                  recommended={tech.recommended}
                  selectedTech={selectedTech}
                  setSelectedTech={setSelectedTech}
                  handleAssign={handleAssign}
                />

              ))}

            </Card>

          </div>

        </div>

      </div>

    </div>
  );
}

/* CARD */

function Card({ title, children }) {

  return (

    <div className="bg-white rounded-2xl shadow-sm p-6">

      <h3 className="text-xl font-semibold mb-5">
        {title}
      </h3>

      {children}

    </div>

  );
}

/* INFO */

function Info({ label, value }) {

  return (

    <div>

      <p className="text-gray-500 text-sm">
        {label}
      </p>

      <p className="font-medium mt-1">
        {value}
      </p>

    </div>

  );
}

/* TECHNICIAN CARD */

function Technician({
  name,
  role,
  distance,
  workload,
  recommended,
  selectedTech,
  setSelectedTech,
  handleAssign,
}) {

  const active = selectedTech === name;

  return (

    <div
      onClick={() => setSelectedTech(name)}
      className={`border rounded-2xl p-4 mb-4 transition cursor-pointer ${
        active
          ? "border-blue-600 bg-blue-50"
          : "border-gray-200 hover:border-blue-300"
      }`}
    >

      <div className="flex justify-between items-start">

        <div>

          <p className="font-semibold">
            {name}
          </p>

          <p className="text-sm text-gray-500">
            {role}
          </p>

        </div>

        {recommended && (

          <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full">

            Recommended

          </span>

        )}

      </div>

      <div className="text-sm text-gray-500 mt-3 flex items-center gap-2">

        <Clock size={14} />

        {distance} • {workload}

      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          handleAssign(name);
        }}
        className="mt-5 w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700"
      >

        <CheckCircle size={16} className="inline mr-2" />

        Assign {name}

      </button>

    </div>

  );
}