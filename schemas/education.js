import { MdOutlineSchool } from "react-icons/md";

export default {
  name: "education",
  title: "Utdanning",
  type: "document",
  icon: MdOutlineSchool,
  fields: [
    {
      title: "Language",
      type: "string",
      name: "language",
      options: {
        list: [
          { title: "English", value: "en" },
          { title: "Norsk", value: "no" },
        ],
      },
    },
    {
      name: "title",
      title: "Tittel",
      type: "string",
    },
    {
      name: "school",
      title: "Skole",
      type: "string",
    },
    {
      name: "image",
      title: "Bilde",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "categories",
      title: "Emner",
      type: "array",
      of: [{ type: "reference", to: { type: "category" } }],
    },
    {
      name: "start",
      title: "Startet",
      type: "datetime",
    },
    {
      name: "end",
      title: "Sluttet",
      type: "datetime",
    },
    {
      name: "description",
      title: "Beskrivelse",
      type: "string",
    },
  ],

  preview: {
    select: {
      title: "title",
      media: "image",
    },
    prepare(selection) {
      const { author } = selection;
      return Object.assign({}, selection, {
        subtitle: author && `by ${author}`,
      });
    },
  },
};
