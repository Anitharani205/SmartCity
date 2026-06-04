import { useEffect, useState } from "react";
import API from "../services/api";
import AdminSidebar from "./components/AdminSidebar";

export default function Complaints() {

  const [complaints, setComplaints] = useState([]);
  const [staffOptions, setStaffOptions] =
  useState({});
  // PAGINATION
  const [currentPage, setCurrentPage] = useState(1);
  const complaintsPerPage = 5;

  

  useEffect(() => {
    loadComplaints();
  }, []);

   const loadStaffForComplaint = async (
  complaintId,
  category
) => {

  try {

    const res = await API.get(
      `/users/department/${category}`
    );

    setStaffOptions(prev => ({
      ...prev,
      [complaintId]: res.data
    }));

  } catch (err) {

    console.log(err);
  }
};
  // LOAD COMPLAINTS
  const loadComplaints = async () => {

    try {

     const res = await API.get("/complaints");

setComplaints(res.data);

res.data.forEach((c) => {

  loadStaffForComplaint(
    c.id,
    c.category
  );

});

    } catch (err) {

      console.log(err);
    }
  };

  // ASSIGN STAFF
  const assignTask = async (
  id,
  staff
) => {

  try {

    await API.put(
      `/complaints/assign/${id}`,
      {
        assignedStaffName:
          staff.name,
        assignedStaffEmail:
          staff.email
      }
    );

    alert(
      `Assigned to ${staff.name}`
    );

    loadComplaints();

  } catch (err) {

    console.log(err);

    alert("Assignment Failed");
  }
};

  // DELETE COMPLAINT
  const deleteComplaint = async (id) => {

    if (!id) {
      alert("Invalid ID");
      return;
    }

    const confirmDelete =
      window.confirm("Are you sure?");

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

  // PAGINATION LOGIC
  const indexOfLast =
    currentPage * complaintsPerPage;

  const indexOfFirst =
    indexOfLast - complaintsPerPage;

  const currentComplaints =
    complaints.slice(indexOfFirst, indexOfLast);

  const totalPages =
    Math.ceil(
      complaints.length / complaintsPerPage
    );

  return (

    <div className="flex bg-gray-100 min-h-screen">

      {/* SIDEBAR */}
      <div className="fixed left-0 top-0 h-screen w-64 bg-white shadow-lg z-50">
        <AdminSidebar />
      </div>

      {/* CONTENT */}
      <div className="flex-1 ml-64 p-8">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-8">

          <div>

            <h1 className="text-4xl font-bold text-gray-800">
              Complaint Management
            </h1>

            <p className="text-gray-500 mt-2">
              Assign municipal staff to citizen complaints
            </p>

          </div>

        </div>

        {/* TABLE CARD */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

          <div className="overflow-x-auto">

            <table className="w-full">

              {/* TABLE HEADER */}
              <thead className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">

                <tr>

                  <th className="p-4 text-left">
                    Complaint
                  </th>

                  <th className="p-4 text-left">
                    Citizen
                  </th>

                  <th className="p-4 text-left">
                    Address
                  </th>

                  <th className="p-4 text-left">
                    Status
                  </th>

                  <th className="p-4 text-left">
                    Assigned Staff
                  </th>

                  <th className="p-4 text-center">
                    Assign Task
                  </th>

                  <th className="p-4 text-center">
                    Delete
                  </th>

                </tr>

              </thead>

              {/* TABLE BODY */}
              <tbody>

                {currentComplaints.map((c) => (

                  <tr
                    key={c.id}
                    className="border-b hover:bg-gray-50 transition"
                  >

                    {/* COMPLAINT */}
                    <td className="p-4">

                      <div className="font-semibold text-gray-800">
                        {c.title}
                      </div>

                      <div className="text-sm text-gray-500">
                        {c.category}
                      </div>

                      <div className="text-xs text-gray-400 mt-1">
                        Priority: {c.priority}
                      </div>

                    </td>

                    {/* CITIZEN */}
                    <td className="p-4">

                      <div className="font-medium text-gray-800">
                        {c.citizenName}
                      </div>

                      <div className="text-sm text-gray-500">
                        {c.citizen}
                      </div>

                    </td>

                    {/* ADDRESS */}
                    <td className="p-4">

                      <div className="text-gray-700">
                        {c.address}
                      </div>

                      {c.mapLink && (

                        <a
                          href={c.mapLink}
                          target="_blank"
                          rel="noreferrer"
                          className="text-blue-600 underline text-sm"
                        >
                          Open Map
                        </a>

                      )}

                    </td>

                    {/* STATUS */}
                    <td className="p-4">

                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium
                        ${
                          c.status === "Resolved"
                            ? "bg-green-100 text-green-700"
                            : c.status === "In Progress"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {c.status}
                      </span>

                    </td>

                    {/* STAFF */}
                    <td className="p-4 text-gray-700">

                      {c.assignedStaffName ? (

                        <span className="font-medium">
                          {c.assignedStaffName}
                        </span>

                      ) : (

                        <span className="text-gray-400">
                          Not Assigned
                        </span>

                      )}

                    </td>

                    {/* ASSIGN */}
                    <td className="p-4 text-center">

                      <select
  defaultValue=""
  onChange={(e) => {

    const selected =
      staffOptions[c.id]
      ?.find(
        s =>
          s.id ===
          Number(
            e.target.value
          )
      );

    if (selected) {

      assignTask(
        c.id,
        selected
      );
    }

  }}
  className="border border-gray-300 rounded-lg px-3 py-2"
>

  <option value="">
    Select Staff
  </option>

  {
    staffOptions[c.id]?.map(
      (staff) => (

        <option
          key={staff.id}
          value={staff.id}
        >

          {staff.name}
          {" "}
          (
          {staff.activeTasks}
          {" "}
          Tasks
          )

        </option>

      )
    )
  }

</select>
                    </td>

                    {/* DELETE */}
                    <td className="p-4 text-center">

                      <button
                        onClick={() => deleteComplaint(c.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                      >
                        Delete
                      </button>

                    </td>

                  </tr>
                ))}

              </tbody>

            </table>

          </div>

          {/* PAGINATION */}
          <div className="flex justify-center items-center gap-2 p-5">

            {/* PREV */}
            <button
              disabled={currentPage === 1}
              onClick={() =>
                setCurrentPage(currentPage - 1)
              }
              className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
            >
              Prev
            </button>

            {/* PAGE NUMBERS */}
            {Array.from(
              { length: totalPages },
              (_, index) => (

                <button
                  key={index + 1}
                  onClick={() =>
                    setCurrentPage(index + 1)
                  }
                  className={`px-3 py-1 rounded border ${
                    currentPage === index + 1
                      ? "bg-blue-600 text-white"
                      : "bg-white hover:bg-gray-100"
                  }`}
                >
                  {index + 1}
                </button>

              )
            )}

            {/* NEXT */}
            <button
              disabled={currentPage === totalPages}
              onClick={() =>
                setCurrentPage(currentPage + 1)
              }
              className="px-3 py-1 bg-blue-600 text-white rounded disabled:opacity-50"
            >
              Next
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}
