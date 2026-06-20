import mongoose, { Schema, Document } from "mongoose";

const URI = (process.env.MONGO_URI ?? "").trim();
if (!URI) throw new Error("MONGO_URI is not set in .env");

// Singleton to avoid creating multiple connections in Next.js dev (hot-reload)
const cache: {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
} = (global as unknown as { __mongoCache: typeof cache }).__mongoCache ?? {
  conn: null,
  promise: null,
};
(global as unknown as { __mongoCache: typeof cache }).__mongoCache = cache;

export async function connectDB(): Promise<typeof mongoose> {
  if (cache.conn) return cache.conn;
  if (!cache.promise) {
    cache.promise = mongoose.connect(URI, { bufferCommands: false });
  }
  cache.conn = await cache.promise;
  return cache.conn;
}

// ── RSVP Model ────────────────────────────────────────────────────────────────

export interface IRsvp extends Document {
  name: string;
  email?: string;
  phone?: string;
  guests: string;
  attendance: "yes" | "no";
  meal?: string;
  message?: string;
  submittedAt: Date;
}

const RsvpSchema = new Schema<IRsvp>({
  name:        { type: String, required: true },
  email:       { type: String },
  phone:       { type: String },
  guests:      { type: String, default: "1" },
  attendance:  { type: String, enum: ["yes", "no"], required: true },
  meal:        { type: String },
  message:     { type: String },
  submittedAt: { type: Date, default: () => new Date() },
});

export const RsvpModel =
  (mongoose.models.Rsvp as mongoose.Model<IRsvp>) ??
  mongoose.model<IRsvp>("Rsvp", RsvpSchema);
