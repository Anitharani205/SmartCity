import React, { useState } from "react";
import API from "../services/api";

export default function Services() {

  const [form, setForm] = useState({
    service: "",
    location: "",
    date: ""
  });

  const handleBooking = async () => {

    try {

      // logged in citizen email
      const citizen =
        localStorage.getItem("email");

      console.log("LOGGED IN:", citizen);

      await API.post("/services", {
        ...form,
        citizen
      });

      alert("Service Booked Successfully!");

      setForm({
        service: "",
        location: "",
        date: ""
      });

    } catch (err) {

      console.log(err);

      alert("Booking Failed");
    }
  };

  return (
    <div className="p-6">

      <h2 className="text-2xl font-bold mb-6">
        Book Service
      </h2>

      <input
        placeholder="Service"
        value={form.service}
        className="border p-3 w-full mb-3"
        onChange={(e) =>
          setForm({
            ...form,
            service: e.target.value
          })
        }
      />

      <input
        placeholder="Location"
        value={form.location}
        className="border p-3 w-full mb-3"
        onChange={(e) =>
          setForm({
            ...form,
            location: e.target.value
          })
        }
      />

      <input
        type="datetime-local"
        value={form.date}
        className="border p-3 w-full mb-4"
        onChange={(e) =>
          setForm({
            ...form,
            date: e.target.value
          })
        }
      />

      <button
        onClick={handleBooking}
        className="bg-green-600 text-white px-5 py-2 rounded"
      >
        Book Service
      </button>

    </div>
  );
}