import { GlobalConfig } from "payload/types";

export const ContactUs: GlobalConfig = {
  slug: "contact-us",
  fields: [
    {
      name: "content",
      label: "Content",
      type: "richText",
      required: true,
    },
  ],
};