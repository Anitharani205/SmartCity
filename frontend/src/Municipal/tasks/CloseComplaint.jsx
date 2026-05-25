import React from "react";

export default function CloseComplaint({
  selectedTask,
  updateTaskStatus,
}) {

  if (!selectedTask) return null;

  const handleCloseComplaint = () => {

    updateTaskStatus(selectedTask.id, "Closed");

 

    const notification = {
      id: Date.now(),
      citizen: selectedTask.citizen,
      message: `✅ Your complaint "${selectedTask.title}" has been resolved successfully.`,
      time: new Date().toLocaleString(),
      status: "unread",
    };

  
    const existingNotifications =
      JSON.parse(localStorage.getItem("citizenNotifications")) || [];

   
    existingNotifications.push(notification);

  
    localStorage.setItem(
      "citizenNotifications",
      JSON.stringify(existingNotifications)
    );

    alert("Complaint Closed & Citizen Notified ✅");
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow">

      <h2 className="text-xl font-bold mb-4">
        Close Complaint
      </h2>

      <button
        onClick={handleCloseComplaint}
        className="bg-black text-white px-4 py-2 rounded"
      >
        Close Complaint
      </button>

    </div>
  );
}