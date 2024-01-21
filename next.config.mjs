// next.config.js
import "./env.mjs";
import path from "path";
import { withPayload } from "@payloadcms/next-payload";

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  swcMinify: false,
  images: {
    domains: ["localhost", "s3.ap-southeast-1.amazonaws.com"],
  },
  redirects: async () => {
    return [
      {
        source: "/",
        destination: "/ar",
        permanent: false,
      },
    ];
  },
};

export default withPayload(config, {
  // The second argument to `withPayload`
  // allows you to specify paths to your Payload dependencies
  // and configure the admin route to your Payload CMS.

  // Point to your Payload config (required)
  configPath: path.resolve(process.cwd(), "./src/payload/payload.config.ts"),

  // Point to custom Payload CSS (optional)
  // cssPath: path.resolve(__dirname, "./css/my-custom-payload-styles.css"),

  // Point to your exported, initialized Payload instance (optional, default shown below`)
  payloadPath: path.resolve(process.cwd(), "./src/payload/payloadClient.ts"),

  // Set a custom Payload admin route (optional, default is `/admin`)
  // NOTE: Read the "Set a custom admin route" section in the payload/next-payload README.
  adminRoute: "/admin",
});
