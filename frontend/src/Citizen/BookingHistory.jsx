import { useState } from "react";
import Sidebar from "./components/Sidebar";
import { Bell, Settings, Search, MoreVertical } from "lucide-react";

function BookingHistory() {

  const [filter, setFilter] = useState("all");

  const bookings = [
    {
      service: "Electricity Maintenance",
      type: "Grid Repair",
      ref: "#CZ-882910",
      date: "Oct 24, 2023",
      time: "02:30 PM",
      cost: "$45.00",
      status: "Completed",
      category: "electricity"
    },
    {
      service: "Water Meter Inspection",
      type: "Periodic Check",
      ref: "#CZ-882855",
      date: "Oct 20, 2023",
      time: "09:15 AM",
      cost: "$0.00",
      status: "Cancelled",
      category: "watergas"
    },
    {
      service: "Gas Line Installation",
      type: "New Connection",
      ref: "#CZ-882701",
      date: "Oct 15, 2023",
      time: "11:00 AM",
      cost: "$120.00",
      status: "Completed",
      category: "watergas"
    },
    {
      service: "Bulk Waste Pickup",
      type: "Residential Request",
      ref: "#CZ-882144",
      date: "Oct 08, 2023",
      time: "08:00 AM",
      cost: "$25.00",
      status: "Completed",
      category: "waste"
    }
  ];

  const filteredBookings =
    filter === "all"
      ? bookings
      : bookings.filter((b) => b.category === filter);

  return (
    <div className="flex bg-gray-100 min-h-screen">

      <Sidebar/>

      <div className="flex-1">

        <div className="flex items-center justify-between bg-white p-4 border-b">

          <div className="flex items-center bg-gray-100 px-4 py-2 rounded-lg w-[500px]">
            <Search size={18} className="text-gray-400 mr-2"/>
            <input
              className="bg-transparent outline-none w-full"
              placeholder="Search for utilities, bills, or help..."
            />
          </div>

          <div className="flex items-center gap-6">
            <Bell size={20}/>
            <Settings size={20}/>
            <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">
              AR
            </div>
          </div>

        </div>

        <div className="p-8">

          <h1 className="text-3xl font-bold">Utility Booking History</h1>
          <p className="text-gray-500 mt-1">
            Track and manage your utility service requests across all city sectors.
          </p>

          <div className="flex items-center justify-between mt-6 bg-white p-4 rounded-xl shadow">

            <div className="flex gap-3">

              <button
                onClick={() => setFilter("all")}
                className={`px-4 py-2 rounded-lg ${filter==="all"?"bg-blue-600 text-white":"bg-gray-100"}`}
              >
                All Services
              </button>

              <button
                onClick={() => setFilter("electricity")}
                className={`px-4 py-2 rounded-lg ${filter==="electricity"?"bg-blue-600 text-white":"bg-gray-100"}`}
              >
                Electricity
              </button>

              <button
                onClick={() => setFilter("watergas")}
                className={`px-4 py-2 rounded-lg ${filter==="watergas"?"bg-blue-600 text-white":"bg-gray-100"}`}
              >
                Water & Gas
              </button>

              <button
                onClick={() => setFilter("waste")}
                className={`px-4 py-2 rounded-lg ${filter==="waste"?"bg-blue-600 text-white":"bg-gray-100"}`}
              >
                Waste Management
              </button>

              <button
                onClick={() => setFilter("internet")}
                className={`px-4 py-2 rounded-lg ${filter==="internet"?"bg-blue-600 text-white":"bg-gray-100"}`}
              >
                Internet
              </button>

            </div>

            <input
              placeholder="Search past bookings..."
              className="border px-4 py-2 rounded-lg"
            />

          </div>

          <div className="bg-white rounded-xl shadow mt-6">

            <table className="w-full">

              <thead className="text-left text-gray-500 text-sm border-b">
                <tr>
                  <th className="p-4">SERVICE</th>
                  <th>REFERENCE ID</th>
                  <th>DATE & TIME</th>
                  <th>COST</th>
                  <th>STATUS</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>

              <tbody>

                {filteredBookings.map((item, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">

                    <td className="p-4">
                      <p className="font-medium">{item.service}</p>
                      <p className="text-sm text-gray-500">{item.type}</p>
                    </td>

                    <td>{item.ref}</td>

                    <td>
                      <p>{item.date}</p>
                      <p className="text-sm text-gray-500">{item.time}</p>
                    </td>

                    <td>{item.cost}</td>

                    <td>
                      <span
                        className={`px-3 py-1 rounded-full text-sm
                        ${
                          item.status === "Completed"
                            ? "bg-green-100 text-green-600"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>

                    <td>
                      <MoreVertical size={18}/>
                    </td>

                  </tr>
                ))}

              </tbody>

            </table>
            <div className="flex justify-between items-center p-4 text-sm text-gray-500">
              Showing {filteredBookings.length} results

              <div className="flex gap-2">
                <button className="px-3 py-1 border rounded">Previous</button>
                <button className="px-3 py-1 bg-gray-200 rounded">1</button>
                <button className="px-3 py-1 border rounded">2</button>
                <button className="px-3 py-1 border rounded">3</button>
                <button className="px-3 py-1 border rounded">Next</button>
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default BookingHistory;
