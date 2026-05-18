
import React, { useState } from "react"; 
import AdminSidebar from "./components/AdminSidebar";
import {
  Home,
  FileText,
  Users,
  AlertTriangle,
  BarChart3,
  Search,
  Bell
} from "lucide-react";

export default function AdminServices() {

  const bookings = [
    {
      service:"Plumbing",
      citizen:"David Richardson",
      location:"42 North Ave, Ward 4",
      status:"Pending",
      date:"Oct 24, 2023 - 09:30 AM"
    },
    {
      service:"Power Grid",
      citizen:"Eliza Vance",
      location:"Greenwood High, Sector 12",
      status:"Assigned",
      date:"Oct 24, 2023 - 11:15 AM"
    },
    {
      service:"Water Supply",
      citizen:"Marcus Aurelius",
      location:"Industrial Park, Unit 4B",
      status:"Overdue",
      date:"Oct 23, 2023 - 04:45 PM"
    },
    {
      service:"Waste Management",
      citizen:"Sarah Connor",
      location:"Skyview Apartments, Ward 2",
      status:"Completed",
      date:"Oct 23, 2023 - 02:20 PM"
    },
    {
      service:"Plumbing",
      citizen:"Thomas Miller",
      location:"18 Heritage Way",
      status:"Pending",
      date:"Oct 24, 2023 - 02:00 PM"
    }
  ];

  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All Time");

  
  const filteredBookings = bookings.filter((b) => {

   
    const fullText = [
      b.service,
      b.citizen,
      b.location,
      b.status,
      b.date
    ]
      .join(" ")
      .toLowerCase();

    if (!fullText.includes(search.toLowerCase())) return false;


    if (activeFilter === "Week") {
      return b.date.includes("Oct 24"); 
    }

    if (activeFilter === "Month") {
      return b.date.includes("Oct");
    }

    return true;
  });

  return (
    <div className="flex h-screen bg-gray-100">

      <AdminSidebar/>

      <div className="flex-1 flex flex-col">

       

        <div className="bg-white border-b p-4 flex justify-between items-center">

          <h2 className="text-xl font-semibold">
            Admin Services Overview
          </h2>

          <div className="flex items-center gap-4">

            <div className="flex items-center bg-gray-100 px-3 py-2 rounded">

              <Search size={16}/>
              <input
                className="bg-transparent ml-2 outline-none"
                placeholder="Search bookings, citizens..."
                
                
                value={search}
                onChange={(e)=>setSearch(e.target.value)}
              />

            </div>

            <Bell/>

            <div className="flex items-center gap-2">
              <img
                src="https://i.pravatar.cc/30"
                className="rounded-full"
              />
              <span className="text-sm">Sarah Jenkins</span>
            </div>

          </div>

        </div>

       

        <div className="p-6 space-y-6">

         

          <div className="grid grid-cols-4 gap-6">

            <StatCard title="Total Bookings" value="1,284" change="+12%"/>
            <StatCard title="Staff Allocated %" value="82%" change="-3%"/>
            <StatCard title="Completion Rate" value="94%" change="+2%"/>
            <StatCard title="Pending Requests" value="45" change="+5%"/>

          </div>

          

          <div className="bg-white rounded-xl shadow-sm p-6">

            <div className="flex justify-between mb-4">

              <h3 className="font-semibold">
                All Utility Bookings
              </h3>

              <div className="flex gap-2">

                
                <button onClick={()=>setActiveFilter("All Time")} className="px-3 py-1 bg-gray-100 rounded">
                  All Time
                </button>

                <button onClick={()=>setActiveFilter("Week")} className="px-3 py-1 bg-gray-100 rounded">
                  Week
                </button>

                <button onClick={()=>setActiveFilter("Month")} className="px-3 py-1 bg-gray-100 rounded">
                  Month
                </button>

                <button onClick={()=>alert("Category filter clicked")} className="px-3 py-1 bg-gray-100 rounded">
                  Filter Category
                </button>

                <button onClick={()=>alert("Status filter clicked")} className="px-3 py-1 bg-gray-100 rounded">
                  Status
                </button>

              </div>

            </div>

            <table className="w-full text-left">

              <thead className="text-gray-500 text-sm border-b">

                <tr>

                  <th className="py-3">Service Type</th>
                  <th>Citizen Name</th>
                  <th>Location</th>
                  <th>Status</th>
                  <th>Date/Time</th>
                  <th>Actions</th>

                </tr>

              </thead>

              <tbody>

                
                {filteredBookings.map((b,i)=>(

                  <tr key={i} className="border-b hover:bg-gray-50">

                    <td className="py-3">{b.service}</td>

                    <td>{b.citizen}</td>

                    <td>{b.location}</td>

                    <td>
                      <StatusBadge status={b.status}/>
                    </td>

                    <td>{b.date}</td>

                   
                    <td
                      className="text-blue-600 cursor-pointer"
                      onClick={()=>alert(`Managing ${b.citizen}`)}
                    >
                      Manage
                    </td>

                  </tr>
                ))}

              </tbody>

            </table>

            <div className="flex justify-between mt-4 text-sm text-gray-500">

              <span>
                Showing {filteredBookings.length} results
              </span>

              <div className="flex gap-2">

                <button className="px-3 py-1 bg-blue-600 text-white rounded">
                  1
                </button>

                <button className="px-3 py-1 border rounded">
                  2
                </button>

                <button className="px-3 py-1 border rounded">
                  3
                </button>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}


function StatCard({title,value,change}){

  const positive = change.includes("+");

  return(
    <div className="bg-white p-6 rounded-xl shadow-sm">

      <p className="text-gray-500">{title}</p>

      <div className="flex justify-between mt-2">

        <h3 className="text-2xl font-bold">
          {value}
        </h3>

        <span className={positive ? "text-green-500" : "text-red-500"}>
          {change}
        </span>

      </div>

    </div>
  )
}



function StatusBadge({status}){

  const colors = {
    Pending:"bg-yellow-100 text-yellow-700",
    Assigned:"bg-blue-100 text-blue-600",
    Overdue:"bg-red-100 text-red-600",
    Completed:"bg-green-100 text-green-600"
  };

  return(
    <span className={`px-3 py-1 rounded-full text-sm ${colors[status]}`}>
      {status}
    </span>
  )
}