import { GlobalConfig } from "payload/types";

export const PrivacyPolicy: GlobalConfig = {
  slug: "privacy-policy",
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
