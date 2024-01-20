import { GlobalConfig } from "payload/types";

export const TermsAndConditions: GlobalConfig = {
  slug: "terms-and-conditions",
  fields: [
    {
      name: "content",
      label: "Content",
      type: "richText",
      required: true,
    },
  ],
};
