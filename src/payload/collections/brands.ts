import { CollectionConfig } from "payload/types";
import slugify from "slugify";

export const Brands: CollectionConfig = {
  slug: "brands",
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
      index: true,
    },
    {
      name: "startsWith",
      label: "Starts With",
      type: "text",
      index: true,
      hooks: {
        beforeValidate: [
          ({ siblingData }) => {
            return siblingData.name[0].toUpperCase();
          },
        ],
      },
    },
    {
      name: "slug",
      type: "text",
      index: true,
      hooks: {
        beforeValidate: [
          ({ value, siblingData }) => {
            if (!value) {
              return slugify(siblingData.name, {
                lower: true,
              });
            }

            return value;
          },
        ],
      },
    },
  ],
};
