import React, { useState } from "react";

export default function CreateAlert() {
  const [category, setCategory] = useState("Emergency");
  const [priority, setPriority] = useState("Low");

  return (
    <div className="flex h-screen bg-gray-100">

    
      <div className="w-64 bg-white shadow-md p-5">
        <h1 className="text-xl font-bold text-blue-600 mb-6">
          CityZen
        </h1>

        <ul className="space-y-4 text-gray-600">
          <li>Home</li>
          <li>Complaints</li>
          <li>Service Request</li>
          <li>User Management</li>
          <li className="text-blue-600 font-semibold">Alerts</li>
          <li>Analytics</li>
          <li>Audit Logs</li>
        </ul>
      </div>

      <div className="flex-1 p-8 overflow-y-auto">

       
        <div className="mb-6">
          <h2 className="text-2xl font-bold">
            Broadcast New Alert
          </h2>

          <p className="text-gray-500">
            Draft and target emergency or public interest communications to citizens.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6">

        
          <div className="space-y-6">

           
            <div className="bg-white p-6 rounded-xl shadow">
              <h3 className="font-semibold mb-4">
                Alert Details
              </h3>

              <div className="space-y-4">

                <div>
                  <label className="text-sm text-gray-600">
                    Alert Title
                  </label>

                  <input
                    type="text"
                    placeholder="e.g., Water Main Break - Downtown"
                    className="w-full border p-2 rounded mt-1"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-600">
                    Message Description
                  </label>

                  <textarea
                    placeholder="Describe the alert in detail for citizens..."
                    rows="4"
                    className="w-full border p-2 rounded mt-1"
                  />
                </div>

                <p className="text-xs text-gray-400">
                  Max 280 characters recommended for mobile notifications.
                </p>

              </div>
            </div>

          
            <div className="bg-white p-6 rounded-xl shadow">

              <h3 className="font-semibold mb-4">
                Categorization
              </h3>

           
              <div className="mb-4">

                <p className="text-sm text-gray-600 mb-2">
                  Category Type
                </p>

                <div className="flex gap-3 flex-wrap">

                  {["Emergency", "Maintenance", "Public News", "Weather"].map(
                    (item) => (
                      <button
                        key={item}
                        onClick={() => setCategory(item)}
                        className={`px-4 py-2 rounded-full border
                        ${
                          category === item
                            ? "bg-blue-100 border-blue-500 text-blue-600"
                            : "bg-gray-100"
                        }`}
                      >
                        {item}
                      </button>
                    )
                  )}

                </div>

              </div>

             
              <div>

                <p className="text-sm text-gray-600 mb-2">
                  Priority Level
                </p>

                <div className="flex gap-4">

                  {["Low", "Medium", "High"].map((item) => (
                    <button
                      key={item}
                      onClick={() => setPriority(item)}
                      className={`px-6 py-2 rounded border
                      ${
                        priority === item
                          ? "border-green-500 bg-green-100"
                          : "bg-gray-100"
                      }`}
                    >
                      {item}
                    </button>
                  ))}

                </div>

              </div>

            </div>

          </div>

         
          <div className="bg-white p-6 rounded-xl shadow">

            <div className="flex justify-between mb-4">

              <h3 className="font-semibold">
                Target Location
              </h3>

              <span className="text-sm bg-gray-100 px-3 py-1 rounded">
                District 4 - Downtown
              </span>

            </div>

         
            <div className="h-96 bg-gray-200 rounded flex items-center justify-center relative">

              <div className="text-gray-500 text-lg">
                Map Area
              </div>

             
              <div className="absolute w-40 h-40 rounded-full bg-blue-200 opacity-40"></div>

            </div>

            <p className="text-xs text-gray-400 mt-3">
              Click and drag on the map to manually refine the alert boundary.
            </p>

          </div>

        </div>

       
        <div className="flex justify-end gap-4 mt-8">

          <button className="px-5 py-2 border rounded">
            Discard
          </button>

          <button className="px-5 py-2 border rounded">
            Save Draft
          </button>

          <button className="px-5 py-2 bg-blue-600 text-white rounded">
            Publish Alert
          </button>

        </div>

      </div>

    </div>
  );
}