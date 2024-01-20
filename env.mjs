import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(["development", "test", "production"]),
    MONGODB_URI: z.string(),
    PAYLOAD_SECRET: z.string(),
    PAYLOAD_CONFIG_PATH: z.string(),
    S3_BUCKET_NAME: z.string(),
    S3_REGION: z.string(),
    S3_ENDPOINT: z.string().url(),
    S3_ACCESS_KEY: z.string(),
    S3_SECRET_KEY: z.string(),
  },
  client: {
    NEXT_PUBLIC_API_URL: z.string().url(),
    NEXT_PUBLIC_APP_URL: z.string().url(),
  },
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    MONGODB_URI: process.env.MONGODB_URI,
    PAYLOAD_SECRET: process.env.PAYLOAD_SECRET,
    PAYLOAD_CONFIG_PATH: process.env.PAYLOAD_CONFIG_PATH,
    S3_BUCKET_NAME: process.env.S3_BUCKET_NAME,
    S3_REGION: process.env.S3_REGION,
    S3_ENDPOINT: process.env.S3_ENDPOINT,
    S3_ACCESS_KEY: process.env.S3_ACCESS_KEY,
    S3_SECRET_KEY: process.env.S3_SECRET_KEY,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  },
});
