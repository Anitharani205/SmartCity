import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "./components/AdminSidebar";

const usersData = [
  {
    name: "Gayathiri",
    email: "gayathiri@example.gov",
    role: "Staff",
    status: "Active",
    img: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    name: "Emily",
    email: "emily.davis@citizen.net",
    role: "Citizen",
    status: "Pending",
    img: "https://randomuser.me/api/portraits/women/65.jpg"
  },
  {
    name: "Kaviya",
    email: "kaviya@cityzen.io",
    role: "Admin",
    status: "Active",
    img: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    name: "James",
    email: "jwilson@provider.com",
    role: "Citizen",
    status: "Blocked",
    img: "https://randomuser.me/api/portraits/men/40.jpg"
  },
  {
    name: "Dhanuja",
    email: "dhanuja@staff.gov",
    role: "Staff",
    status: "Active",
    img: "https://randomuser.me/api/portraits/women/21.jpg"
  },
  {
    name: "Robert",
    email: "robert@metro.gov",
    role: "Citizen",
    status: "Pending",
    img: "https://randomuser.me/api/portraits/men/50.jpg"
  },
  {
    name: "Sophia",
    email: "sophia@city.net",
    role: "Admin",
    status: "Active",
    img: "https://randomuser.me/api/portraits/women/33.jpg"
  }
];

