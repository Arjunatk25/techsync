export const dynamic = "force-dynamic";

import { auth } from "@clerk/nextjs/server";
import { connectDB } from "@/lib/db";
import User from "@/lib/models/User";
import Event from "@/lib/models/Event";
import Link from "next/link";

export default async function Dashboard() {
  const { userId } = await auth();

  if (!userId) {
    return <div className="p-10">Please login</div>;
  }

  await connectDB();

  let user = await User.findOne({ clerkId: userId });

  if (!user) {
    user = await User.create({
      clerkId: userId,
      registeredEvents: [],
    });
  }

  const events = await Event.find({
    _id: { $in: user.registeredEvents },
  });

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">
        My Registered Events
      </h1>

      {events.length === 0 ? (
        <p>No events registered yet.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {events.map((event: any) => (
            <Link
              key={event._id}
              href={`/events/${event._id}`}
              className="border p-6 rounded-xl shadow-md block"
            >
              <h2 className="text-xl font-semibold">
                {event.title}
              </h2>
              <p>{event.description}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}