import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import AdminSidebar from "./components/AdminSidebar";

export default function Complaints() {
  const navigate = useNavigate();
  const [complaints, setComplaints] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const complaintsPerPage = 5;

  useEffect(() => {
  loadComplaints();
  loadStaff();
}, []);
  

  const loadComplaints = async () => {
  try {
    const res = await API.get("/complaints");
    setComplaints(res.data);
  } catch (err) {
    console.log(err);
  }
};
 const loadStaff = async () => {
  try {
    const res = await API.get("/users");

    const municipalStaff = res.data.filter(
      (u) => u.role === "MUNICIPAL"
    );

    setAllUsers(municipalStaff);
  } catch (err) {
    console.log(err);
  }
};

 const assignTask = async (id, staff) => {
  try {
    const res = await API.put(`/complaints/assign/${id}`, {
      assignedStaffName: staff.name,
      assignedStaffEmail: staff.email,
    });

    console.log("Response:", res.data); // 👈 check response

    alert(`Assigned to ${staff.name}`);

  } catch (err) {
    console.log("ERROR:", err.response?.data || err.message);
    alert("Assignment Failed");
  }
};
  const deleteComplaint = async (id) => {
    if (!id) return;

    const confirmDelete = window.confirm("Are you sure?");
    if (!confirmDelete) return;

    try {
      await API.delete(`/complaints/${id}`);
      alert("Deleted Successfully");
      loadComplaints();
    } catch (err) {
      console.log(err);
      alert("Delete Failed");
    }
  };

  const indexOfLast = currentPage * complaintsPerPage;
  const indexOfFirst = indexOfLast - complaintsPerPage;
  const currentComplaints = complaints.slice(indexOfFirst, indexOfLast);

  
  const totalPages = Math.max(
    5,
    Math.ceil(complaints.length / complaintsPerPage)
  );
  const getStaffByCategory = (category) => {
  let department = "";

  switch (category) {
    case "Water Issue":
    case "Plumbing":
      department = "Water";
      break;

    case "Electricity Issue":
    case "Electrical":
    case "Appliance Repair":
    case "AC Service":
      department = "Electrical";
      break;

    case "Road Issue":
      department = "Road";
      break;

    case "Drainage Issue":
      department = "Drainage";
      break;

    case "Garbage Issue":
    case "Cleaning":
    case "Gardening":
    case "Pest Control":
      department = "Sanitation";
      break;

    default:
      department = "General";
  }

  return allUsers
    .filter((u) => u.department === department)
    .sort((a, b) => (a.activeTasks || 0) - (b.activeTasks || 0));
};

  return (
    
    <div className="flex bg-gray-100 min-h-screen">

     
      <div className="fixed left-0 top-0 h-screen w-64 bg-white shadow-lg z-50">
        <AdminSidebar />
      </div>

      <div className="flex-1 ml-64 p-8">

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800">
            Complaint Management
          </h1>
          <p className="text-gray-500 mt-2">
            Assign municipal staff to citizen complaints
          </p>
        </div>

       
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

          <div className="overflow-x-auto">
            <table className="w-full">

              <thead className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                <tr>
                  <th className="p-4 text-left">Complaint</th>
                  <th className="p-4 text-left">Citizen</th>
                  <th className="p-4 text-left">Address</th>
                  <th className="p-4 text-left">Status</th>
                  <th className="p-4 text-left">Assigned Staff</th>
                  <th className="p-4 text-center">Assign Task</th>
                 <th className="p-4 text-center">View</th>
                </tr>
              </thead>

              <tbody>
                {currentComplaints.map((c) => (
                  <tr key={c.id} className="border-b hover:bg-gray-50">

                    <td className="p-4">
                      <div className="font-semibold">{c.title}</div>
                      <div className="text-sm text-gray-500">{c.category}</div>
                    </td>

                    <td className="p-4">
                      <div>{c.citizenName}</div>
                      <div className="text-sm text-gray-500">{c.citizen}</div>
                    </td>

                    <td className="p-4">
                      <div>{c.address}</div>
                    </td>
                   

                    <td className="p-4">
                      <span className="px-3 py-1 rounded-full text-sm bg-gray-200">
                        {c.status}
                      </span>
                    </td>

                   
  <td className="p-4">
  {c.assignedStaffName || (
    <span className="text-gray-400">Not Assigned</span>
  )}

</td>

                    <td className="p-4 text-center">
                    <select
  defaultValue=""
  onChange={(e) => {
    const selected = getStaffByCategory(c.category).find(
      (s) => String(s.id) === e.target.value
    );

    if (selected) {
      assignTask(c.id, selected);
    }
  }}
  className="border px-3 py-2 rounded"
>
  <option value="">Select Staff</option>

  {getStaffByCategory(c.category).map((staff) => (
    <option key={staff.id} value={staff.id}>
      {staff.name}  - {staff.activeTasks || 0}
    </option>
  ))}
</select> 
                     
                    </td>

                  <td className="p-4 text-center">
  <button
    onClick={() => navigate(`/admin/complaint/${c.id}`)}
    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
  >
    View
  </button>
</td>

                  </tr>
                ))}
              </tbody>

            </table>
          </div>

          <div className="flex justify-between items-center p-5 border-t bg-gray-50">

            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
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
              onClick={() => setCurrentPage(currentPage + 1)}
              className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
            >
              Next
            </button>

          </div>

        </div>
      </div>
    </div>
  );
}