import type { Config } from "drizzle-kit";
import { loadEnvConfig } from "@next/env";
import { cwd } from "process";

loadEnvConfig(cwd());

export default {
  schema: "./src/lib/drizzle/schema.ts",
  out: "./.drizzle",
  driver: "pg",
  dbCredentials: {
    connectionString: `postgresql://ni8fto:${process.env.XATA_API_KEY}@eu-west-1.sql.xata.sh/blazar:main?sslmode=require`,
  },
} satisfies Config;
