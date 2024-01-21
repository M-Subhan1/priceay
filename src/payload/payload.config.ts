import path from "path";
import { buildConfig } from "payload/config";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { slateEditor } from "@payloadcms/richtext-slate";
import { webpackBundler } from "@payloadcms/bundler-webpack";
import { Brands } from "./collections/brands";
import { Products } from "./collections/products";
import { Stores } from "./collections/stores";
import { StoresList } from "./globals/stores-list";
import { ContactUs } from "./globals/contact-us";
import { PrivacyPolicy } from "./globals/privacy-policy";
import { TermsAndConditions } from "./globals/terms-and-conditions";
import { cloudStorage } from "@payloadcms/plugin-cloud-storage";
import { s3Adapter } from "@payloadcms/plugin-cloud-storage/s3";

import Summary from "./views/summary";
import CustomNav from "./components/after-nav";
import Media from "./collections/media";

const storageAdapter = s3Adapter({
  config: {
    endpoint: process.env.S3_ENDPOINT,
    region: process.env.S3_REGION,
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY!,
      secretAccessKey: process.env.S3_SECRET_KEY!,
    },
  },
  bucket: process.env.S3_BUCKET_NAME!,
});

export default buildConfig({
  db: mongooseAdapter({
    url: process.env.MONGODB_URI as string,
  }),
  editor: slateEditor({}),
  admin: {
    bundler: webpackBundler(),
    components: {
      afterNavLinks: [CustomNav],
      views: {
        Summary: {
          Component: Summary,
          path: "/views/summary",
        },
      },
    },
  },
  plugins: [
    cloudStorage({
      collections: {
        media: {
          adapter: storageAdapter,
          disablePayloadAccessControl: true,
          disableLocalStorage: true,
        },
      },
    }),
  ],

  collections: [Products, Brands, Stores, Media],
  globals: [StoresList, ContactUs, PrivacyPolicy, TermsAndConditions],
  typescript: {
    outputFile: path.resolve(__dirname, "./payload-types.ts"),
  },
});
