import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

export default function NewUser() {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    department: "",
    password: ""
  });

  // Generate password
  const generatePassword = () => {
    const pass = Math.random().toString(36).slice(-8);
    setForm((prev) => ({
      ...prev,
      password: pass
    }));
  };

  // Handle input change
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // Submit form
  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    await API.post("/users/create", {
      name: form.name,
      email: form.email,
      phone: form.phone,
      role: form.role,
      department:
        form.role === "MUNICIPAL" ? form.department : null,
      password: form.password, // IMPORTANT (must send plain password)
      status: "Active",
      activeTasks: 0
    });

    alert("User Created Successfully & Email Sent!");
    navigate("/usermanagement");

  } catch (err) {
    console.log(err.response?.data || err.message);
    alert("Failed to create user");
  }
};
  return (
    <div className="flex h-screen bg-gray-100">

      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md p-5">
        <h1 className="text-xl font-bold text-blue-600 mb-6">
          CityZen Admin
        </h1>
      </div>

      {/* Main */}
      <div className="flex-1 p-8">

        <h2 className="text-2xl font-bold mb-6">
          Create New User
        </h2>

        <div className="bg-white p-8 rounded-xl shadow max-w-3xl">

          <form onSubmit={handleSubmit}>

            <input
              name="name"
              placeholder="Full Name"
              onChange={handleChange}
              className="border p-2 w-full mb-3"
              required
            />

            <input
              name="email"
              placeholder="Email"
              onChange={handleChange}
              className="border p-2 w-full mb-3"
              required
            />

            <input
              name="phone"
              placeholder="Phone"
              onChange={handleChange}
              className="border p-2 w-full mb-3"
            />

            {/* Role */}
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="border p-2 w-full mb-3"
              required
            >
              <option value="">Select Role</option>
             
              <option value="MUNICIPAL">Municipal Staff</option>
             
            </select>

            {/* Department only for MUNICIPAL */}
            {form.role === "MUNICIPAL" && (
              <select
                name="department"
                value={form.department}
                onChange={handleChange}
                className="border p-2 w-full mb-3"
                required
              >
                <option value="">Select Department</option>
                <option value="Water">Water</option>
                <option value="Electrical">Electrical</option>
                <option value="Road">Road</option>
                <option value="Drainage">Drainage</option>
                <option value="Sanitation">Sanitation</option>
              </select>
            )}

            {/* Password */}
            <button
              type="button"
              onClick={generatePassword}
              className="mb-3 bg-gray-200 px-3 py-1"
            >
              Generate Password
            </button>

            <input
              name="password"
              value={form.password}
              readOnly
              className="border p-2 w-full mb-3"
              required
            />

            {/* Buttons */}
            <div className="flex gap-3">

              <button
                type="button"
                onClick={() => navigate("/usermanagement")}
                className="border px-4 py-2"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 text-white px-4 py-2"
              >
                {loading ? "Creating..." : "Create User"}
              </button>

            </div>

          </form>

        </div>

      </div>

    </div>
  );
}