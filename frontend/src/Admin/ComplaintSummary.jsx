
import React from "react";
import AdminSidebar from "./components/AdminSidebar";

export default function ComplaintSummary({ complaint, goBack }) {

  return (
    <div className="flex h-screen bg-gray-100">

     
      <AdminSidebar />

      
      <div className="flex-1 p-6 overflow-auto">

      
        <div className="flex justify-between items-center mb-4">

          <div className="flex items-center gap-3">
            <button onClick={goBack} className="text-blue-600">
              ← Back
            </button>

            <h2 className="text-xl font-semibold">
              Complaints &gt; {complaint.id}
            </h2>

            <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">
              {complaint.status}
            </span>
          </div>

          <button className="bg-gray-200 px-4 py-2 rounded">
            Print Report
          </button>

        </div>

      
        <div className="grid grid-cols-3 gap-6">

       
          <div className="col-span-2 bg-white p-6 rounded-xl shadow">

            <h3 className="text-lg font-semibold mb-4">
              Complaint Details Summary
            </h3>

            <div className="grid grid-cols-3 gap-4 mb-4 text-sm">

              <div>
                <p className="text-gray-500">Reported By</p>
                <p className="font-medium">Jane Doe</p>
              </div>

              <div>
                <p className="text-gray-500">Category</p>
                <p className="font-medium">{complaint.category}</p>
              </div>

              <div>
                <p className="text-gray-500">Urgency</p>
                <p className="text-red-600 font-medium">
                  {complaint.priority}
                </p>
              </div>

            </div>

            <div className="mb-4 text-sm">
              <p className="text-gray-500">Description</p>
              <p>
                {complaint.title} reported at {complaint.location}. Immediate attention required.
              </p>
            </div>

          
            <div>
              <p className="text-gray-500 mb-2">Evidence Photo</p>

              <img
                src="https://images.unsplash.com/photo-1581091870622-6ccead4c2d1b"
                alt="complaint"
                className="rounded-xl w-full h-64 object-cover"
              />
            </div>

          </div>

       
          <div className="space-y-6">

           
            <div className="bg-white p-4 rounded-xl shadow">

              <h4 className="font-semibold mb-3">Assignment Section</h4>

              <select className="w-full border p-2 rounded mb-3">
                <option>Public Works & Roads</option>
              </select>

              <button className="w-full bg-blue-600 text-white py-2 rounded">
                Assign Person
              </button>

            </div>

          
            <div className="bg-white p-4 rounded-xl shadow">

              <h4 className="font-semibold mb-3">Escalation Panel</h4>

              <textarea
                placeholder="Escalation reason..."
                className="w-full border p-2 rounded mb-3"
              />

              <button className="w-full bg-red-500 text-white py-2 rounded">
                Escalate Priority
              </button>

            </div>

            
            <div className="bg-white p-4 rounded-xl shadow">

              <h4 className="font-semibold mb-3">Status Override</h4>

              <select className="w-full border p-2 rounded mb-3">
                <option>{complaint.status}</option>
                <option>Pending</option>
                <option>Escalated</option>
                <option>Resolved</option>
              </select>

              <button className="w-full bg-black text-white py-2 rounded">
                Update
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}