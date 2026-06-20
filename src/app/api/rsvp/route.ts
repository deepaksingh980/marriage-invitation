import { NextResponse } from "next/server";
import { connectDB, RsvpModel } from "@/lib/mongodb";
import { sendAdminNotification, sendGuestConfirmation } from "@/lib/mailer";

export async function POST(request: Request) {
  let body: {
    name?: string;
    email?: string;
    phone?: string;
    guests?: string;
    attendance?: "yes" | "no";
    meal?: string;
    message?: string;
  };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { name, email, phone, guests = "1", attendance, meal, message } = body;

  if (!name?.trim() || !attendance) {
    return NextResponse.json({ error: "Name and attendance are required." }, { status: 400 });
  }

  // ── 1. Save to MongoDB (critical) ─────────────────────────────────────────
  try {
    await connectDB();
    await RsvpModel.create({ name, email, phone, guests, attendance, meal, message });
  } catch (dbError) {
    console.error("[RSVP] MongoDB save failed:", dbError);
    return NextResponse.json({ error: "Could not save your RSVP. Please try again." }, { status: 500 });
  }

  // ── 2. Send emails (non-critical — never block the RSVP response) ─────────
  const emailTasks: Promise<void>[] = [
    sendAdminNotification({ name, email, phone, guests, attendance, meal, message }),
  ];

  if (email?.trim()) {
    emailTasks.push(sendGuestConfirmation({ name, email: email.trim(), attendance }));
  }

  // allSettled never throws — email failure is silently logged
  const results = await Promise.allSettled(emailTasks);
  results.forEach((r, i) => {
    if (r.status === "rejected") {
      console.error(`[RSVP] Email task ${i} failed:`, r.reason);
    }
  });

  return NextResponse.json({ success: true });
}
