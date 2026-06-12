import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";
import AdminSidebar from "./components/AdminSidebar";

export default function ServiceDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);

  useEffect(() => {
    loadService();
  }, []);

  const loadService = async () => {
  try {
    const res = await API.get(`/services/details/${id}`);
    console.log(res.data);

    if (res.data) {
      setService(res.data);
    } else {
      alert("Service not found");
    }
  } catch (err) {
    console.log(err);
    alert("Error loading service");
  }
};

  if (!service) return <h2>Loading...</h2>;

  return (
    <div className="flex bg-gray-100 min-h-screen">

      <div className="fixed left-0 top-0 h-screen w-64 bg-white shadow-lg">
        <AdminSidebar />
      </div>

      <div className="flex-1 ml-64 p-8">

        <div className="bg-white rounded-xl shadow-lg p-8">

          <h1 className="text-3xl font-bold mb-6">
            Service Details
          </h1>

          <div className="space-y-4">

            <p><strong>Service:</strong> {service.service}</p>

            <p><strong>Citizen:</strong> {service.citizenName}</p>

            <p><strong>Email:</strong> {service.citizen}</p>

            <p><strong>Address:</strong> {service.address}</p>

            <p><strong>Date:</strong> {service.date}</p>

            <p><strong>Status:</strong> {service.status}</p>
           {service.citizenImage && (
  <img
    src={
      service.citizenImage.startsWith("http")
        ? service.citizenImage
        : `http://localhost:8082/uploads/${service.citizenImage}`
    }
    alt="Service"
    className="mt-2 w-96 rounded-lg border shadow"
  />
)}


            <p>
              <strong>Assigned Staff:</strong>{" "}
              {service.assignedStaffName || "Not Assigned"}
            </p>

           {service.mapLink && (
            <p>
     <strong>
          View Map :
          </strong>
  <a
    href={service.mapLink}
    target="_blank"
    rel="noreferrer"
    className="text-green-600 underline"
  >
    Open Location
  </a>
  </p>
)}

            <div className="mt-4">
              <button
                onClick={() => navigate("/adminservices")}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Back
              </button>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}