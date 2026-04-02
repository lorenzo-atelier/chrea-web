import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const checks: Record<string, { status: "ok" | "error"; message?: string }> = {};

  // DB check
  try {
    await prisma.$queryRaw`SELECT 1`;
    checks.database = { status: "ok" };
  } catch (e) {
    checks.database = { status: "error", message: String(e) };
  }

  // Env vars check
  const requiredEnvVars = [
    "DATABASE_URL",
    "NEXT_PUBLIC_SANITY_PROJECT_ID",
    "RESEND_API_KEY",
  ];
  const missingEnv = requiredEnvVars.filter(
    (k) =>
      !process.env[k] ||
      process.env[k]?.includes("placeholder")
  );
  checks.env = missingEnv.length === 0
    ? { status: "ok" }
    : { status: "error", message: `Missing or placeholder: ${missingEnv.join(", ")}` };

  const allOk = Object.values(checks).every((c) => c.status === "ok");

  return NextResponse.json(
    {
      status: allOk ? "ok" : "degraded",
      version: process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7) || "local",
      checks,
      timestamp: new Date().toISOString(),
    },
    { status: allOk ? 200 : 503 }
  );
}
