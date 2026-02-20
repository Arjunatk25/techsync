import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { connectDB } from "@/lib/db";
import User from "@/lib/models/User";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();

  if (!userId) {
    redirect("/");
  }

  await connectDB();
  const user = await User.findOne({ clerkId: userId });

  if (!user || user.role !== "admin") {
    redirect("/");
  }

  return <>{children}</>;
}