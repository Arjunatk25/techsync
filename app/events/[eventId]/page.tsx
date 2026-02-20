"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function EventPage() {
  const params = useParams();
  const eventId = params.eventId as string;

  const [event, setEvent] = useState<any>(null);

  useEffect(() => {
    fetch("/api/events")
      .then((res) => res.json())
      .then((data) => {
        const found = data.find(
          (e: any) => e._id === eventId
        );
        setEvent(found);
      });
  }, [eventId]);

  const register = async () => {
    const res = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        eventId,
      }),
    });

    const data = await res.json();
    alert(data.message);
  };

  if (!event) return <div className="p-10">Loading...</div>;

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold">
        {event.title}
      </h1>
      <p className="mt-4">{event.description}</p>
      <p className="mt-2">
        {new Date(event.date).toDateString()}
      </p>
      <p>{event.venue}</p>

      <button
        onClick={register}
        className="mt-6 bg-black text-white px-4 py-2 rounded"
      >
        Register
      </button>
    </div>
  );
}