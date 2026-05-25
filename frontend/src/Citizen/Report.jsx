import React, { useState } from "react";
import API from "../services/api";

export default function Report() {

  const [form, setForm] = useState({
    title: "",
    location: "",
    category: "",
    priority: "Low"
  });

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      // logged in citizen email
      const citizenEmail =
        localStorage.getItem("email");

      await API.post("/complaints", {
        ...form,
        citizen: citizenEmail
      });

      alert("Complaint Submitted Successfully!");

      setForm({
        title: "",
        location: "",
        category: "",
        priority: "Low"
      });

    } catch (err) {

      console.log(err);

      alert("Failed to submit complaint");
    }
  };

  return (
    <div className="p-6">

      <h2 className="text-xl font-bold mb-4">
        Report Issue
      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-3"
      >

        <input
          placeholder="Title"
          value={form.title}
          className="border p-2 w-full"
          onChange={(e) =>
            setForm({
              ...form,
              title: e.target.value
            })
          }
        />

        <input
          placeholder="Location"
          value={form.location}
          className="border p-2 w-full"
          onChange={(e) =>
            setForm({
              ...form,
              location: e.target.value
            })
          }
        />

        <input
          placeholder="Category"
          value={form.category}
          className="border p-2 w-full"
          onChange={(e) =>
            setForm({
              ...form,
              category: e.target.value
            })
          }
        />

        <select
          value={form.priority}
          className="border p-2 w-full"
          onChange={(e) =>
            setForm({
              ...form,
              priority: e.target.value
            })
          }
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>

        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Submit
        </button>

      </form>
    </div>
  );
}