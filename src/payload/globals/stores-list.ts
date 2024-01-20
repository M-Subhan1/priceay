import { GlobalConfig } from "payload/types";

export const StoresList: GlobalConfig = {
  slug: "stores-list",
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "content",
      label: "Content",
      type: "richText",
      required: true,
    },
  ],
};
