import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import MunicipalSidebar from "./components/MunicipalSidebar";
import API from "../services/api";

function DetailPage() {

  const location = useLocation();
  const navigate = useNavigate();

  const request = location.state;

  const [assignedStaff, setAssignedStaff] = useState("");

  if (!request) {
    return (
      <div className="flex justify-center items-center h-screen">
        No Request Found
      </div>
    );
  }



  const handleAssignTask = async () => {

  if (!assignedStaff) {
    alert("Select staff");
    return;
  }

  const emailMap = {
    Sarah: "sarah@municipal.com",
    David: "david@municipal.com",
    Michael: "michael@municipal.com"
  };

  await API.put(`/complaints/assign/${request.id}`, {
    assignedStaffName: assignedStaff,
    assignedStaffEmail: emailMap[assignedStaff]
  });

  alert("Task Assigned");
  navigate("/request");
};

  return (
    <div className="flex bg-gray-100 min-h-screen">

      <div className="fixed left-0 top-0 w-64 h-screen">
        <MunicipalSidebar />
      </div>

      <div className="flex-1 ml-64 p-8">

        <div className="bg-white rounded-2xl shadow p-8">

          <h1 className="text-3xl font-bold mb-8">
            Request Detail
          </h1>

          <div className="space-y-3">
            <p><strong>ID:</strong> {request.id}</p>
            <p><strong>Citizen:</strong> {request.citizen}</p>
            <p><strong>Service:</strong> {request.service}</p>
            <p><strong>Location:</strong> {request.location}</p>
            <p><strong>Status:</strong> {request.status}</p>
          </div>

          {/* STAFF DROPDOWN FIXED */}
          <div className="mt-8">
            <label className="font-semibold block mb-2">
              Assign Staff
            </label>

            <select
              value={assignedStaff}
              onChange={(e) => setAssignedStaff(e.target.value)}
              className="w-full border rounded-xl px-4 py-3"
            >
              <option value="">Select Staff</option>
              <option value="Sarah">Sarah - Plumbing Team</option>
              <option value="David">David - Electrical Team</option>
              <option value="Michael">Michael - Sanitation Team</option>
            </select>
          </div>

          <div className="flex gap-4 mt-10">

            <button
              onClick={handleAssignTask}
              className="bg-blue-600 text-white px-6 py-3 rounded-xl"
            >
              Assign Task
            </button>

            <button
              onClick={() => navigate("/request")}
              className="bg-gray-500 text-white px-6 py-3 rounded-xl"
            >
              Back
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}

export default DetailPage;