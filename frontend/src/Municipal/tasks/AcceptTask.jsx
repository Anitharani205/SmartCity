import React from "react";

export default function AcceptTask({
  selectedTask,
  updateTaskStatus,
}) {

  if (!selectedTask) return null;

  const currentStaff =
    localStorage.getItem("staffName");

  return (
    <div className="bg-white rounded-2xl shadow p-6">

      <h2 className="text-2xl font-bold mb-6">
        Accept Task
      </h2>

      <p>
        <strong>Task:</strong>
        {selectedTask.title}
      </p>

      <p className="mt-2">
        <strong>Status:</strong>
        {selectedTask.status}
      </p>

      <button
        onClick={() =>
          updateTaskStatus(
            selectedTask.id,
            "Accepted",
            currentStaff
          )
        }
        className="mt-6 bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-xl"
      >
        Accept Task
      </button>

    </div>
  );
}