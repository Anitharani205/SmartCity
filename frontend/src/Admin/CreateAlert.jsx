import React, { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "./components/AdminSidebar";

export default function CreateAlert() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    message: "",
    category: "WATER",
    priority: "Low",
    location: "Coimbatore",
    image: "",
    createdBy: "admin",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const publishAlert = async () => {
    if (!form.title || !form.message) {
      alert("Title and Message are required!");
      return;
    }

    try {
      setLoading(true);

      
      const payload = {
        ...form,
        image: form.image?.trim() || "",
      };

      await API.post("/api/alerts/create", payload);

      alert("Alert published successfully!");
      navigate("/alerts");

    } catch (error) {
      console.log(error);
      alert("Failed to publish alert");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">

      <AdminSidebar />

      
      <div className="flex-1 flex items-center justify-center p-6">

        <div className="bg-white w-full max-w-xl p-8 rounded-2xl shadow-xl">

          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            Create Emergency Alert
          </h2>

          <input
            name="title"
            placeholder="Alert Title"
            value={form.title}
            onChange={handleChange}
            className="w-full p-3 mb-3 border rounded-lg"
          />

          <textarea
            name="message"
            placeholder="Alert Message"
            value={form.message}
            onChange={handleChange}
            className="w-full p-3 mb-3 border rounded-lg"
          />

          <input
            name="image"
            placeholder="Image URL"
            value={form.image}
            onChange={handleChange}
            className="w-full p-3 mb-3 border rounded-lg"
          />

          {form.image && (
            <img
              src={form.image}
              alt="preview"
              className="w-full h-48 object-cover rounded-lg mb-3"
            />
          )}

          <div className="grid grid-cols-2 gap-3 mb-4">

            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="p-3 border rounded-lg"
            >
              <option value="WATER">WATER</option>
              <option value="WEATHER">WEATHER</option>
              <option value="POWER">POWER</option>
              <option value="TRAFFIC">TRAFFIC</option>
              <option value="HEALTH">HEALTH</option>
            </select>

            <select
              name="priority"
              value={form.priority}
              onChange={handleChange}
              className="p-3 border rounded-lg"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Critical">Critical</option>
            </select>

          </div>

          <button
            onClick={publishAlert}
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg"
          >
            {loading ? "Publishing..." : "Publish Alert"}
          </button>

        </div>
      </div>
    </div>
  );
}