import { MdTag } from "react-icons/md";

export default {
  name: "category",
  title: "Category",
  type: "document",
  icon: MdTag,
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "description",
      title: "Description",
      type: "text",
    },
  ],
};
