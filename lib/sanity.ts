import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "placeholder",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  useCdn: process.env.NODE_ENV === "production",
});

// Image URL builder
const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: Parameters<typeof builder.image>[0]) {
  return builder.image(source);
}

// ─── GROQ Queries ──────────────────────────────────────────────────────────────

export async function getSiteSettings() {
  return sanityClient.fetch(`*[_type == "siteSettings"][0]{
    title,
    description,
    logo,
    socialLinks,
    contactEmail,
    seo
  }`);
}

export async function getFounder() {
  return sanityClient.fetch(`*[_type == "founder"][0]{
    name,
    tagline,
    photo,
    bio,
    shortBio,
    credentials,
    socialLinks
  }`);
}

export async function getPosts(limit = 10) {
  return sanityClient.fetch(`*[_type == "post"] | order(publishedAt desc) [0...$limit]{
    _id,
    title,
    slug,
    excerpt,
    coverImage,
    category,
    tags,
    publishedAt,
    readTime
  }`, { limit });
}

export async function getPostBySlug(slug: string) {
  return sanityClient.fetch(`*[_type == "post" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    excerpt,
    coverImage,
    category,
    tags,
    publishedAt,
    readTime,
    body,
    seo
  }`, { slug });
}
