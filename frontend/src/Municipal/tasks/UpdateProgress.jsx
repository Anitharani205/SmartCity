import React, { useState } from "react";

export default function UpdateProgress({ selectedTask, updateTaskStatus }) {
  const [note, setNote] = useState("");

  if (!selectedTask) return null;

  const handleUpdate = () => {
    updateTaskStatus(selectedTask.id, "In Progress");
    alert("Progress Updated");
    setNote("");
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4">Update Progress</h2>

      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Enter progress..."
        className="w-full border p-3 rounded"
      />

      <button
        onClick={handleUpdate}
        className="mt-4 bg-yellow-500 text-white px-4 py-2 rounded"
      >
        Update
      </button>
    </div>
  );
}