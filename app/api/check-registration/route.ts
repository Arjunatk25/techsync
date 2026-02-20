import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { connectDB } from "@/lib/db";
import User from "@/lib/models/User";

export async function GET(req: Request) {
  const { userId } = await auth();
  const { searchParams } = new URL(req.url);
  const eventId = searchParams.get("eventId");

  if (!userId || !eventId) {
    return NextResponse.json({ registered: false });
  }

  await connectDB();

  const user = await User.findOne({ clerkId: userId });

  const registered = user?.registeredEvents.some(
    (id: any) => id.toString() === eventId
  );

  return NextResponse.json({ registered });
}