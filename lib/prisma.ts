import { PrismaClient } from "../generated/prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";

const globalForPrisma = globalThis as unknown as {
  prisma: InstanceType<typeof PrismaClient> | undefined;
};

function createPrismaClient() {
  const connectionString = process.env.DATABASE_URL;
  const isConfigured = connectionString && !connectionString.includes("placeholder");

  if (!isConfigured) {
    console.warn("[prisma] DATABASE_URL not configured — DB operations will fail");
    // Return a "dummy" client that fails gracefully at query time, not at build time
    const adapter = new PrismaNeon({ connectionString: "postgresql://placeholder:placeholder@localhost:5432/chrea" });
    return new PrismaClient({ adapter });
  }

  const adapter = new PrismaNeon({ connectionString });
  return new PrismaClient({ adapter });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
