import { GlobalConfig } from "payload/types";

export const PrivacyPolicy: GlobalConfig = {
  slug: "privacy-policy",
  fields: [
    {
      name: "content",
      label: "Content",
      type: "richText",
      required: true,
    },
  ],
};
