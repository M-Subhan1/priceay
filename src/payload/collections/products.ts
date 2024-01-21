import { validateUrl } from "@/utils/validate-url";
import { CollectionConfig } from "payload/types";
import slugify from "slugify";

export const Products: CollectionConfig = {
  slug: "products",
  admin: {
    useAsTitle: "nameEnglish",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "nameEnglish",
      label: "Name (English)",
      type: "text",
      required: true,
      index: true,
    },
    {
      name: "nameArabic",
      label: "Name (Arabic)",
      type: "text",
      required: true,
      index: true,
    },
    {
      name: "slug",
      label: "Slug",
      type: "text",
      index: true,
      hooks: {
        beforeValidate: [
          ({ value, siblingData }) => {
            if (!value) {
              return slugify(siblingData.nameEnglish, {
                lower: true,
              });
            }

            return value;
          },
        ],
      },
    },
    {
      name: "brand",
      label: "Brand",
      type: "relationship",
      relationTo: "brands",
      required: true,
    },
    {
      name: "gender",
      label: "Gender",
      type: "select",
      required: true,
      options: ["Male", "Female", "Unisex"],
    },
    {
      name: "productImage",
      label: "Product Image",
      type: "upload",
      required: true,
      relationTo: "media",
    },
    {
      name: "variants",
      label: "Variants",
      type: "array",
      required: true,
      minRows: 1,
      fields: [
        {
          name: "name",
          label: "Name",
          type: "text",
          required: true,
        },
        {
          name: "stores",
          type: "array",
          minRows: 1,
          fields: [
            {
              name: "name",
              label: "Name",
              type: "text",
              required: true,
            },
            {
              name: "store",
              label: "Store",
              type: "relationship",
              relationTo: "stores",
            },
            {
              name: "link",
              label: "Product Link",
              type: "text",
              required: true,
              validate: validateUrl,
            },
            {
              name: "price",
              label: "Price",
              type: "number",
              required: true,
            },
            {
              name: "sku",
              label: "Product SKU",
              type: "text",
              required: true,
            },
          ],
        },
      ],
    },
  ],
};
