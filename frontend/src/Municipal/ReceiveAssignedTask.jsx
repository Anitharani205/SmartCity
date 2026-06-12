import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import MunicipalSidebar from "./components/MunicipalSidebar";

function ReceiveAssignedTask() {
  const [tasks, setTasks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();

  const itemsPerPage = 5;

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    const email = localStorage.getItem("email");
    if (!email) return;

    try {
      const complaintRes = await API.get(`/complaints/staff/${email}`);
      const serviceRes = await API.get(`/services/staff/${email}`);

      const complaints = complaintRes.data.map((item) => ({
        ...item,
        taskType: "Complaint",
      }));

      const services = serviceRes.data.map((item) => ({
        ...item,
        taskType: "Service",
      }));

      setTasks([...complaints, ...services]);
    } catch (error) {
      console.log(error);
    }
  };

  
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentTasks = tasks.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(tasks.length / itemsPerPage);

  
  const maxPagesToShow = 5;

  const visiblePages = Array.from(
    { length: Math.min(maxPagesToShow, totalPages) },
    (_, i) => i + 1
  );

  return (
    <div className="flex bg-gray-100 min-h-screen">

      <div className="w-64 fixed left-0 top-0 h-screen bg-white shadow-md">
        <MunicipalSidebar />
      </div>

      
      <div className="flex-1 ml-64 p-8 h-screen overflow-y-auto">

        <h1 className="text-3xl font-bold mb-8">
          Assigned Tasks
        </h1>

        {tasks.length === 0 ? (
          <div className="bg-white p-6 rounded shadow">
            No tasks assigned
          </div>
        ) : (
          <>
           
            <div className="space-y-4">
              {currentTasks.map((task) => (
                <div
                  key={task.id || task._id}
                  className="bg-white p-6 rounded shadow"
                >
                  <h2 className="text-xl font-bold mb-2">
                    {task.taskType === "Complaint"
                      ? task.title
                      : task.service}
                  </h2>

                  <p><strong>Type:</strong> {task.taskType}</p>
                  <p><strong>Citizen:</strong> {task.citizen}</p>
                  <p><strong>Location:</strong> {task.address}</p>
                  <p><strong>Status:</strong> {task.status}</p>

                  <button
                    onClick={() =>
                      navigate("/task", { state: task })
                    }
                    className="bg-blue-600 text-white px-4 py-2 rounded mt-3"
                  >
                    Open Task
                  </button>
                </div>
              ))}
            </div>

         
            <div className="flex justify-end items-center mt-8 gap-3">

              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
                className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
              >
                Prev
              </button>

            
              {visiblePages.map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-1 rounded border ${
                    currentPage === page
                      ? "bg-blue-600 text-white"
                      : "bg-white"
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
                className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
              >
                Next
              </button>

            </div>
          </>
        )}

      </div>
    </div>
  );
}

export default ReceiveAssignedTask;