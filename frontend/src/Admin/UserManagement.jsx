import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import AdminSidebar from "./components/AdminSidebar";

export default function UserManagement() {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);

  const [search, setSearch] = useState("");

  const [roleFilter, setRoleFilter] =
    useState("All");

  const [currentPage, setCurrentPage] =
    useState(1);

  const itemsPerPage = 5;

  useEffect(() => {

    loadUsers();

  }, []);

  const loadUsers = async () => {

    try {

      const res =
        await API.get("/users");

      setUsers(res.data);

    } catch (err) {

      console.log(err);

      alert("Failed to load users");
    }
  };

 
  const filteredUsers = users.filter((u) => {

    const searchText =
      `${u.name} ${u.email} ${u.role}`
        .toLowerCase();

    const matchesSearch =
      searchText.includes(
        search.toLowerCase()
      );

    const matchesRole =
      roleFilter === "All" ||
      u.role === roleFilter;

    return matchesSearch && matchesRole;
  });

  
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

  const deleteUser = async (id) => {

    const confirmDelete =
      window.confirm(
        "Delete this user?"
      );

    if (!confirmDelete) return;

    try {

      await API.delete(`/users/${id}`);

      alert("User Deleted");

      loadUsers();

    } catch (err) {

      console.log(err);

      alert("Delete Failed");
    }
  };

 
  const toggleStatus = async (id) => {

    try {

      await API.put(
        `/users/toggle/${id}`
      );

      loadUsers();

    } catch (err) {

      console.log(err);

      alert("Status Update Failed");
    }
  };
