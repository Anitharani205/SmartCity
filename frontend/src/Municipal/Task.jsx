import { useLocation } from "react-router-dom";
import { useState } from "react";
import API from "../services/api";
import MunicipalSidebar from "./components/MunicipalSidebar";

export default function Task() {

  const location = useLocation();

  const task = location.state || null;

  const [status, setStatus] = useState(
    task?.status || ""
  );

  const [note, setNote] = useState(
    task?.progressNote || ""
  );

  const [proof, setProof] = useState(
    task?.proofImage || ""
  );

  if (!task) {
    return (
      <div className="p-10">
        No Task Selected
      </div>
    );
  }

  const updateTask = async () => {

    try {

      const endpoint =
        task.taskType === "Complaint"
          ? `/complaints/${task.id || task._id}/status`
          : `/services/${task.id || task._id}/status`;

      await API.put(endpoint, {
        status,
        progressNote: note,
        proofImage: proof
      });

      alert("Updated Successfully");

    } catch (error) {

      console.log(error);

      alert("Update Failed");
    }
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">

    
      <div className="w-64 fixed left-0 top-0 h-screen bg-white shadow-md">
        <MunicipalSidebar />
      </div>

     
      <div className="flex-1 ml-64 p-8">

   
        <h1 className="text-3xl font-bold mb-4">

          {task.taskType === "Complaint"
            ? task.title
            : task.service}

        </h1>

        
        <p className="mb-2">
          <strong>Type:</strong> {task.taskType}
        </p>

     
        <p className="mb-2">
          <strong>Citizen:</strong> {task.citizen}
        </p>

        
        <p className="mb-4">
          <strong>Location:</strong> {task.location}
        </p>

       
        <label className="font-semibold">
          Status
        </label>

        <select
          value={status}
          onChange={(e) =>
            setStatus(e.target.value)
          }
          className="border p-2 w-full mt-2 rounded"
        >
          <option>Assigned</option>
          <option>Accepted</option>
          <option>In Progress</option>
          <option>Resolved</option>
          <option>Closed</option>
        </select>

      
        <label className="font-semibold block mt-5">
          Progress Note
        </label>

        <textarea
          value={note}
          onChange={(e) =>
            setNote(e.target.value)
          }
          placeholder="Enter progress note"
          className="border p-3 w-full mt-2 rounded"
          rows="5"
        />

        
        <label className="font-semibold block mt-5">
          Proof Image URL
        </label>

        <input
          value={proof}
          onChange={(e) =>
            setProof(e.target.value)
          }
          placeholder="Enter proof image URL"
          className="border p-3 w-full mt-2 rounded"
        />

        {proof && (

          <a
            href={proof}
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 underline block mt-3"
          >
            View Uploaded Proof
          </a>
        )}

  
        <button
          onClick={updateTask}
          className="bg-blue-600 text-white px-6 py-3 mt-6 rounded"
        >
          Update Task
        </button>

      </div>
    </div>
  );
}
