import { defineType, defineField } from "sanity";

export const founder = defineType({
  name: "founder",
  title: "Founder",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Full Name",
      type: "string",
      initialValue: "Christeena",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      description: "Short one-liner that appears under the name",
    }),
    defineField({
      name: "photo",
      title: "Photo",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          title: "Alt Text",
          type: "string",
        },
      ],
    }),
    defineField({
      name: "bio",
      title: "Full Bio",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "Heading", value: "h2" },
          ],
          marks: {
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" },
            ],
          },
        },
      ],
      description: "Rich text bio — shown in the About section",
    }),
    defineField({
      name: "shortBio",
      title: "Short Bio (homepage)",
      type: "text",
      rows: 5,
      description: "Plain text version used in the homepage split layout",
    }),
    defineField({
      name: "credentials",
      title: "Credentials / Certifications",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", title: "Label", type: "string" },
            { name: "year", title: "Year", type: "string" },
          ],
          preview: {
            select: { title: "label", subtitle: "year" },
          },
        },
      ],
    }),
    defineField({
      name: "socialLinks",
      title: "Personal Social Links",
      type: "object",
      fields: [
        { name: "instagram", title: "Instagram URL", type: "url" },
        { name: "linkedin", title: "LinkedIn URL", type: "url" },
      ],
    }),
  ],
  preview: {
    select: {
      title: "name",
      media: "photo",
    },
    prepare({ title, media }) {
      return {
        title: title || "Founder Profile",
        media,
      };
    },
  },
});
