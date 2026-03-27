import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { projectId, dataset } from "./env";
import { article } from "./schemas/article";
import { author } from "./schemas/author";
import { category } from "./schemas/category";
import { topic } from "./schemas/topic";
import { blockContent } from "./schemas/blockContent";
import { siteSettings } from "./schemas/siteSettings";

export default defineConfig({
  name: "dekadraj",
  title: "Dekadraj CMS",
  projectId,
  dataset,
  basePath: "/studio",
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("İçerik")
          .items([
            S.listItem()
              .title("Site Ayarları")
              .child(
                S.document()
                  .schemaType("siteSettings")
                  .documentId("siteSettings")
              ),
            S.divider(),
            ...S.documentTypeListItems().filter(
              (item) => !["siteSettings"].includes(item.getId()!)
            ),
          ]),
    }),
    visionTool(),
  ],
  schema: {
    types: [article, author, category, topic, blockContent, siteSettings],
  },
});
