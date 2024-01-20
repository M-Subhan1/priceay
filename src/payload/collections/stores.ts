import { validateUrl } from "@/utils/validate-url";
import { CollectionConfig } from "payload/types";

export const Stores: CollectionConfig = {
  slug: "stores",
  admin: {
    useAsTitle: "name",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "name",
      label: "Name",
      type: "text",
      required: true,
      unique: true,
    },
    {
      name: "url",
      label: "Store URL",
      type: "text",
      required: true,
      validate: validateUrl,
    },
    {
      name: "storeImage",
      label: "Store Image",
      type: "upload",
      required: true,
      relationTo: "media",
    },
    {
      name: "storeTextEnglish",
      label: "Store Text (English)",
      type: "text",
    },
    {
      name: "storeTextArabic",
      label: "Store Text (Arabic)",
      type: "text",
    },
    {
      name: "moreTextEnglish",
      label: "More Text (English)",
      type: "text",
    },
    {
      name: "moreTextArabic",
      label: "More Text (Arabic)",
      type: "text",
    },
    {
      name: "discountCode",
      label: "Discount Code",
      type: "text",
    },
    {
      name: "conditions",
      label: "Conditions",
      type: "richText",
    },
  ],
};