const updateDepartment = async (
  id,
  department
) => {

  try {

    await API.put(
      `/users/department/${id}`,
      { department }
    );

    loadUsers();

  } catch (err) {

    console.log(err);

    alert("Department Update Failed");
  }
};
  return (

    <div className="flex bg-gray-100 min-h-screen">

      <div className="fixed left-0 top-0 h-screen w-64 bg-white shadow-lg z-50">

        <AdminSidebar />

      </div>

      
      <div className="flex-1 ml-64 p-8">

        
        <div className="flex justify-between items-center mb-8">

  <div>

    <h1 className="text-4xl font-bold text-gray-800">
      User Management
    </h1>

    <p className="text-gray-500 mt-2">
      Manage registered users
    </p>

  </div>

  <button
    onClick={() => navigate("/new-user")}
    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg shadow"
  >
    + Add New User
  </button>

</div>

       
        <div className="grid grid-cols-3 gap-6 mb-8">

          <div className="bg-white rounded-2xl p-6 shadow">

            <p className="text-gray-500">
              Total Users
            </p>

            <h2 className="text-3xl font-bold mt-2">
              {users.length}
            </h2>

          </div>

          <div className="bg-white rounded-2xl p-6 shadow">

            <p className="text-gray-500">
              Citizens
            </p>

            <h2 className="text-3xl font-bold mt-2 text-blue-600">

              {
                users.filter(
                  u => u.role === "CITIZEN"
                ).length
              }

            </h2>

          </div>

          <div className="bg-white rounded-2xl p-6 shadow">

            <p className="text-gray-500">
              Municipal Staff
            </p>

            <h2 className="text-3xl font-bold mt-2 text-green-600">

              {
                users.filter(
                  u => u.role === "MUNICIPAL"
                ).length
              }

            </h2>

          </div>

        </div>

       
        <div className="bg-white rounded-2xl shadow-lg p-6">

         
          <div className="flex justify-between items-center mb-6">

            <input
              type="text"
              placeholder="Search users..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="border border-gray-300 rounded-lg px-4 py-2 w-[350px] focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <select
              value={roleFilter}
              onChange={(e) =>
                setRoleFilter(e.target.value)
              }
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >

              <option value="All">
                All Roles
              </option>

              <option value="CITIZEN">
                Citizen
              </option>

              <option value="MUNICIPAL">
                Municipal
              </option>

              <option value="ADMIN">
                Admin
              </option>

            </select>

          </div>

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">

                <tr>

                  <th className="p-4 text-left">
                    Name
                  </th>

                  <th className="p-4 text-left">
                    Email
                  </th>

                  <th className="p-4 text-left">
                    Aadhaar
                  </th>

                  <th className="p-4 text-left">
                    Role
                  </th>

                  <th className="p-4 text-left">
  Status
</th>

<th className="p-4 text-left">
  Department
</th>

<th className="p-4 text-center">
  Actions
</th>

                </tr>

              </thead>

              <tbody>

                {currentUsers.map((u) => (

                  <tr
                    key={u.id}
                    className="border-b hover:bg-gray-50 transition"
                  >

                    {/* NAME */}
                    <td className="p-4 font-semibold text-gray-800">

                      {u.name}

                    </td>

                
                    <td className="p-4 text-gray-700">

                      {u.email}

                    </td>

               
                    <td className="p-4 text-gray-700">

                      {u.aadhaar}

                    </td>

                
                    <td className="p-4">

                      <span className={`px-3 py-1 rounded-full text-sm font-medium
                      
                      ${u.role === "ADMIN"
                        ? "bg-purple-100 text-purple-700"
                        : u.role === "MUNICIPAL"
                        ? "bg-green-100 text-green-700"
                        : "bg-blue-100 text-blue-700"
                      }
                      
                      `}>

                        {u.role}

                      </span>

                    </td>

                  
                    <td className="p-4">

                      <span className={`px-3 py-1 rounded-full text-sm font-medium
                      
                      ${u.status === "Blocked"
                        ? "bg-red-100 text-red-700"
                        : "bg-green-100 text-green-700"
                      }
                      
                      `}>

                        {u.status || "Active"}

                      </span>

                    </td>
<td className="p-4">

  {u.role === "MUNICIPAL" ? (

    <select
      value={u.department || ""}
      onChange={(e) =>
        updateDepartment(
          u.id,
          e.target.value
        )
      }
      className="border rounded px-2 py-1"
    >

      <option value="">
        Select
      </option>

      <option value="Water">
        Water
      </option>

      <option value="Electrical">
        Electrical
      </option>

      <option value="Road">
        Road
      </option>

      <option value="Drainage">
        Drainage
      </option>

      <option value="Sanitation">
        Sanitation
      </option>

    </select>

  ) : (

    <span>-</span>

  )}

</td>
                 
                    <td className="p-4">

                      <div className="flex justify-center gap-3">

                      
                        <button
                          onClick={() =>
                            toggleStatus(u.id)
                          }
                          className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg text-sm"
                        >

                          {u.status === "Blocked"
                            ? "Unblock"
                            : "Block"}

                        </button>

                        
                        <button
                          onClick={() =>
                            deleteUser(u.id)
                          }
                          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm"
                        >
                          Delete
                        </button>

                      </div>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

     
          <div className="flex justify-between items-center mt-6">

            <p className="text-gray-500 text-sm">

              Showing {currentUsers.length} of{" "}
              {filteredUsers.length} users

            </p>

            <div className="flex gap-2">

              <button
                disabled={currentPage === 1}
                onClick={() =>
                  setCurrentPage(
                    currentPage - 1
                  )
                }
                className="px-4 py-2 border rounded-lg disabled:opacity-50"
              >
                Prev
              </button>

              {[...Array(totalPages)].map(
                (_, index) => (

                  <button
                    key={index}
                    onClick={() =>
                      setCurrentPage(
                        index + 1
                      )
                    }
                    className={`px-4 py-2 rounded-lg
                      
                      ${currentPage === index + 1
                        ? "bg-blue-600 text-white"
                        : "border"
                      }
                      
                      `}
                  >

                    {index + 1}

                  </button>

                )
              )}

              <button
                disabled={
                  currentPage === totalPages
                }
                onClick={() =>
                  setCurrentPage(
                    currentPage + 1
                  )
                }
                className="px-4 py-2 border rounded-lg disabled:opacity-50"
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
