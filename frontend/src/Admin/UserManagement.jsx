import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "./components/AdminSidebar";

const usersData = [
  {
    name: "Sarah Chen",
    email: "sarah.c@example.gov",
    role: "Staff",
    status: "Active",
    img: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    name: "Emily Davis",
    email: "emily.davis@citizen.net",
    role: "Citizen",
    status: "Pending",
    img: "https://randomuser.me/api/portraits/women/65.jpg"
  },
  {
    name: "Marcus Wright",
    email: "m.wright@cityzen.io",
    role: "Admin",
    status: "Active",
    img: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    name: "James Wilson",
    email: "jwilson@provider.com",
    role: "Citizen",
    status: "Blocked",
    img: "https://randomuser.me/api/portraits/men/40.jpg"
  },
  {
    name: "Elena Rodriguez",
    email: "elena.rodriguez@staff.gov",
    role: "Staff",
    status: "Active",
    img: "https://randomuser.me/api/portraits/women/21.jpg"
  }
];

export default function UserManagement() {

  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All Roles");

  const [users, setUsers] = useState(() => {
    const saved = JSON.parse(localStorage.getItem("users"));
    return saved ? [...usersData, ...saved] : usersData;
  });

  const filteredUsers = users.filter((u) => {
    const text = `${u.name} ${u.email} ${u.role} ${u.status}`.toLowerCase();
    if (!text.includes(search.toLowerCase())) return false;

    if (roleFilter !== "All Roles" && u.role !== roleFilter) {
      return false;
    }

    return true;
  });

  const handleEdit = (user) => {
    alert(`Edit ${user.name}`);
  };

  const handleToggleStatus = (index) => {
    const updated = [...users];

    updated[index].status =
      updated[index].status === "Blocked" ? "Active" : "Blocked";

    setUsers(updated);
    localStorage.setItem("users", JSON.stringify(updated));
  };

  return (
    <div className="flex h-screen bg-gray-100">

      <AdminSidebar/>

      <div className="flex-1 p-8">

        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-semibold">
              User Management
            </h2>
            <p className="text-gray-500 text-sm">
              Manage and monitor city-wide user accounts and permissions.
            </p>
          </div>

          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-md"
            onClick={() => navigate("/create-user")}
          >
            Add new User
          </button>
        </div>

        <div className="grid grid-cols-3 gap-6 mb-6">

          <div className="bg-white p-5 rounded-xl shadow">
            <p className="text-gray-500">Total Users</p>
            <h3 className="text-2xl font-bold">{users.length}</h3>
          </div>

          <div className="bg-white p-5 rounded-xl shadow">
            <p className="text-gray-500">Active Now</p>
            <h3 className="text-2xl font-bold">
              {users.filter(u=>u.status==="Active").length}
            </h3>
          </div>

          <div className="bg-white p-5 rounded-xl shadow">
            <p className="text-gray-500">Pending Verifications</p>
            <h3 className="text-2xl font-bold">
              {users.filter(u=>u.status==="Pending").length}
            </h3>
          </div>

        </div>

        <div className="bg-white p-5 rounded-xl shadow mb-6">

          <div className="flex justify-between mb-4">

            <input
              placeholder="Search by name, email, or user ID..."
              className="border px-4 py-2 rounded-md w-1/2"
              value={search}
              onChange={(e)=>setSearch(e.target.value)}
            />

            <div className="flex gap-3">

              <button
                className="border px-4 py-2 rounded-md"
                onClick={()=>alert("Filter clicked")}
              >
                Filter
              </button>

              <button
                className="border px-4 py-2 rounded-md"
                onClick={()=>alert("Export clicked")}
              >
                Export
              </button>

            </div>

          </div>

          <div className="flex gap-6 text-gray-500 text-sm mb-4">

            {["All Roles","Citizen","Staff","Admin"].map(role => (

              <span
                key={role}
                onClick={()=>setRoleFilter(role)}
                className={`cursor-pointer pb-1 ${
                  roleFilter === role
                    ? "text-blue-600 font-semibold border-b-2 border-blue-600"
                    : ""
                }`}
              >
                {role}
              </span>

            ))}

          </div>

          <table className="w-full text-sm">

            <thead className="text-gray-500 border-b">
              <tr>
                <th className="text-left py-3">User</th>
                <th className="text-left">Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>

              {filteredUsers.map((user, index) => (

                <tr key={index} className="border-b">

                  <td className="flex items-center gap-3 py-3">
                    <img src={user.img} className="w-8 h-8 rounded-full"/>
                    {user.name}
                  </td>

                  <td>{user.email}</td>

                  <td className="text-blue-600 font-semibold">
                    {user.role}
                  </td>

                  <td>
                    <span className={`px-2 py-1 rounded text-xs
                      ${user.status === "Active" && "bg-green-100 text-green-600"}
                      ${user.status === "Pending" && "bg-yellow-100 text-yellow-600"}
                      ${user.status === "Blocked" && "bg-red-100 text-red-600"}
                    `}>
                      {user.status}
                    </span>
                  </td>

                  <td className="text-gray-500 cursor-pointer flex gap-2">
                    <span onClick={()=>handleEdit(user)}>✏️</span>
                    <span onClick={()=>handleToggleStatus(index)}>🔒</span>
                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>

      </div>
    </div>
  );
}
