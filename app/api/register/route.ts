import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { connectDB } from "@/lib/db";
import User from "@/lib/models/User";
import mongoose from "mongoose";

export async function POST(req: Request) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

  await connectDB();

  const { eventId } = await req.json();

  let user = await User.findOne({ clerkId: userId });

  // Auto create user if first time
  if (!user) {
    user = await User.create({
      clerkId: userId,
      registeredEvents: [],
    });
  }

  const objectEventId = new mongoose.Types.ObjectId(eventId);

  const alreadyRegistered = user.registeredEvents.some(
    (id: any) => id.toString() === eventId
  );

  if (alreadyRegistered) {
    return NextResponse.json(
      { message: "Already registered" },
      { status: 400 }
    );
  }

  user.registeredEvents.push(objectEventId);
  await user.save();

  return NextResponse.json({ message: "Registered successfully" });
}