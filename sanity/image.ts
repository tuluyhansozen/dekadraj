import { createImageUrlBuilder } from "@sanity/image-url";
import { projectId, dataset } from "./env";

// Build a standalone builder so it never receives null
const builder = createImageUrlBuilder({ projectId: projectId || "placeholder", dataset });

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function urlFor(source: any) {
  return builder.image(source);
}
