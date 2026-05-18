import { useState } from "react";
import Sidebar from "./components/Sidebar";
import {
  Clock,
  CheckCircle,
  Phone,
  MessageSquare
} from "lucide-react";

function BookingStatus() {

  const [status, setStatus] = useState("in-progress");
  const [eta, setEta] = useState("15 mins");
  const [chatOpen, setChatOpen] = useState(false);

  
  const handleReschedule = () => {
    const newTime = prompt("Enter new ETA (e.g. 30 mins):");
    if (newTime) {
      setEta(newTime);
      alert("Service rescheduled!");
    }
  };


  const handleCancel = () => {
    const confirmCancel = window.confirm("Are you sure you want to cancel?");
    if (confirmCancel) {
      setStatus("cancelled");
      alert("Booking cancelled");
    }
  };


  const handleChat = () => {
    setChatOpen(!chatOpen);
  };


  const handleCall = () => {
    alert("Calling technician...");
  };


  const handleSupport = () => {
    alert("Redirecting to Support Center...");
  };

  return (
    <div className="flex bg-gray-100">

      <div className="w-64 h-screen bg-white border-r flex flex-col justify-between fixed">
        <div>
          <Sidebar />
        </div>

        <div className="p-6 border-t">
          <p className="font-semibold">Alex Johnson</p>
          <p className="text-xs text-gray-500">
            Resident ID: #9921
          </p>
        </div>
      </div>

      <div className="flex-1 ml-64 p-10">

        <div className="flex justify-between items-center">

          <div>
            <p className="text-gray-400 text-sm">
              Services › Tracking
            </p>

            <h1 className="text-3xl font-bold">
              Booking Status
            </h1>

            <p className="text-gray-500">
              Reference ID: #CZ-88291
            </p>
          </div>

          <div className="space-x-3">
            <button
              onClick={handleReschedule}
              className="px-4 py-2 border rounded-lg"
            >
              Reschedule
            </button>

            <button
              onClick={handleCancel}
              className="px-4 py-2 border border-red-400 text-red-500 rounded-lg"
            >
              Cancel Booking
            </button>
          </div>
        </div>

      
        {status === "cancelled" && (
          <div className="mt-6 p-4 bg-red-100 text-red-600 rounded-lg">
            Booking has been cancelled
          </div>
        )}

        <div className="grid grid-cols-3 gap-6 mt-8">

          <div className="col-span-2 space-y-6">

            <div className="relative bg-white rounded-xl overflow-hidden shadow">

              <img
                src="https://miro.medium.com/v2/resize:fit:1400/1*O_9-IyvvMUVmr50nFRvQDA.png"
                alt="map"
                className="w-full"
              />

              <div className="absolute top-6 left-6 bg-white p-5 rounded-xl shadow">

                <div className="flex items-center gap-2 text-gray-600">
                  <Clock size={18} />
                  Estimated Arrival
                </div>

                <h2 className="text-3xl font-bold text-blue-600">
                  {eta}
                </h2>

                <p className="text-gray-500 text-sm">
                  Technician is 2.4 miles away
                </p>

              </div>

            </div>

            <div className="bg-white p-6 rounded-xl shadow flex items-center justify-between">

              <div className="flex gap-4 items-center">

                <img
                  src="https://randomuser.me/api/portraits/men/32.jpg"
                  className="w-20 h-20 rounded-lg"
                />

                <div>
                  <h2 className="text-xl font-bold">
                    Marcus Thorne
                  </h2>

                  <p className="text-sm text-gray-500">
                    Expert Technician • 5 years experience
                  </p>

                  <p className="text-yellow-500 text-sm mt-1">
                    ⭐ 4.9 (128 reviews)
                  </p>
                </div>

              </div>

              <div className="space-x-3">

                <button
                  onClick={handleChat}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                >
                  <MessageSquare size={16} />
                  Chat
                </button>

                <button
                  onClick={handleCall}
                  className="border px-4 py-2 rounded-lg flex items-center gap-2"
                >
                  <Phone size={16} />
                  Call
                </button>

              </div>

            </div>

          
            {chatOpen && (
              <div className="bg-white p-4 rounded-xl shadow">
                <p className="text-sm text-gray-500 mb-2">
                  Chat with technician
                </p>
                <input
                  className="w-full border p-2 rounded"
                  placeholder="Type a message..."
                />
              </div>
            )}

            <div className="bg-white p-6 rounded-xl shadow">
              <h2 className="font-semibold mb-4">
                Live Service Status
              </h2>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-400">Current Activity</p>
                  <p className="font-medium text-blue-600">
                    {status === "cancelled"
                      ? "Cancelled"
                      : "Traveling to Location"}
                  </p>
                </div>
              </div>
            </div>

          </div>

          <div className="space-y-6">

            <div className="bg-white p-6 rounded-xl shadow">
              <h2 className="font-semibold mb-4">
                Service Timeline
              </h2>

              <TimelineItem title="Request Received" time="Oct 24, 09:15 AM" done />
              <TimelineItem title="Technician Assigned" time="Oct 24, 10:02 AM" done />
              <TimelineItem title="Service In Progress" time="Marcus is on the way" active />
              <TimelineItem title="Service Completed" time="Expected at 11:30 AM" />
            </div>

            <div className="bg-white p-4 rounded-xl shadow flex justify-between items-center">

              <p className="text-gray-600">
                Need help?
              </p>

              <button
                onClick={handleSupport}
                className="text-blue-600 font-medium"
              >
                Support Center
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

function TimelineItem({ title, time, done, active }) {
  return (
    <div className="flex items-start gap-3 mb-4">
      <div>
        {done ? (
          <CheckCircle className="text-green-500" size={20} />
        ) : active ? (
          <Clock className="text-blue-600" size={20} />
        ) : (
          <div className="w-5 h-5 rounded-full bg-gray-300" />
        )}
      </div>

      <div>
        <p className={`font-medium ${active ? "text-blue-600" : ""}`}>
          {title}
        </p>
        <p className="text-sm text-gray-500">
          {time}
        </p>
      </div>
    </div>
  );
}

export default BookingStatus;
