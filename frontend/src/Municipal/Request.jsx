import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MunicipalSidebar from "./components/MunicipalSidebar";
import { Search, Eye } from "lucide-react";

function Request() {

  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  
  const [data] = useState([
    { service: "Plumbing Repair", status: "URGENT", citizen: "John Doe", id: "#C-9021", address: "123 Main Street", date: "Oct 24", time: "09:00 AM" },
    { service: "Electrical Wiring", status: "PENDING", citizen: "Sarah Miller", id: "#C-4421", address: "456 Oak Avenue", date: "Oct 25", time: "02:30 PM" },
    { service: "Road Damage", status: "URGENT", citizen: "David Lee", id: "#C-3321", address: "789 Pine Road", date: "Oct 26", time: "11:00 AM" },
    { service: "Garbage Collection", status: "PENDING", citizen: "Emma Watson", id: "#C-7812", address: "21 Lake View", date: "Oct 27", time: "01:00 PM" },
    { service: "Street Light Issue", status: "URGENT", citizen: "Chris Evans", id: "#C-5511", address: "44 Elm Street", date: "Oct 28", time: "06:00 PM" },
    { service: "Water Leakage", status: "PENDING", citizen: "Tony Stark", id: "#C-6612", address: "108 Stark Tower", date: "Oct 29", time: "10:30 AM" },
    { service: "Drainage Block", status: "URGENT", citizen: "Bruce Wayne", id: "#C-7777", address: "Wayne Manor", date: "Oct 30", time: "08:00 AM" },
    { service: "Park Maintenance", status: "PENDING", citizen: "Clark Kent", id: "#C-8888", address: "Metropolis Park", date: "Nov 01", time: "03:00 PM" },
  ]);

  const filteredData = data.filter((item) =>
    item.service.toLowerCase().includes(search.toLowerCase())
  );


  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = filteredData.slice(
    startIndex,
    startIndex + itemsPerPage
  );

 
  const handleView = (item) => {
    navigate("/detail-page", { state: item });
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">

      <MunicipalSidebar />

      <div className="flex-1 ml-64 p-8">

        
        <div className="flex justify-between items-center mb-8">

          <div>
            <h1 className="text-3xl font-bold">
              Service Requests
            </h1>
            <p className="text-gray-500 mt-1">
              Manage citizen complaints & requests
            </p>
          </div>

          <div className="bg-white flex items-center px-4 py-3 rounded-xl shadow w-80">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search request..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1); 
              }}
              className="ml-3 outline-none w-full"
            />
          </div>

        </div>

       
        <div className="bg-white rounded-2xl shadow overflow-hidden">

          <table className="w-full">

            <thead className="bg-gray-50">
              <tr>
                <th className="p-5 text-left">Complaint ID</th>
                <th className="p-5 text-left">Service</th>
                <th className="p-5 text-left">Citizen</th>
                <th className="p-5 text-left">Status</th>
                <th className="p-5 text-left">Action</th>
              </tr>
            </thead>

            <tbody>

              {currentData.map((item, index) => (

                <tr
                  key={index}
                  className="border-t hover:bg-gray-50"
                >

                  <td className="p-5">{item.id}</td>
                  <td className="p-5">{item.service}</td>
                  <td className="p-5">{item.citizen}</td>

                  <td className="p-5">
                    <span
                      className={`px-4 py-1 rounded-full text-sm
                      ${
                        item.status === "URGENT"
                          ? "bg-red-100 text-red-600"
                          : "bg-yellow-100 text-yellow-600"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>

                  <td className="p-5">
                    <button
                      onClick={() => handleView(item)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                    >
                      <Eye size={16} />
                      View
                    </button>
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

        
        <div className="flex justify-center mt-6 gap-3">

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.max(prev - 1, 1))
            }
            className="px-4 py-2 bg-gray-200 rounded"
          >
            Prev
          </button>

          <span className="px-4 py-2">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() =>
              setCurrentPage((prev) =>
                Math.min(prev + 1, totalPages)
              )
            }
            className="px-4 py-2 bg-gray-200 rounded"
          >
            Next
          </button>

        </div>

      </div>
    </div>
  );
}

export default Request;