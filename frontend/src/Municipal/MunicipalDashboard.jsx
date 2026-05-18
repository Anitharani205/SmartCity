import MunicipalSidebar from "./components/MunicipalSidebar";
import {
  Search,
  Folder,
  Clock,
  CheckCircle,
  Wrench,
  AlertTriangle,
  Trash,
} from "lucide-react";

function Navbar() {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center bg-gray-100 px-4 py-2 rounded-lg w-96">
        <Search className="mr-2" size={18} />
        <input
          className="bg-transparent outline-none w-full"
          placeholder="Search complaints, tasks, or citizens..."
        />
      </div>

      <div className="flex items-center gap-4">
        <span className="bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm">
          DISTRICT 4 | SHIFT: MORNING
        </span>
        ⚙️ ✉️
      </div>
    </div>
  );
}

function Stats() {
  return (
    <div className="grid grid-cols-3 gap-6 mb-6">
      <div className="bg-white p-6 rounded-xl shadow">
        <div className="flex justify-between">
          <p className="text-gray-500">Open Complaints</p>
          <Folder className="text-blue-500" size={22} />
        </div>
        <h1 className="text-3xl font-bold mt-3">12</h1>
        <p className="text-red-500 text-sm">+2</p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow">
        <div className="flex justify-between">
          <p className="text-gray-500">In Progress</p>
          <Clock className="text-yellow-500" size={22} />
        </div>
        <h1 className="text-3xl font-bold mt-3">08</h1>
        <p className="text-gray-500 text-sm">Active current</p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow">
        <div className="flex justify-between">
          <p className="text-gray-500">Resolved</p>
          <CheckCircle className="text-green-500" size={22} />
        </div>
        <h1 className="text-3xl font-bold mt-3">45</h1>
        <p className="text-green-500 text-sm">This Month</p>
      </div>
    </div>
  );
}

function PendingUtility() {
  return (
    <div className="bg-blue-50 border border-blue-200 p-6 rounded-xl flex justify-between items-center mb-6">
      <div className="flex items-center gap-4">
        <div className="bg-blue-500 text-white p-3 rounded-full">
          <Wrench size={20} />
        </div>

        <div>
          <p className="font-semibold">
            Pending Utility Services
            <span className="ml-2 text-xs bg-blue-500 text-white px-2 py-1 rounded">
              NEW
            </span>
          </p>

          <p className="text-sm text-gray-600">
            You have 4 new water connection requests requiring approval.
          </p>
        </div>
      </div>

      <button className="bg-blue-600 text-white px-6 py-2 rounded-lg">
        Review Requests
      </button>
    </div>
  );
}

function PriorityActions() {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <AlertTriangle className="text-red-500" size={20} />
        Priority Actions
      </h2>

      <div className="space-y-4">

     
        <div className="bg-white p-5 rounded-xl shadow flex justify-between">
          <div className="flex gap-4">
            <AlertTriangle className="text-red-500" />

            <div>
              <p className="text-red-500 text-xs font-semibold">
                HIGH PRIORITY
              </p>

              <h3 className="font-bold">Main St. Water Leak</h3>

              <p className="text-gray-500 text-sm">
                Large rupture near intersection of Main & 4th.
              </p>
            </div>
          </div>

          <button className="border px-4 py-2 rounded-lg">
            Manage
          </button>
        </div>

        {/* In Progress */}
        <div className="bg-white p-5 rounded-xl shadow flex justify-between">
          <div className="flex gap-4">
            💡

            <div>
              <p className="text-yellow-600 text-xs font-semibold">
                IN PROGRESS
              </p>

              <h3 className="font-bold">Broken Streetlight #452</h3>

              <p className="text-gray-500 text-sm">
                Crew dispatched for bulb replacement.
              </p>
            </div>
          </div>

          <button className="border px-4 py-2 rounded-lg">
            Manage
          </button>
        </div>

    
        <div className="bg-white p-5 rounded-xl shadow flex justify-between">
          <div className="flex gap-4">
            <Trash size={20} />

            <div>
              <p className="text-red-500 text-xs font-semibold">
                OVERDUE
              </p>

              <h3 className="font-bold">Waste Collection Delay</h3>

              <p className="text-gray-500 text-sm">
                Missed pickup due to truck maintenance.
              </p>
            </div>
          </div>

          <button className="border px-4 py-2 rounded-lg">
            Manage
          </button>
        </div>

      </div>
    </div>
  );
}

function MunicipalDashboard() {
  return (
    <div className="bg-gray-50 min-h-screen">

 
      <div className="fixed top-0 left-0 w-64 h-screen">
        <MunicipalSidebar />
      </div>

      <div className="ml-64 h-screen overflow-y-auto p-8">

        <Navbar />

        <h1 className="text-2xl font-bold mb-1">
          Municipal Staff Dashboard
        </h1>

        <p className="text-gray-500 mb-6">
          Good morning, Sarah. Here's your overview for District 4 today.
        </p>

        <Stats />

        <PendingUtility />

        <PriorityActions />

      </div>
    </div>
  );
}

export default MunicipalDashboard;
