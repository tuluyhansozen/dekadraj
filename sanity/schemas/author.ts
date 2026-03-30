import { defineType, defineField } from "sanity";

export const author = defineType({
  name: "author",
  title: "Yazar",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "İsim",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "bio",
      title: "Biyografi",
      type: "text",
    }),
    defineField({
      name: "photo",
      title: "Fotoğraf",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "role",
      title: "Rol",
      type: "string",
      options: {
        list: [
          { title: "Yazar", value: "yazar" },
          { title: "Yayın Kurulu", value: "yayin-kurulu" },
          { title: "Konuk Yazar", value: "konuk-yazar" },
        ],
      },
      initialValue: "yazar",
    }),
  ],
  preview: {
    select: { title: "name", media: "photo" },
  },
});
