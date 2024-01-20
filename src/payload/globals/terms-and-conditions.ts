import { GlobalConfig } from "payload/types";

export const TermsAndConditions: GlobalConfig = {
  slug: "terms-and-conditions",
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
