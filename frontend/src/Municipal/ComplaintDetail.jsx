import { useState } from "react";
import { useNavigate } from "react-router-dom";

import MunicipalSidebar from "./components/MunicipalSidebar";

import {
  ArrowLeft,
  MapPin,
  Share2,
  Paperclip
} from "lucide-react";


function Header() {

  const navigate = useNavigate();

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Complaint link copied!");
  };

  return (
    <div className="flex justify-between items-center mb-6">

      <div className="flex items-center gap-3">

        <ArrowLeft
          className="text-xl cursor-pointer"
          onClick={() => navigate(-1)}
        />

        <h1 className="text-xl font-semibold">
          Complaint Details
        </h1>

      </div>

      <div className="flex items-center gap-4">

        <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">
          Modified: 2h ago
        </span>

        <Share2
          className="text-gray-600 cursor-pointer"
          onClick={handleShare}
        />

      </div>

    </div>
  );
}


function ComplaintCard() {

  const openMap = () => {
    window.open(
      "https://www.google.com/maps/search/?api=1&query=124+Main+St",
      "_blank"
    );
  };

  return (
    <div className="bg-white rounded-xl shadow p-6">

      <div className="flex justify-between items-start mb-4">

        <div>

          <h2 className="text-xl font-semibold flex items-center gap-3">

            #CZ-1092

            <span className="bg-red-100 text-red-600 text-xs px-3 py-1 rounded-full">
              HIGH PRIORITY
            </span>

          </h2>

          <div className="text-sm text-gray-500 mt-2 flex gap-4">
            <span>💧 Water Supply</span>
            <span>📅 Filed: Oct 24, 2023</span>
          </div>

        </div>

        <button
          onClick={openMap}
          className="text-blue-600 flex items-center gap-2 text-sm"
        >
          <MapPin size={16}/> View Location on Map
        </button>

      </div>

      <div className="mb-6">

        <h3 className="font-semibold text-sm mb-2">
          USER DESCRIPTION
        </h3>

        <p className="text-gray-600 text-sm leading-relaxed">

          Large water leak reported on Main St. affecting multiple households.
          Pressure is significantly dropped. Resident reports water pooling near
          the main intersection for several hours.

        </p>

      </div>

      <div>

        <h3 className="font-semibold text-sm mb-3">
          EVIDENCE
        </h3>

        <img
          src="https://images.unsplash.com/photo-1506521781263-d8422e82f27a"
          className="rounded-lg w-full h-80 object-cover"
          alt="evidence"
        />

      </div>

    </div>
  );
}


function WorkflowPanel() {

  const [status, setStatus] = useState("In Progress");
  const [notes, setNotes] = useState("");

  const handleUpdate = () => {
    alert(`Status updated to: ${status}`);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      alert(`File "${file.name}" uploaded successfully`);
    }
  };

  const openMap = () => {
    window.open(
      "https://www.google.com/maps/search/?api=1&query=124+Main+St",
      "_blank"
    );
  };

  return (
    <div className="space-y-6">

      <div className="bg-white rounded-xl shadow p-5">

        <h3 className="font-semibold mb-4">
          WORKFLOW STATUS
        </h3>

        <label className="text-sm text-gray-500">
          Current Status
        </label>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full border rounded-lg p-2 mt-1 mb-4"
        >
          <option>In Progress</option>
          <option>Open</option>
          <option>Resolved</option>
        </select>

        <label className="text-sm text-gray-500">
          Staff Resolution Notes
        </label>

        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Add updates or notes for internal staff..."
          className="w-full border rounded-lg p-3 mt-1 h-28"
        />

        <button
          onClick={handleUpdate}
          className="w-full bg-blue-600 text-white py-2 rounded-lg mt-4"
        >
          Update Status
        </button>

        <label className="w-full border py-2 rounded-lg mt-3 flex items-center justify-center gap-2 cursor-pointer">
          <Paperclip size={16}/> Add File
          <input
            type="file"
            className="hidden"
            onChange={handleFileUpload}
          />
        </label>

      </div>


      <div className="bg-white rounded-xl shadow overflow-hidden">

        <img
          src="https://maps.gstatic.com/tactile/basepage/pegman_sherlock.png"
          className="w-full h-40 object-cover"
          alt="map"
        />

        <div className="p-4 flex justify-between text-sm">

          <span>124 Main St.</span>

          <span
            onClick={openMap}
            className="text-blue-600 cursor-pointer"
          >
            OPEN MAP
          </span>

        </div>

      </div>

    </div>
  );
}


export default function ComplaintDetail() {

  return (
    <div className="flex bg-gray-50 min-h-screen">

      <MunicipalSidebar />

      <div className="flex-1 p-8">

        <Header />

        <div className="grid grid-cols-3 gap-6">

          <div className="col-span-2">
            <ComplaintCard />
          </div>

          <div>
            <WorkflowPanel />
          </div>

        </div>

      </div>

    </div>
  );
}
