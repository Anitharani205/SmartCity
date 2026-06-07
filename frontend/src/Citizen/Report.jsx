import React, { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";

export default function Report() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    citizenName: "",
    category: "",
    title: "",
    address: "",
    mapLink: "",
    latitude: "",
    longitude: "",
    priority: "Low"
  });

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        setForm((prev) => ({
          ...prev,
          latitude: lat,
          longitude: lng,
          mapLink: `https://www.google.com/maps?q=${lat},${lng}`
        }));

        alert("Location captured successfully");
      },
      (error) => {
        console.log(error);
        alert("Unable to fetch location");
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/complaints", {
        ...form,
        citizen: localStorage.getItem("email")
      });

      alert("Complaint Submitted Successfully!");

      setForm({
        citizenName: "",
        category: "",
        title: "",
        address: "",
        mapLink: "",
        latitude: "",
        longitude: "",
        priority: "Low"
      });

      navigate("/citizen");
    } catch (err) {
      console.log(err);
      alert("Failed to submit complaint");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Sidebar />

      <div className="ml-64 p-6">
        <h2 className="text-2xl font-bold mb-6">
          Report Complaint
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            placeholder="Citizen Name"
            value={form.citizenName}
            className="border p-3 w-full rounded"
            onChange={(e) =>
              setForm({
                ...form,
                citizenName: e.target.value
              })
            }
          />

          <select
            value={form.category}
            className="border p-3 w-full rounded"
            onChange={(e) =>
              setForm({
                ...form,
                category: e.target.value
              })
            }
          >
            <option value="">Select Complaint Category</option>
            <option value="Water Issue">Water Issue</option>
            <option value="Road Issue">Road Issue</option>
            <option value="Electricity Issue">Electricity Issue</option>
            <option value="Garbage Issue">Garbage Issue</option>
            <option value="Drainage Issue">Drainage Issue</option>
            <option value="Traffic Issue">Traffic Issue</option>
            <option value="Public Property Damage">
              Public Property Damage
            </option>
            <option value="Stray Animal Issue">
              Stray Animal Issue
            </option>
            <option value="Other">Other</option>
          </select>

          <input
            placeholder="Complaint Title"
            value={form.title}
            className="border p-3 w-full rounded"
            onChange={(e) =>
              setForm({
                ...form,
                title: e.target.value
              })
            }
          />

          <textarea
            placeholder="Address"
            value={form.address}
            rows="4"
            className="border p-3 w-full rounded"
            onChange={(e) =>
              setForm({
                ...form,
                address: e.target.value
              })
            }
          />

          <input
            placeholder="Google Maps Link"
            value={form.mapLink}
            className="border p-3 w-full rounded"
            onChange={(e) =>
              setForm({
                ...form,
                mapLink: e.target.value
              })
            }
          />

          <button
            type="button"
            onClick={getCurrentLocation}
            className="bg-green-600 text-white px-6 py-3 rounded"
          >
            Get Current Location
          </button>

          <input
            type="text"
            value={form.latitude}
            readOnly
            placeholder="Latitude"
            className="border p-3 w-full rounded bg-gray-100"
          />

          <input
            type="text"
            value={form.longitude}
            readOnly
            placeholder="Longitude"
            className="border p-3 w-full rounded bg-gray-100"
          />

          <select
            value={form.priority}
            className="border p-3 w-full rounded"
            onChange={(e) =>
              setForm({
                ...form,
                priority: e.target.value
              })
            }
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>

          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded"
          >
            Submit Complaint
          </button>

        </form>
      </div>
    </div>
  );
}