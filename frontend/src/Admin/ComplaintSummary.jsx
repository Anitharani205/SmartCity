import React, { useState } from "react";

import {
  Download,
  Printer,
  Save,
  AlertTriangle,
} from "lucide-react";

import AdminSidebar from "./components/AdminSidebar";

export default function ComplaintSummary({

  complaint = {
    id: "CMP-1205",
    status: "Pending",
    assignedTo: "Roads Team",
    resolution: "",
    reportedBy: "John Doe",
    category: "Water Leakage",
    priority: "High",
    location: "123 Maple Avenue",
    reportedDate: "20 May 2026",
    updatedDate: "21 May 2026",
    title: "Major Water Leakage",
    image:
      "data:image/jpeg;base64,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",
  },

  goBack = () => window.history.back(),

}) {

  

  const [status, setStatus] =
    useState(complaint.status);

  const [assignedTeam, setAssignedTeam] =
    useState(complaint.assignedTo);

  const [resolution, setResolution] =
    useState(complaint.resolution);

  const [escalationReason, setEscalationReason] =
    useState("");

  const [notification, setNotification] =
    useState("");

  const [timeline, setTimeline] = useState([
    "Complaint Submitted",
    "Under Review",
    "Assigned Team",
    "Processing",
  ]);

  

  const handleAssignTeam = () => {

    setNotification(
      `✅ Assigned to ${assignedTeam}`
    );

    setTimeline((prev) => [
      ...prev,
      `Assigned to ${assignedTeam}`,
    ]);

    alert(
      `Complaint assigned to ${assignedTeam}`
    );

    setTimeout(() => {
      setNotification("");
    }, 3000);
  };



  const handleEscalate = () => {

    if (!escalationReason.trim()) {

      alert(
        "Please enter escalation reason"
      );

      return;
    }

    setStatus("Escalated");

    setTimeline((prev) => [
      ...prev,
      `Complaint Escalated - ${escalationReason}`,
    ]);

    setNotification(
      "🚨 Complaint escalated successfully"
    );

    alert("Complaint escalated");

    setEscalationReason("");

    setTimeout(() => {
      setNotification("");
    }, 3000);
  };

  

  const handleSaveChanges = () => {

    setTimeline((prev) => [
      ...prev,
      `Status changed to ${status}`,
    ]);

    setNotification(
      `✅ Status updated to ${status}`
    );

    alert(
      `Status updated to ${status}`
    );

    setTimeout(() => {
      setNotification("");
    }, 3000);
  };



  const handleSaveResolution = () => {

    setTimeline((prev) => [
      ...prev,
      "Resolution notes updated",
    ]);

    setNotification(
      "✅ Resolution notes saved"
    );

    alert(
      "Resolution notes saved successfully"
    );

    setTimeout(() => {
      setNotification("");
    }, 3000);
  };

  

  const handlePrint = () => {
    window.print();
  };

  

  const handleExport = () => {

    const report = `
Complaint ID : ${complaint.id}

Status : ${status}

Assigned Team : ${assignedTeam}

Reported By : ${complaint.reportedBy}

Category : ${complaint.category}

Priority : ${complaint.priority}

Location : ${complaint.location}

Resolution :
${resolution}
`;

    const blob = new Blob(
      [report],
      { type: "text/plain" }
    );

    const link =
      document.createElement("a");

    link.href =
      URL.createObjectURL(blob);

    link.download =
      `${complaint.id}-report.txt`;

    link.click();

    setNotification(
      "📄 Report exported successfully"
    );

    setTimeout(() => {
      setNotification("");
    }, 3000);
  };

  return (

    <div className="flex h-screen bg-gray-100">

      <AdminSidebar />

      <div className="flex-1 overflow-auto p-6">

      

        <div className="flex justify-between items-center mb-6">

          <div className="flex items-center gap-4">

            <button
              onClick={goBack}
              className="text-blue-600 font-medium hover:underline"
            >
              ← Back
            </button>

            <h2 className="text-2xl font-bold">
              {complaint.id}
            </h2>

            <span
              className={`px-3 py-1 rounded-full font-medium
              ${
                status === "Escalated"
                  ? "bg-red-100 text-red-700"
                  : status === "Pending"
                  ? "bg-yellow-100 text-yellow-700"
                  : status === "Resolved"
                  ? "bg-green-100 text-green-700"
                  : "bg-blue-100 text-blue-700"
              }`}
            >
              {status}
            </span>

          </div>

          <div className="flex gap-3">

            <button
              onClick={handleExport}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >

              <Download size={18} />

              Export

            </button>

            <button
              onClick={handlePrint}
              className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800"
            >

              <Printer size={18} />

              Print Report

            </button>

          </div>

        </div>

        

        {notification && (

          <div className="bg-green-100 text-green-700 px-4 py-3 rounded-xl mb-5">

            {notification}

          </div>

        )}

        

        <div className="grid grid-cols-3 gap-6">

          

          <div className="col-span-2 space-y-6">

            

            <div className="bg-white p-6 rounded-2xl shadow">

              <h3 className="text-xl font-semibold mb-5">
                Complaint Details
              </h3>

              <div className="grid grid-cols-2 gap-6">

                <Info
                  label="Reported By"
                  value={complaint.reportedBy}
                />

                <Info
                  label="Category"
                  value={complaint.category}
                />

                <Info
                  label="Priority"
                  value={complaint.priority}
                />

                <Info
                  label="Location"
                  value={complaint.location}
                />

                <Info
                  label="Reported Date"
                  value={complaint.reportedDate}
                />

                <Info
                  label="Last Updated"
                  value={complaint.updatedDate}
                />

              </div>

              <div className="mt-6">

                <p className="text-gray-500 mb-2">
                  Description
                </p>

                <p>
                  {complaint.title} reported at{" "}
                  {complaint.location}.
                </p>

              </div>

              <img
                src={complaint.image}
                alt="Complaint"
                className="mt-6 rounded-xl w-full h-72 object-cover"
              />

            </div>

          

            <div className="bg-white p-6 rounded-2xl shadow">

              <h3 className="font-semibold text-lg mb-4">
                Complaint Timeline
              </h3>

              <div className="space-y-4">

                {timeline.map((step, index) => (

                  <div
                    key={index}
                    className="flex items-center gap-4"
                  >

                    <div className="w-4 h-4 bg-blue-600 rounded-full"></div>

                    <p>{step}</p>

                  </div>

                ))}

              </div>

            </div>

           
            <div className="bg-white p-6 rounded-2xl shadow">

              <h3 className="font-semibold text-lg mb-4">
                Resolution Notes
              </h3>

              <textarea
                value={resolution}
                onChange={(e) =>
                  setResolution(
                    e.target.value
                  )
                }
                placeholder="Enter resolution notes..."
                className="w-full border rounded-lg p-3 h-32 outline-none focus:ring-2 focus:ring-blue-400"
              />

              <button
                onClick={handleSaveResolution}
                className="mt-4 flex items-center gap-2 bg-black text-white px-5 py-3 rounded-lg hover:bg-gray-800"
              >

                <Save size={18} />

                Save Notes

              </button>

            </div>

          </div>

  

          <div className="space-y-6">

         

            <div className="bg-white p-5 rounded-2xl shadow">

              <h3 className="font-semibold mb-4">
                Assign Department
              </h3>

              <select
                value={assignedTeam}
                onChange={(e) =>
                  setAssignedTeam(
                    e.target.value
                  )
                }
                className="w-full border p-3 rounded-lg mb-4"
              >

                <option>
                  Roads Team
                </option>

                <option>
                  Electric Team
                </option>

                <option>
                  Cleaning Unit
                </option>

              </select>

              <button
                onClick={handleAssignTeam}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
              >
                Assign Team
              </button>

            </div>

         

            <div className="bg-white p-5 rounded-2xl shadow">

              <h3 className="font-semibold mb-4 flex items-center gap-2">

                <AlertTriangle size={18} />

                Escalation Panel

              </h3>

              <textarea
                value={escalationReason}
                onChange={(e) =>
                  setEscalationReason(
                    e.target.value
                  )
                }
                placeholder="Enter escalation reason..."
                className="w-full border p-3 rounded-lg mb-4 outline-none focus:ring-2 focus:ring-red-400"
              />

              <button
                onClick={handleEscalate}
                className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600"
              >
                Escalate Complaint
              </button>

            </div>

        

            <div className="bg-white p-5 rounded-2xl shadow">

              <h3 className="font-semibold mb-4">
                Update Status
              </h3>

              <select
                value={status}
                onChange={(e) =>
                  setStatus(
                    e.target.value
                  )
                }
                className="w-full border p-3 rounded-lg mb-4"
              >

                <option>New</option>

                <option>Pending</option>

                <option>Escalated</option>

                <option>Resolved</option>

              </select>

              <button
                onClick={handleSaveChanges}
                className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800"
              >
                Save Changes
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>

  );
}


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