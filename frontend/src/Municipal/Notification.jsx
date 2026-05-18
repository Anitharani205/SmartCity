import React, { useState } from "react";
import MunicipalSidebar from "./components/MunicipalSidebar";

export default function notifications() {

  const [activeTab, setActiveTab] = useState("all");
  const [readAll, setReadAll] = useState(false);

  const markAllRead = () => {
    setReadAll(true);
    alert("All notifications marked as read");
  };

  const dispatchCrew = () => {
    alert("Crew dispatched to emergency location");
  };

  const viewMap = () => {
    window.open("https://maps.google.com", "_blank");
  };

  const viewTask = () => {
    alert("Opening task details page");
  };

  const setReminder = () => {
    alert("Reminder has been set for this task");
  };

  const updateNow = () => {
    alert("Opening update form");
  };

  const signDocument = () => {
    alert("Document signed successfully");
  };

  const viewLiveMap = () => {
    window.open("https://maps.google.com", "_blank");
  };
  return (
    <div className="flex h-screen bg-gray-100">

      <MunicipalSidebar/>

      <div className="flex-1 p-8 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">

          <div>
            <h1 className="text-3xl font-bold">Notifications</h1>
            <p className="text-gray-500 text-sm">
              Stay updated with the latest city activities and tasks.
            </p>
          </div>

          <button
            onClick={markAllRead}
            className="bg-gray-200 px-4 py-2 rounded-lg text-sm"
          >
            Mark all as read
          </button>

        </div>
        <div className="flex gap-8 border-b pb-2 mb-6 text-sm font-medium">

          <button
            onClick={()=>setActiveTab("all")}
            className={`pb-2 ${
              activeTab==="all"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500"
            }`}
          >
            All Notifications
          </button>

          <button
            onClick={()=>setActiveTab("admin")}
            className={`${
              activeTab==="admin"
              ? "text-blue-600 border-b-2 border-blue-600 pb-2"
              : "text-gray-500"
            }`}
          >
            Admin Alerts
          </button>

          <button
            onClick={()=>setActiveTab("task")}
            className={`${
              activeTab==="task"
              ? "text-blue-600 border-b-2 border-blue-600 pb-2"
              : "text-gray-500"
            }`}
          >
            Task Reminders
          </button>

        </div>
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 space-y-6">
            <div className="bg-white rounded-xl p-6 shadow border-l-4 border-red-500">

              <div className="flex justify-between">
                <h2 className="font-semibold text-lg">
                  Water Main Maintenance
                </h2>
                <p className="text-sm text-gray-400">5m ago</p>
              </div>

              <p className="text-gray-600 text-sm mt-2">
                Emergency repair required on 5th Ave. High priority.
                Main pipeline rupture reported at 08:45 AM.
              </p>

              <div className="flex gap-3 mt-4">

                <button
                  onClick={dispatchCrew}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm"
                >
                  Dispatch Crew
                </button>

                <button
                  onClick={viewMap}
                  className="bg-gray-200 px-4 py-2 rounded-lg text-sm"
                >
                  View Map
                </button>

              </div>

            </div>
            <div className="bg-white rounded-xl p-6 shadow border-l-4 border-blue-500">

              <div className="flex justify-between">
                <h2 className="font-semibold text-lg">
                  Plumber Booking
                </h2>
                <p className="text-sm text-gray-400">2h ago</p>
              </div>

              <p className="text-gray-600 text-sm mt-2">
                New booking request for City Hall repairs.
                Sink leak in the main lobby, Floor 1.
              </p>

              <div className="flex gap-3 mt-4">

                <button
                  onClick={viewTask}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm"
                >
                  View Task
                </button>

                <button
                  onClick={setReminder}
                  className="bg-gray-200 px-4 py-2 rounded-lg text-sm"
                >
                  Set Reminder
                </button>

              </div>

            </div>
            <div className="bg-white rounded-xl p-6 shadow border-l-4 border-orange-500">

              <p className="text-xs text-gray-400 uppercase">
                Overdue
              </p>

              <div className="flex justify-between mt-1">
                <h2 className="font-semibold text-lg">
                  Quarterly Safety Inspection
                </h2>
                <p className="text-sm text-gray-400">1d ago</p>
              </div>

              <p className="text-gray-600 text-sm mt-2">
                The safety audit for the Public Works department
                was due yesterday. Please update the status immediately.
              </p>

              <button
                onClick={updateNow}
                className="bg-orange-500 text-white px-4 py-2 rounded-lg mt-4 text-sm"
              >
                Update Now
              </button>

            </div>
            <div className="bg-white rounded-xl p-6 shadow border-l-4 border-blue-500">

              <div className="flex justify-between">
                <h2 className="font-semibold text-lg">
                  Permit Review
                </h2>
                <p className="text-sm text-gray-400">6h ago</p>
              </div>

              <p className="text-gray-600 text-sm mt-2">
                Commercial zoning permit #8829 is awaiting your
                signature for final approval.
              </p>

              <button
                onClick={signDocument}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg mt-4 text-sm"
              >
                Sign Document
              </button>

            </div>

          </div>
          <div className="space-y-6">

            <div className="bg-white rounded-xl p-6 shadow">

              <h2 className="font-semibold mb-4">
                Live City Activity Hub
              </h2>

              <button
                onClick={viewLiveMap}
                className="text-blue-600 text-sm mt-4"
              >
                View Live Map
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
