import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./index";

export default defineConfig({
  name: "chrea",
  title: "CHRÉA Studio",

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "placeholder",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("CHRÉA")
          .items([
            S.listItem()
              .title("Site Settings")
              .id("siteSettings")
              .child(
                S.document()
                  .schemaType("siteSettings")
                  .documentId("siteSettings")
              ),
            S.listItem()
              .title("Founder Profile")
              .id("founder")
              .child(
                S.document()
                  .schemaType("founder")
                  .documentId("founder")
              ),
            S.divider(),
            ...S.documentTypeListItems().filter(
              (item) =>
                item.getId() &&
                !["siteSettings", "founder"].includes(item.getId()!)
            ),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
});
