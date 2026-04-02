import { defineType, defineField } from "sanity";

export const page = defineType({
  name: "page",
  title: "Page",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "object",
      fields: [
        {
          name: "metaTitle",
          title: "Meta Title",
          type: "string",
        },
        {
          name: "metaDescription",
          title: "Meta Description",
          type: "text",
          rows: 3,
        },
        {
          name: "ogImage",
          title: "Open Graph Image",
          type: "image",
        },
      ],
    }),
    defineField({
      name: "hero",
      title: "Hero Section",
      type: "object",
      fields: [
        {
          name: "headline",
          title: "Headline",
          type: "string",
        },
        {
          name: "subtitle",
          title: "Subtitle",
          type: "string",
        },
        {
          name: "ctaPrimary",
          title: "CTA Primary Label",
          type: "string",
        },
        {
          name: "ctaSecondary",
          title: "CTA Secondary Label",
          type: "string",
        },
      ],
    }),
    defineField({
      name: "content",
      title: "Page Content",
      type: "array",
      of: [
        {
          type: "block",
        },
        {
          type: "image",
          options: { hotspot: true },
        },
      ],
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
    }),
  ],
  preview: {
    select: {
      title: "title",
      slug: "slug.current",
    },
    prepare({ title, slug }) {
      return {
        title,
        subtitle: slug ? `/${slug}` : "Draft",
      };
    },
  },
});
