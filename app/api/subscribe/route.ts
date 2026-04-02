import { NextRequest, NextResponse } from "next/server";

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

    // ── Stub: DB + email not configured yet ────────────────────────────────────
    // TODO: Re-enable Prisma + Resend once env vars are set on Vercel
    // import { prisma } from "@/lib/prisma";
    // import { sendWelcomeEmail } from "@/lib/email";
    console.log(`[subscribe] New signup: ${normalizedEmail} (DB not configured yet)`);

    return NextResponse.json(
      {
        success: true,
        message: "Bienvenida al flock.",
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
