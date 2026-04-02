import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * GET /api/admin/subscribers
 * Returns all subscribers. Protected by a simple secret header check.
 * Usage: curl -H "x-admin-secret: <ADMIN_SECRET>" https://chrea.co/api/admin/subscribers
 */
export async function GET(req: NextRequest) {
  const secret = req.headers.get("x-admin-secret");

  if (!secret || secret !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const subscribers = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        joinedAt: true,
        createdAt: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({
      total: subscribers.length,
      subscribers,
    });
  } catch (error) {
    console.error("[admin/subscribers] DB error:", error);
    return NextResponse.json(
      { error: "Database error" },
      { status: 500 }
    );
  }
}
