import { useState } from "react";
import Sidebar from "./components/Sidebar";
import { MapPin, Calendar, Phone } from "lucide-react";

function Services() {

  const [category, setCategory] = useState("Plumbing");
  const [date, setDate] = useState(6);
  const [time, setTime] = useState("10:30 AM");
  const [description, setDescription] = useState("");

  const handleBooking = () => {

    if (!description) {
      alert("Please describe your issue");
      return;
    }

    const booking = {
      category,
      date,
      time,
      description,
      serviceId: "SRV" + Math.floor(Math.random() * 10000)
    };

    const oldBookings =
      JSON.parse(localStorage.getItem("services")) || [];

    oldBookings.push(booking);

    localStorage.setItem("services", JSON.stringify(oldBookings));

    alert("Service booked successfully!");

    setDescription("");
  };

  return (

    <div className="flex h-screen bg-gray-100 overflow-hidden">

      
      <Sidebar />

      
      <div className="flex-1 overflow-y-auto p-10">

        <h1 className="text-3xl font-bold mb-1">
          Book a Utility Service
        </h1>

        <p className="text-gray-500 mb-8">
          Select a category, schedule your visit, and confirm your details.
        </p>

        <div className="grid grid-cols-3 gap-8">

          
          <div className="col-span-2 space-y-8">

           
            <div>

              <h2 className="font-semibold text-lg mb-4">
                Service Category
              </h2>

              <div className="grid grid-cols-4 gap-4">

                <CategoryCard
                  title="Plumbing"
                  subtitle="Leaks & Repairs"
                  active={category === "Plumbing"}
                  onClick={() => setCategory("Plumbing")}
                />

                <CategoryCard
                  title="Electrical"
                  subtitle="Wiring & Fixtures"
                  active={category === "Electrical"}
                  onClick={() => setCategory("Electrical")}
                />

                <CategoryCard
                  title="Waste"
                  subtitle="Bulk Pickup"
                  active={category === "Waste"}
                  onClick={() => setCategory("Waste")}
                />

                <CategoryCard
                  title="Water Supply"
                  subtitle="Meter Issues"
                  active={category === "Water Supply"}
                  onClick={() => setCategory("Water Supply")}
                />

              </div>

            </div>

           
            <div>

              <h2 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <Calendar size={18} />
                Select Date & Time
              </h2>

              <div className="bg-white rounded-xl shadow p-6 grid grid-cols-2 gap-8">

               
                <div>

                  <h3 className="font-medium mb-4">
                    October 2023
                  </h3>

                  <div className="grid grid-cols-7 text-sm gap-2 text-center">

                    {["S", "M", "T", "W", "T", "F", "S"].map((d) => (
                      <div key={d} className="text-gray-400">{d}</div>
                    ))}

                    {[...Array(31).keys()].map((day) => (

                      <div
                        key={day}
                        onClick={() => setDate(day + 1)}
                        className={`p-2 rounded cursor-pointer
                        ${date === day + 1
                            ? "bg-blue-600 text-white"
                            : "hover:bg-gray-200"}`}
                      >
                        {day + 1}
                      </div>

                    ))}

                  </div>

                </div>

                
                <div>

                  <h3 className="text-gray-500 mb-4">
                    AVAILABLE SLOTS
                  </h3>

                  <div className="grid grid-cols-2 gap-3">

                    <TimeSlot time="09:00 AM" selected={time} setTime={setTime}/>
                    <TimeSlot time="10:30 AM" selected={time} setTime={setTime}/>
                    <TimeSlot time="01:00 PM" selected={time} setTime={setTime}/>
                    <TimeSlot time="02:30 PM" selected={time} setTime={setTime}/>
                    <TimeSlot time="04:00 PM" selected={time} setTime={setTime}/>
                    <TimeSlot time="05:30 PM" disabled/>

                  </div>

                </div>

              </div>

            </div>

           
            <div>

              <h2 className="font-semibold text-lg mb-3">
                Issue Description
              </h2>

              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full h-40 bg-white rounded-xl border p-4 outline-none"
                placeholder="Please describe the issue in detail (e.g., kitchen sink pipe is leaking slowly)..."
              />

            </div>

          </div>

          
          <div className="space-y-6">

           
            <div className="bg-white rounded-xl shadow overflow-hidden">

              <div className="p-4 border-b">

                <div className="flex justify-between items-center">

                  <div className="flex items-center gap-2">
                    <MapPin size={18} />
                    <p className="font-semibold">Service Address</p>
                  </div>

                  <button className="text-blue-600 text-sm">
                    Edit
                  </button>

                </div>

                <div className="mt-4">

                  <img
                    src="https://www.dwrl.utexas.edu/wp-content/uploads/2016/11/google-maps-new-interface1.jpg"
                    alt="Service Address"
                    className="w-full h-80 object-cover rounded-lg"
                  />

                </div>

              </div>

              <div className="p-4">

                <p className="font-semibold">Home</p>

                <p className="text-sm text-gray-500">
                  742 Evergreen Terrace, Springfield
                </p>

                <div className="flex justify-between mt-4 text-sm">
                  <span>Service Fee</span>
                  <span className="font-semibold">Rs.450.00</span>
                </div>

                <div className="flex justify-between mt-2 text-sm">
                  <span>Estimated Duration</span>
                  <span className="font-semibold">~1.5 Hours</span>
                </div>

                <button
                  onClick={handleBooking}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg mt-5 hover:bg-blue-700"
                >
                  Book Service →
                </button>

                <p className="text-xs text-gray-400 mt-2">
                  By booking, you agree to our Terms of Service.
                </p>

              </div>

            </div>

            
            <div className="bg-gray-900 text-white rounded-xl p-5 flex items-center gap-3">

              <Phone />

              <div>
                <p className="font-semibold">Need help booking?</p>
                <p className="text-sm text-gray-300">
                  Call our 24/7 hotline
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

  );
}

function CategoryCard({ title, subtitle, active, onClick }) {

  return (
    <div
      onClick={onClick}
      className={`p-5 rounded-xl border cursor-pointer
      ${active
        ? "border-blue-600 bg-blue-50"
        : "bg-white hover:border-gray-300"}`}
    >
      <p className="font-semibold">{title}</p>
      <p className="text-sm text-gray-500">{subtitle}</p>
    </div>
  );
}

function TimeSlot({ time, selected, setTime, disabled }) {

  return (
    <button
      disabled={disabled}
      onClick={() => setTime(time)}
      className={`py-2 rounded-lg border text-sm
      ${selected === time ? "bg-blue-600 text-white" : ""}
      ${disabled ? "opacity-40 cursor-not-allowed" : ""}
      ${selected !== time && !disabled ? "hover:bg-gray-100" : ""}`}
    >
      {time}
    </button>
  );
}

export default Services;
