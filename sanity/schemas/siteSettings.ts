import { defineType, defineField } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Ayarları",
  type: "document",
  fields: [
    defineField({
      name: "aboutContent",
      title: "Hakkımızda İçeriği",
      type: "blockContent",
    }),
    defineField({
      name: "manifestoQuote",
      title: "Manifesto Alıntısı",
      type: "string",
      description: "Anasayfadaki büyük alıntı metni",
    }),
    defineField({
      name: "manifestoAttribution",
      title: "Alıntı Sahibi",
      type: "string",
      description: "Alıntının kime ait olduğu",
    }),
    defineField({
      name: "instagramUrl",
      title: "Instagram URL",
      type: "url",
    }),
    defineField({
      name: "twitterUrl",
      title: "X (Twitter) URL",
      type: "url",
    }),
    defineField({
      name: "letterboxdUrl",
      title: "Letterboxd URL",
      type: "url",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Site Ayarları" };
    },
  },
});
