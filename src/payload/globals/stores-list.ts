import { GlobalConfig } from "payload/types";

export const StoresList: GlobalConfig = {
  slug: "stores-list",
  fields: [
    {
      name: "content",
      label: "Content",
      type: "richText",
      required: true,
    },
  ],
};
