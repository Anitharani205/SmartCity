import React, { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";

export default function Services() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    citizenName: "",
    category: "",
    service: "",
    address: "",
    mapLink: "",
    location: "",
    date: ""
  });

  const handleBooking = async () => {

    try {

      await API.post("/services", {
        ...form,
        citizen: localStorage.getItem("email")
      });

      alert("Service Booked Successfully!");

      setForm({
        citizenName: "",
        category: "",
        service: "",
        address: "",
        mapLink: "",
        location: "",
        date: ""
      });

      navigate("/citizen");

    } catch (err) {

      console.log(err);
      alert("Booking Failed");
    }
  };

  return (

    <div className="bg-gray-100 min-h-screen">

      <Sidebar />

      <div className="ml-64 p-6">

        <h2 className="text-2xl font-bold mb-6">
          Book Service
        </h2>

        <input
          placeholder="Citizen Name"
          value={form.citizenName}
          className="border p-3 w-full mb-3 rounded"
          onChange={(e) =>
            setForm({
              ...form,
              citizenName: e.target.value
            })
          }
        />

        {/* Service Category */}
        <select
          value={form.category}
          className="border p-3 w-full mb-3 rounded"
          onChange={(e) =>
            setForm({
              ...form,
              category: e.target.value
            })
          }
        >
          <option value="">
            Select Service Category
          </option>

          <option value="Plumbing">
            Plumbing
          </option>

          <option value="Electrical">
            Electrical
          </option>

          <option value="Carpentry">
            Carpentry
          </option>

          <option value="Painting">
            Painting
          </option>

          <option value="Cleaning">
            Cleaning
          </option>

          <option value="Appliance Repair">
            Appliance Repair
          </option>

          <option value="AC Service">
            AC Service
          </option>

          <option value="Pest Control">
            Pest Control
          </option>

          <option value="Gardening">
            Gardening
          </option>

          <option value="Other">
            Other
          </option>
        </select>

        {/* Service Description */}
        <input
          type="text"
          placeholder="Describe Required Service"
          value={form.service}
          className="border p-3 w-full mb-3 rounded"
          onChange={(e) =>
            setForm({
              ...form,
              service: e.target.value
            })
          }
        />

        <textarea
          placeholder="Address"
          value={form.address}
          className="border p-3 w-full mb-3 rounded"
          rows="4"
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
          className="border p-3 w-full mb-3 rounded"
          onChange={(e) =>
            setForm({
              ...form,
              mapLink: e.target.value
            })
          }
        />

        <input
          placeholder="Location"
          value={form.location}
          className="border p-3 w-full mb-3 rounded"
          onChange={(e) =>
            setForm({
              ...form,
              location: e.target.value
            })
          }
        />

        <input
          type="datetime-local"
          value={form.date}
          className="border p-3 w-full mb-4 rounded"
          onChange={(e) =>
            setForm({
              ...form,
              date: e.target.value
            })
          }
        />

        <button
          onClick={handleBooking}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded shadow-md"
        >
          Book Service
        </button>

      </div>

    </div>
  );
}