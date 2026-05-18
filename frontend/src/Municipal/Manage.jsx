import React, { useState } from "react";
import MunicipalSidebar from "./components/MunicipalSidebar";

export default function Manage() {

  const [notes, setNotes] = useState([
    {
      name: "Sarah Jenkins",
      text: "Checked circuit diagrams, this circuit was repaired 2 months ago. Might be a faulty ballast."
    },
    {
      name: "Mark Wilson",
      text: "Assigning to Crew B for Thursday morning inspection."
    }
  ]);

  const [newNote, setNewNote] = useState("");
  const [status, setStatus] = useState("Pending");


  const handleReschedule = () => {
    alert("Reschedule request opened");
  };

  const handleApprove = () => {
    setStatus("Approved");
    alert("Request Approved");
  };

  const handleComplete = () => {
    setStatus("Completed");
    alert("Request Marked as Complete");
  };

  const handleContact = () => {
    window.location.href = "mailto:citizen@email.com";
  };

  const handlePostNote = () => {
    if (!newNote.trim()) return;

    const note = {
      name: "You",
      text: newNote
    };

    setNotes([...notes, note]);
    setNewNote("");
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      alert("Photo uploaded: " + file.name);
    }
  };



  return (
    <div className="flex h-screen bg-gray-100">

      <MunicipalSidebar/>

      
      <div className="flex-1 p-8 overflow-y-auto">

        
        <div className="flex justify-between items-center mb-6">

          <div>
            <h1 className="text-2xl font-bold">
              #SR-1024 Street Light Repair
            </h1>

            <p className="text-sm text-gray-500">
              Submitted by citizen on Oct 24, 2023 at 09:15 AM
            </p>

            <p className="text-xs text-blue-600 mt-1">
              Status: {status}
            </p>

          </div>

          <div className="flex items-center gap-3">

            <button
              onClick={handleReschedule}
              className="px-4 py-2 border rounded-lg"
            >
              Reschedule
            </button>

            <button
              onClick={handleApprove}
              className="px-4 py-2 border rounded-lg"
            >
              Approve
            </button>

            <button
              onClick={handleComplete}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg"
            >
              Mark as Complete
            </button>

          </div>

        </div>


        
        <div className="grid grid-cols-3 gap-6">

         
          <div className="col-span-2 space-y-6">

           
            <div className="bg-white rounded-xl p-6 shadow">

              <h2 className="font-semibold mb-4">
                Citizen Information
              </h2>

              <div className="flex justify-between items-center">

                <div className="flex items-center gap-4">

                  <div className="w-14 h-14 rounded-full bg-green-600"></div>

                  <div>
                    <p className="font-semibold">John Doe</p>
                    <p className="text-sm text-green-600">Verified Citizen</p>
                    <p className="text-xs text-gray-500">
                      Member since April 2021 • 12 requests submitted
                    </p>
                  </div>

                </div>

                <button
                  onClick={handleContact}
                  className="bg-blue-100 text-blue-600 px-4 py-2 rounded-lg"
                >
                  Contact Citizen
                </button>

              </div>

            </div>


           
            <div className="bg-white rounded-xl p-6 shadow">

              <h2 className="font-semibold mb-4">Request Details</h2>

              <div className="grid grid-cols-3 mb-4">

                <div>
                  <p className="text-xs text-gray-500">CATEGORY</p>
                  <p className="font-medium">Public Utilities</p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">PRIORITY</p>
                  <p className="text-red-600 font-medium">High</p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">REQUESTED TIME SLOT</p>
                  <p className="font-medium">Morning (08:00 - 12:00)</p>
                </div>

              </div>

              <div>

                <p className="text-xs text-gray-500 mb-1">
                  DESCRIPTION
                </p>

                <p className="text-sm text-gray-600">
                  The street light in front of my driveway has been flickering
                  for three nights and finally went completely out yesterday.
                  This area is very dark at night, creating a safety hazard
                  for pedestrians.
                </p>

              </div>

            
              <div className="mt-6">

                <p className="text-xs text-gray-500 mb-2">
                  LOCATION
                </p>

                <div className="rounded-lg overflow-hidden border">

                  <img
                    src="https://maps.googleapis.com/maps/api/staticmap?center=Chicago&zoom=13&size=600x250"
                    alt="map"
                  />

                </div>

                <p className="text-sm mt-2 text-gray-600">
                  1242 Oakwood Avenue, Springfield, IL 62704
                </p>

              </div>

            </div>

          </div>


         
          <div className="space-y-6">

           
            <div className="bg-white rounded-xl p-6 shadow">

              <h2 className="font-semibold mb-4">
                Internal Staff Notes
              </h2>

              <div className="space-y-4">

                {notes.map((note, index) => (

                  <div key={index} className="bg-gray-50 p-3 rounded">

                    <p className="text-sm font-semibold">
                      {note.name}
                    </p>

                    <p className="text-xs text-gray-500">
                      {note.text}
                    </p>

                  </div>

                ))}

              </div>

              <textarea
                value={newNote}
                onChange={(e)=>setNewNote(e.target.value)}
                placeholder="Add a note for the team..."
                className="w-full border rounded mt-4 p-2 text-sm"
              />

              <button
                onClick={handlePostNote}
                className="w-full mt-3 bg-black text-white py-2 rounded"
              >
                Post Note
              </button>

            </div>


           
            <div className="bg-blue-600 text-white rounded-xl p-6 shadow">

              <h2 className="font-semibold mb-4">
                Request Summary
              </h2>

              <div className="space-y-2 text-sm">

                <div className="flex justify-between">
                  <p>Days Open</p>
                  <p>2 Days</p>
                </div>

                <div className="flex justify-between">
                  <p>Assigned Team</p>
                  <p>Crew B (Electrical)</p>
                </div>

                <div className="flex justify-between">
                  <p>Estimated Cost</p>
                  <p>$120.00</p>
                </div>

              </div>

            </div>


            <div className="bg-white rounded-xl p-6 shadow">

              <h2 className="font-semibold mb-4">
                Citizen Photos
              </h2>

              <div className="flex gap-3">

                <img
                  src="https://images.unsplash.com/photo-1519608487953-e999c86e7455"
                  className="w-20 h-20 rounded object-cover"
                />

                <label className="w-20 h-20 border-2 border-dashed rounded flex items-center justify-center cursor-pointer">
                  +
                  <input
                    type="file"
                    className="hidden"
                    onChange={handlePhotoUpload}
                  />
                </label>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
