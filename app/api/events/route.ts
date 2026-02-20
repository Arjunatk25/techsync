import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Event from "@/lib/models/Event";
import { auth } from "@clerk/nextjs/server";
import User from "@/lib/models/User";

export async function GET() {
  await connectDB();
  const events = await Event.find();
  return NextResponse.json(events);
}

export async function POST(req: Request) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

  await connectDB();

  const body = await req.json();

  const event = await Event.create(body);

  return NextResponse.json(event);
}