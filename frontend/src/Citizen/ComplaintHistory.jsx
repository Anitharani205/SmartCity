import Sidebar from "./components/Sidebar";
import {
  Search,
  Plus,
  Lightbulb,
  Trash2,
  Droplet,
  XCircle,
  WifiOff,
  FileText,
  Clock,
  CheckCircle
} from "lucide-react";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ComplaintHistory() {

  const navigate = useNavigate();
  const [filter, setFilter] = useState("All");

  const complaints = [
    {
      icon: <Lightbulb className="text-yellow-600" size={20} />,
      bg: "bg-yellow-100",
      title: "Faulty Street Light Main St",
      category: "Public Infrastructure",
      ref: "#CZ-8902",
      status: "In Progress",
      date: "Mar 24, 2026"
    },
    {
      icon: <Trash2 className="text-green-600" size={20} />,
      bg: "bg-green-100",
      title: "Overflowing Garbage Bin",
      category: "Waste Management",
      ref: "#CZ-8741",
      status: "Resolved",
      date: "Mar 20, 2026"
    },
    {
      icon: <Droplet className="text-blue-600" size={20} />,
      bg: "bg-blue-100",
      title: "Water Leakage Pipeline",
      category: "Utilities",
      ref: "#CZ-8655",
      status: "In Progress",
      date: "Mar 18, 2026"
    },
    {
      icon: <XCircle className="text-red-600" size={20} />,
      bg: "bg-red-100",
      title: "Pothole on 5th Avenue",
      category: "Roads & Transport",
      ref: "#CZ-8500",
      status: "Resolved",
      date: "Mar 12, 2026"
    },
    {
      icon: <WifiOff className="text-gray-600" size={20} />,
      bg: "bg-gray-200",
      title: "Smart Bench WiFi Down",
      category: "Digital Services",
      ref: "#CZ-8421",
      status: "Pending",
      date: "Mar 02, 2026"
    }
  ];

  const filteredComplaints =
    filter === "All"
      ? complaints
      : complaints.filter((c) => c.status === filter);

  return (
    <div className="flex h-screen bg-gray-100">

     
      <Sidebar />

      
      <div className="flex-1 flex flex-col overflow-hidden">

        <div className="flex-1 overflow-auto p-8">

        
          <div className="flex items-center justify-between mb-6">

            <div>
              <h2 className="text-3xl font-bold">Complaint History</h2>
              <p className="text-gray-500">
                Track and manage your reported city issues and requests.
              </p>
            </div>

            <button
              onClick={() => navigate("/report")}
              className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-blue-700"
            >
              <Plus size={18} />
              Report New Issue
            </button>

          </div>

         
          <div className="flex items-center gap-4 mb-6">

            <div className="flex items-center bg-white border rounded-lg px-4 py-2 w-96 shadow-sm">
              <Search className="text-gray-400 mr-2" size={18} />
              <input
                placeholder="Search by ID or keywords (e.g. street light)"
                className="outline-none w-full text-sm"
              />
            </div>

            {["All", "In Progress", "Resolved", "Pending"].map((item) => (

              <button
                key={item}
                onClick={() => setFilter(item)}
                className={`px-4 py-2 rounded-full text-sm font-medium
                ${filter === item
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
              >
                {item === "All"
                  ? "All Complaints"
                  : item === "Pending"
                  ? "Pending Action"
                  : item}
              </button>

            ))}

          </div>

         
          <div className="bg-white rounded-xl shadow-sm border overflow-hidden">

           
            <div className="grid grid-cols-5 text-xs text-gray-500 bg-gray-50 p-4 font-semibold">
              <div>ISSUE & CATEGORY</div>
              <div>REFERENCE ID</div>
              <div>STATUS</div>
              <div>DATE REPORTED</div>
              <div>ACTION</div>
            </div>

          
            {filteredComplaints.map((item, index) => (

              <div
                key={index}
                className="grid grid-cols-5 items-center p-4 border-t hover:bg-gray-50"
              >

                <div className="flex items-center gap-3">
                  <div className={`${item.bg} p-3 rounded-lg`}>
                    {item.icon}
                  </div>

                  <div>
                    <p className="font-semibold">{item.title}</p>
                    <p className="text-xs text-gray-500">{item.category}</p>
                  </div>
                </div>

                <div className="text-sm text-gray-600">{item.ref}</div>

                <div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold
                    ${
                      item.status === "Resolved"
                        ? "bg-green-100 text-green-600"
                        : item.status === "In Progress"
                        ? "bg-blue-100 text-blue-600"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {item.status}
                  </span>
                </div>

                <div className="text-sm text-gray-600">{item.date}</div>

                <div className="text-blue-600 text-sm font-medium cursor-pointer hover:underline">
                  View Details
                </div>

              </div>

            ))}

           
            <div className="flex items-center justify-between p-4 text-sm text-gray-500 border-t">

              <p>Showing 1 to 5 of 24 complaints</p>

              <div className="flex items-center gap-2">

                <button className="px-3 py-1 border rounded-md hover:bg-gray-100">
                  1
                </button>

                <button className="px-3 py-1 border rounded-md hover:bg-gray-100">
                  2
                </button>

                <button className="px-3 py-1 border rounded-md hover:bg-gray-100">
                  3
                </button>

              </div>

            </div>

          </div>

        
          <div className="grid grid-cols-3 gap-6 mt-8">

            <div className="bg-white p-6 rounded-xl border flex items-center gap-4">
              <FileText className="text-blue-600" />
              <div>
                <p className="text-gray-500 text-sm">TOTAL FILED</p>
                <p className="text-2xl font-bold">24</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border flex items-center gap-4">
              <Clock className="text-blue-600" />
              <div>
                <p className="text-gray-500 text-sm">IN PROGRESS</p>
                <p className="text-2xl font-bold">6</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border flex items-center gap-4">
              <CheckCircle className="text-green-600" />
              <div>
                <p className="text-gray-500 text-sm">RESOLVED</p>
                <p className="text-2xl font-bold">18</p>
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default ComplaintHistory;
