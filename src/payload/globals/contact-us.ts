import { GlobalConfig } from "payload/types";

export const ContactUs: GlobalConfig = {
  slug: "contact-us",
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
