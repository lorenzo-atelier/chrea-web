import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email } = body;

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // TODO: Integrate Resend email service
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from: "CHRÉA <hola@chrea.com>",
    //   to: [email],
    //   subject: "Bienvenida al flock ✦",
    //   html: "<p>Gracias por unirte a CHRÉA...</p>",
    // });

    // TODO: Save to database via Prisma
    // await prisma.user.create({
    //   data: { email, role: "subscriber" },
    // });

    console.log(`[subscribe] New subscriber: ${email}`);

    return NextResponse.json(
      { success: true, message: "Bienvenida al flock." },
      { status: 200 }
    );
  } catch (error) {
    console.error("[subscribe] Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