export default function UserManagement() {

  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] =
    useState("All Roles");

  // PAGINATION
  const [currentPage, setCurrentPage] =
    useState(1);

  const itemsPerPage = 4;

  const [users, setUsers] = useState(() => {

    const saved =
      JSON.parse(
        localStorage.getItem("users")
      );

    return saved
      ? [...usersData, ...saved]
      : usersData;
  });

  const filteredUsers = users.filter((u) => {

    const text =
      `${u.name} ${u.email} ${u.role} ${u.status}`
        .toLowerCase();

    if (
      !text.includes(search.toLowerCase())
    )
      return false;

    if (
      roleFilter !== "All Roles" &&
      u.role !== roleFilter
    ) {
      return false;
    }

    return true;
  });

  // RESET PAGE WHEN FILTER/SEARCH CHANGES
  useEffect(() => {
    setCurrentPage(1);
  }, [search, roleFilter]);

  // PAGINATION LOGIC
  const totalPages = Math.ceil(
    filteredUsers.length / itemsPerPage
  );

  const startIndex =
    (currentPage - 1) * itemsPerPage;

  const currentUsers =
    filteredUsers.slice(
      startIndex,
      startIndex + itemsPerPage
    );

  // EDIT
  const handleEdit = (user) => {
    alert(`Edit ${user.name}`);
  };

  // BLOCK / ACTIVE
  const handleToggleStatus = (index) => {

    const updated = [...users];

    updated[index].status =
      updated[index].status === "Blocked"
        ? "Active"
        : "Blocked";

    setUsers(updated);

    localStorage.setItem(
      "users",
      JSON.stringify(updated)
    );
  };

  // DELETE
  const handleDelete = (index) => {

    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this user?"
      );

    if (!confirmDelete) return;

    const updated =
      users.filter((_, i) => i !== index);

    setUsers(updated);

    localStorage.setItem(
      "users",
      JSON.stringify(updated)
    );

    // FIX PAGINATION AFTER DELETE
    const newTotalPages = Math.ceil(
      updated.length / itemsPerPage
    );

    if (currentPage > newTotalPages) {
      setCurrentPage(newTotalPages || 1);
    }
  };

  return (

    <div className="flex h-screen bg-gray-100">

      <AdminSidebar />

      <div className="flex-1 p-8 overflow-auto">

        {/* HEADER */}
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
            onClick={() =>
              navigate("/create-user")
            }
          >
            Add new User
          </button>

        </div>

        {/* STATS */}
        <div className="grid grid-cols-3 gap-6 mb-6">

          <div className="bg-white p-5 rounded-xl shadow">
            <p className="text-gray-500">
              Total Users
            </p>

            <h3 className="text-2xl font-bold">
              {users.length}
            </h3>
          </div>

          <div className="bg-white p-5 rounded-xl shadow">

            <p className="text-gray-500">
              Active Now
            </p>

            <h3 className="text-2xl font-bold">

              {
                users.filter(
                  u => u.status === "Active"
                ).length
              }

            </h3>

          </div>

          <div className="bg-white p-5 rounded-xl shadow">

            <p className="text-gray-500">
              Pending Verifications
            </p>

            <h3 className="text-2xl font-bold">

              {
                users.filter(
                  u => u.status === "Pending"
                ).length
              }

            </h3>

          </div>

        </div>

        {/* TABLE SECTION */}
        <div className="bg-white p-5 rounded-xl shadow mb-6">

          {/* SEARCH */}
          <div className="flex justify-between mb-4">

            <input
              placeholder="Search by name, email, or user ID..."
              className="border px-4 py-2 rounded-md w-1/2"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

            <div className="flex gap-3">

              <button className="border px-4 py-2 rounded-md">
                Filter
              </button>

              <button className="border px-4 py-2 rounded-md">
                Export
              </button>

            </div>

          </div>

          {/* ROLE FILTER */}
          <div className="flex gap-6 text-gray-500 text-sm mb-4">

            {[
              "All Roles",
              "Citizen",
              "Staff",
              "Admin"
            ].map(role => (

              <span
                key={role}
                onClick={() =>
                  setRoleFilter(role)
                }
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

          {/* TABLE */}
          <table className="w-full text-sm">

            <thead className="text-gray-500 border-b">

              <tr>
                <th className="text-left py-3">
                  User
                </th>

                <th className="text-left">
                  Email
                </th>

                <th>Role</th>

                <th>Status</th>

                <th>Actions</th>
              </tr>

            </thead>

            <tbody>

              {currentUsers.map((user, index) => (

                <tr
                  key={index}
                  className="border-b"
                >

                  <td className="flex items-center gap-3 py-3">

                    <img
                      src={user.img}
                      className="w-8 h-8 rounded-full"
                      alt=""
                    />

                    {user.name}

                  </td>

                  <td>{user.email}</td>

                  <td className="text-blue-600 font-semibold">
                    {user.role}
                  </td>

                  <td>

                    <span
                      className={`px-2 py-1 rounded text-xs
                      ${
                        user.status === "Active" &&
                        "bg-green-100 text-green-600"
                      }
                      ${
                        user.status === "Pending" &&
                        "bg-yellow-100 text-yellow-600"
                      }
                      ${
                        user.status === "Blocked" &&
                        "bg-red-100 text-red-600"
                      }
                    `}
                    >
                      {user.status}
                    </span>

                  </td>

                  {/* ACTIONS */}
                  <td className="flex gap-3 items-center text-gray-600">

                    <span
                      onClick={() =>
                        handleEdit(user)
                      }
                      className="cursor-pointer"
                    >
                      ✏️
                    </span>

                    <span
                      onClick={() =>
                        handleToggleStatus(index)
                      }
                      className="cursor-pointer"
                    >
                      🔒
                    </span>

                    <span
                      onClick={() =>
                        handleDelete(index)
                      }
                      className="cursor-pointer text-red-600"
                    >
                      🗑️
                    </span>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

          {/* PAGINATION */}

          <div className="flex justify-between items-center mt-4">

            <p className="text-sm text-gray-500">

              Showing {currentUsers.length} of{" "}
              {filteredUsers.length} users

            </p>

            <div className="flex gap-2">

              {/* PREV */}
              <button
                disabled={currentPage === 1}
                onClick={() =>
                  setCurrentPage(
                    currentPage - 1
                  )
                }
                className={`px-3 py-1 border rounded ${
                  currentPage === 1
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
              >
                Prev
              </button>

              {/* PAGE NUMBERS */}
              {[...Array(totalPages)].map(
                (_, index) => (

                  <button
                    key={index}
                    onClick={() =>
                      setCurrentPage(
                        index + 1
                      )
                    }
                    className={`px-3 py-1 rounded ${
                      currentPage ===
                      index + 1
                        ? "bg-blue-600 text-white"
                        : "border"
                    }`}
                  >
                    {index + 1}
                  </button>

                )
              )}

              {/* NEXT */}
              <button
                disabled={
                  currentPage === totalPages ||
                  totalPages === 0
                }
                onClick={() =>
                  setCurrentPage(
                    currentPage + 1
                  )
                }
                className={`px-3 py-1 border rounded ${
                  currentPage === totalPages ||
                  totalPages === 0
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
              >
                Next
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}