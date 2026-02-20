import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  clerkId: { type: String, required: true, unique: true },
  role: { type: String, default: "attendee" },
  registeredEvents: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Event" },
  ],
});

export default mongoose.models.User ||
  mongoose.model("User", userSchema);