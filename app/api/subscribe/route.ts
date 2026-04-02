import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendWelcomeEmail } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email } = body;

    // ── Validation ─────────────────────────────────────────────────────────────
    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    const normalizedEmail = email.trim().toLowerCase();

    // ── Database: upsert subscriber ────────────────────────────────────────────
    let isNewSubscriber = true;

    try {
      const existing = await prisma.user.findUnique({
        where: { email: normalizedEmail },
      });

      if (existing) {
        isNewSubscriber = false;
        console.log(`[subscribe] Already subscribed: ${normalizedEmail}`);
      } else {
        await prisma.user.create({
          data: {
            email: normalizedEmail,
            role: "subscriber",
          },
        });
        console.log(`[subscribe] New subscriber saved: ${normalizedEmail}`);
      }
    } catch (dbError) {
      // If DB isn't configured yet, log and continue (graceful degradation)
      console.error("[subscribe] DB error (non-fatal):", dbError);
      // Still send welcome email if it's a new subscription attempt
    }

    // ── Email: send welcome (only for new subscribers) ─────────────────────────
    if (isNewSubscriber) {
      const emailResult = await sendWelcomeEmail(normalizedEmail);
      if (!emailResult.success) {
        console.warn("[subscribe] Welcome email failed:", emailResult.error);
        // Non-fatal — subscriber is saved, email failed
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: isNewSubscriber
          ? "Bienvenida al flock."
          : "Ya eres parte del flock.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[subscribe] Unexpected error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
