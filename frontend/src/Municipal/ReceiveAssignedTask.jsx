import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import MunicipalSidebar from "./components/MunicipalSidebar";

function ReceiveAssignedTask() {

  const [tasks, setTasks] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    loadTasks();
  }, []);

  // LOAD BOTH COMPLAINTS + SERVICES
  const loadTasks = async () => {

    const email = localStorage.getItem("email");

    if (!email) {
      console.log("No email found in localStorage");
      return;
    }

    try {

      // COMPLAINT TASKS
      const complaintRes = await API.get(
        `/complaints/staff/${email}`
      );

      // SERVICE TASKS
      const serviceRes = await API.get(
        `/services/staff/${email}`
      );

      // ADD TYPE
      const complaints = complaintRes.data.map((item) => ({
        ...item,
        taskType: "Complaint"
      }));

      const services = serviceRes.data.map((item) => ({
        ...item,
        taskType: "Service"
      }));

      // MERGE
      setTasks([...complaints, ...services]);

    } catch (error) {

      console.log("Error loading tasks:", error);
    }
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">

      {/* SIDEBAR */}
      <div className="w-64 fixed left-0 top-0 h-screen bg-white shadow-md">
        <MunicipalSidebar />
      </div>

      {/* CONTENT */}
      <div className="flex-1 ml-64 p-8">

        <h1 className="text-3xl font-bold mb-8">
          Assigned Tasks
        </h1>

        {tasks.length === 0 ? (

          <div className="bg-white p-6 rounded shadow">
            No tasks assigned
          </div>

        ) : (

          <div className="space-y-4">

            {tasks.map((task) => (

              <div
                key={task.id || task._id}
                className="bg-white p-6 rounded shadow hover:shadow-lg transition"
              >

                {/* TITLE */}
                <h2 className="text-xl font-bold mb-2">

                  {task.taskType === "Complaint"
                    ? task.title
                    : task.service}

                </h2>

                {/* TYPE */}
                <p className="mb-1">
                  <strong>Type:</strong> {task.taskType}
                </p>

                {/* CITIZEN */}
                <p className="mb-1">
                  <strong>Citizen:</strong> {task.citizen}
                </p>

                {/* LOCATION */}
                <p className="mb-1">
                  <strong>Location:</strong> {task.location}
                </p>

                {/* STATUS */}
                <p className="mb-3">
                  <strong>Status:</strong> {task.status}
                </p>

                {/* OPEN TASK */}
                <button
                  onClick={() =>
                    navigate("/task", {
                      state: task
                    })
                  }
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Open Task
                </button>

              </div>
            ))}

          </div>
        )}

      </div>
    </div>
  );
}

export default ReceiveAssignedTask;