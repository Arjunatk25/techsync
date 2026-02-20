"use client";

import { useState } from "react";

export default function CreateEventPage() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    venue: "",
    capacity: 100,
  });

  const handleChange = (e: any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const res = await fetch("/api/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    alert(data.message || "Event created");

    if (res.ok) {
      window.location.href = "/";
    }
  };

  return (
    <div className="p-10 max-w-xl">
      <h1 className="text-3xl font-bold mb-6">
        Create Event
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          placeholder="Title"
          onChange={handleChange}
          required
          className="border p-2 w-full"
        />

        <textarea
          name="description"
          placeholder="Description"
          onChange={handleChange}
          required
          className="border p-2 w-full"
        />

        <input
          type="date"
          name="date"
          onChange={handleChange}
          required
          className="border p-2 w-full"
        />

        <input
          name="venue"
          placeholder="Venue"
          onChange={handleChange}
          required
          className="border p-2 w-full"
        />

        <input
          type="number"
          name="capacity"
          placeholder="Capacity"
          onChange={handleChange}
          className="border p-2 w-full"
        />

        <button
          type="submit"
          className="bg-black text-white px-4 py-2 rounded"
        >
          Create Event
        </button>
      </form>
    </div>
  );
}