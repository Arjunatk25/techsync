export const dynamic = "force-dynamic";

async function getEvents() {
  const res = await fetch("http://localhost:3000/api/events", {
    cache: "no-store",
  });

  return res.json();
}

export default async function Home() {
  const events = await getEvents();

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">
        TechSync Events
      </h1>

      {events.length === 0 ? (
        <p>No events available</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {events.map((event: any) => (
            <a
              key={event._id}
              href={`/events/${event._id}`}
              className="border p-6 rounded-xl shadow-md block"
            >
              <h2 className="text-xl font-semibold">
                {event.title}
              </h2>
              <p className="text-gray-600">
                {event.description}
              </p>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}