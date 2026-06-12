import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import AdminSidebar from "./components/AdminSidebar";

export default function ComplaintDetails() {
  const { id } = useParams();
  const [complaint, setComplaint] = useState(null);

  useEffect(() => {
    loadComplaint();
  }, []);

  const loadComplaint = async () => {
    try {
      const res = await API.get(`/complaints/${id}`);
      setComplaint(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  if (!complaint) return <h2>Loading...</h2>;

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <div className="fixed left-0 top-0 h-screen w-64 bg-white shadow-lg">
        <AdminSidebar />
      </div>

      <div className="flex-1 ml-64 p-8">
        <div className="bg-white rounded-xl shadow-lg p-8">

          <h1 className="text-3xl font-bold mb-6">
            Complaint Details
          </h1>

          <div className="space-y-4">

            <p><strong>Title:</strong> {complaint.title}</p>
            <p>
  <strong>Description:</strong> {complaint.description}
</p>

            <p><strong>Category:</strong> {complaint.category}</p>

            <p><strong>Citizen Name:</strong> {complaint.citizenName}</p>

           

            <p><strong>Address:</strong> {complaint.address}</p>

          {complaint.image && (
  <div>
    <strong>Complaint Image:</strong>
    <img
      src={complaint.image}
      alt="Complaint"
      className="mt-2 w-96 rounded-lg border shadow"
    />
  </div>
)}

            <p><strong>Status:</strong> {complaint.status}</p>

            <p>
              <strong>Assigned Staff:</strong>{" "}
              {complaint.assignedStaffName || "Not Assigned"}
            </p>

         
            {complaint.mapLink && (
              <p>
                <strong>Location:</strong>{" "}
                <a
                  href={complaint.mapLink}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 underline"
                >
                  View Map
                </a>
              </p>
            )}

          </div>

        </div>
      </div>
    </div>
  );
}