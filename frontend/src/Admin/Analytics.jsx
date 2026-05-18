
import React from "react";
import AdminSidebar from "./components/AdminSidebar";
import {
  LayoutDashboard,
  AlertCircle,
  Users,
  Bell,
  BarChart3,
  FileText,
  Search,
  Download,
  Activity
} from "lucide-react";

export default function AnalyticsDashboard() {
  return (
    <div className="flex h-screen bg-gray-100">

      <AdminSidebar/>

     
      <div className="flex-1 p-8 overflow-y-auto">

       
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">
            Analytics & Reports
          </h2>

          <div className="flex gap-4">

            <div className="flex items-center border px-3 py-2 rounded-md bg-white">
              <Search size={16} className="mr-2"/>
              <input
                placeholder="Search data..."
                className="outline-none"
              />
            </div>

            <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md">
              <Download size={16}/> Download PDF
            </button>

          </div>
        </div>

      
        <div className="grid grid-cols-4 gap-6 mb-6">

          <div className="bg-white p-5 rounded-xl shadow">
            <p className="text-gray-500">Avg Resolution Time</p>
            <h3 className="text-2xl font-bold">2.4 Days</h3>
          </div>

          <div className="bg-white p-5 rounded-xl shadow">
            <p className="text-gray-500">Resolution Rate</p>
            <h3 className="text-2xl font-bold">94%</h3>
          </div>

          <div className="bg-white p-5 rounded-xl shadow">
            <p className="text-gray-500">7-Day Trend</p>
            <h3 className="text-2xl font-bold">1,240 Tickets</h3>
          </div>

          <div className="bg-white p-5 rounded-xl shadow">
            <p className="text-gray-500">New Registrations</p>
            <h3 className="text-2xl font-bold">+1,102</h3>
          </div>

        </div>

        
        <div className="grid grid-cols-2 gap-6 mb-6">

         
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <BarChart3 size={18}/> Complaint Resolution Trends
            </h3>

            <p className="text-gray-500">
              Chart visualization can be added using chart libraries.
            </p>

          </div>

         
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="font-semibold mb-4">
              Staff Workload Analytics
            </h3>

            <div className="space-y-4">

              <div>
                <p className="text-sm">Sanitation Department</p>
                <div className="w-full bg-gray-200 h-3 rounded">
                  <div className="bg-blue-600 h-3 rounded w-4/5"></div>
                </div>
                <p className="text-xs text-gray-500">342 Tickets</p>
              </div>

              <div>
                <p className="text-sm">Public Works</p>
                <div className="w-full bg-gray-200 h-3 rounded">
                  <div className="bg-blue-500 h-3 rounded w-3/4"></div>
                </div>
                <p className="text-xs text-gray-500">289 Tickets</p>
              </div>

              <div>
                <p className="text-sm">Health & Safety</p>
                <div className="w-full bg-gray-200 h-3 rounded">
                  <div className="bg-blue-400 h-3 rounded w-2/4"></div>
                </div>
                <p className="text-xs text-gray-500">194 Tickets</p>
              </div>

              <div>
                <p className="text-sm">Administrative Services</p>
                <div className="w-full bg-gray-200 h-3 rounded">
                  <div className="bg-blue-300 h-3 rounded w-1/3"></div>
                </div>
                <p className="text-xs text-gray-500">112 Tickets</p>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}