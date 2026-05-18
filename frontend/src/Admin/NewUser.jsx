import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateUser() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    department: "",
    password: ""
  });

  const generatePassword = () => {
    const pass = Math.random().toString(36).slice(-8);
    setForm({ ...form, password: pass });
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      name: form.name,
      email: form.email,
      role: form.role,
      status: "Active",
      img: "https://randomuser.me/api/portraits/lego/1.jpg"
    };

    const existing = JSON.parse(localStorage.getItem("users")) || [];
    localStorage.setItem("users", JSON.stringify([...existing, newUser]));

    alert("User Created Successfully!");
    navigate("/admin");
  };

  return (
    <div className="flex h-screen bg-gray-100">

      <div className="w-64 bg-white shadow-md p-5">
        <h1 className="text-xl font-bold text-blue-600 mb-6">
          CityZen Admin
        </h1>
      </div>

      <div className="flex-1 p-8">

        <div className="mb-6">
          <h2 className="text-2xl font-bold">
            Create New User
          </h2>
        </div>

        <div className="bg-white p-8 rounded-xl shadow max-w-3xl">

          <form onSubmit={handleSubmit}>

            <input
              name="name"
              placeholder="Full Name"
              onChange={handleChange}
              className="border p-2 w-full mb-3"
            />

            <input
              name="email"
              placeholder="Email"
              onChange={handleChange}
              className="border p-2 w-full mb-3"
            />

            <select
              name="role"
              onChange={handleChange}
              className="border p-2 w-full mb-3"
            >
              <option>Select Role</option>
              <option>Citizen</option>
              <option>Staff</option>
              <option>Admin</option>
            </select>

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
            />

            <div className="flex gap-3">

              <button
                type="button"
                onClick={() => navigate("/")}
                className="border px-4 py-2"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2"
              >
                Create User
              </button>

            </div>

          </form>

        </div>

      </div>

    </div>
  );
}
