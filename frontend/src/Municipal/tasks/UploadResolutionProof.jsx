import React from "react";

export default function UploadResolutionProof({ selectedTask, updateTaskStatus }) {
  if (!selectedTask) return null;

  const handleUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      updateTaskStatus(selectedTask.id, "Resolved");
      alert("File Uploaded: " + file.name);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4">Upload Proof</h2>

      <input type="file" onChange={handleUpload} />
    </div>
  );
}