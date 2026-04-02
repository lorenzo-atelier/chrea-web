/**
 * CHRÉA — Sanity Studio embedded at /studio
 *
 * Access at: https://chrea.co/studio
 * Requires: NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET env vars
 */
import { NextStudio } from "next-sanity/studio";
import config from "@/sanity/sanity.config";

export { metadata, viewport } from "next-sanity/studio";

export default function StudioPage() {
  return <NextStudio config={config} />;
}
