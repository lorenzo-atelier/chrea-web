import { defineType, defineField } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Site Title",
      type: "string",
      initialValue: "CHRÉA — Un universo para volver a ti.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Site Description",
      type: "text",
      rows: 3,
      initialValue:
        "Un espacio de conversación consciente. Para mujeres que saben que hay algo más.",
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "socialLinks",
      title: "Social Links",
      type: "object",
      fields: [
        {
          name: "instagram",
          title: "Instagram URL",
          type: "url",
        },
        {
          name: "spotify",
          title: "Spotify URL",
          type: "url",
        },
        {
          name: "youtube",
          title: "YouTube URL",
          type: "url",
        },
        {
          name: "tiktok",
          title: "TikTok URL",
          type: "url",
        },
      ],
    }),
    defineField({
      name: "contactEmail",
      title: "Contact Email",
      type: "string",
    }),
    defineField({
      name: "seo",
      title: "Default SEO",
      type: "object",
      fields: [
        {
          name: "metaTitle",
          title: "Default Meta Title",
          type: "string",
        },
        {
          name: "metaDescription",
          title: "Default Meta Description",
          type: "text",
          rows: 3,
        },
        {
          name: "ogImage",
          title: "Default OG Image",
          type: "image",
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare({ title }) {
      return {
        title: title || "Site Settings",
        subtitle: "Global configuration",
      };
    },
  },
});
