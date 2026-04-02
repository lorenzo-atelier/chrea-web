/**
 * CHRÉA — Sanity Studio embedded at /studio
 * Access at: https://chrea.co/studio
 */
"use client";

import dynamic from "next/dynamic";

// Dynamically import to avoid SSR issues with Sanity Studio
const NextStudioClient = dynamic(
  () => import("next-sanity/studio").then((mod) => {
    const { NextStudio } = mod;
    const config = require("@/sanity/sanity.config").default;
    return function StudioWrapper() {
      return <NextStudio config={config} />;
    };
  }),
  { ssr: false, loading: () => (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#2C3227",
      fontFamily: "system-ui, sans-serif",
      color: "#B8975A",
      fontSize: "0.85rem",
      letterSpacing: "0.2em",
      textTransform: "uppercase",
    }}>
      Loading CHRÉA Studio…
    </div>
  )}
);

export default function StudioPage() {
  return (
    <div style={{ height: "100vh" }}>
      <NextStudioClient />
    </div>
  );
}
