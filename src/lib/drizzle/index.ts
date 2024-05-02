import { drizzle } from "drizzle-orm/node-postgres";
import { getXataClient } from "@/lib/xata"; // Generated client
import { Client } from "pg";

const xata = getXataClient();
const client = new Client({ connectionString: xata.sql.connectionString });

client.connect();

export const test = xata.sql.connectionString;

export const db = drizzle(client);
