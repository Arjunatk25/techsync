import "./globals.css";
import { ClerkProvider, SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { connectDB } from "@/lib/db";
import User from "@/lib/models/User";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();

  let isAdmin = false;

  if (userId) {
    await connectDB();
    const user = await User.findOne({ clerkId: userId });
    if (user?.role === "admin") {
      isAdmin = true;
    }
  }

  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <nav className="p-4 bg-black text-white flex justify-between items-center">
            
            {/* Left side */}
            <div className="flex gap-6">
              <a href="/">Home</a>
              <a href="/dashboard">My Events</a>
              {isAdmin && <a href="/admin/create-event">Create Event</a>}
            </div>

            {/* Right side */}
            <div>
              <SignedOut>
                <SignInButton>
                  <button className="bg-white text-black px-4 py-2 rounded">
                    Login
                  </button>
                </SignInButton>
              </SignedOut>

              <SignedIn>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>
            </div>

          </nav>

          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}