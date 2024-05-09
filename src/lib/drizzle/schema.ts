import {
  timestamp,
  pgTable,
  text,
  primaryKey,
  integer,
  bigserial,
  serial,
  boolean,
  json,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const userTable = pgTable("user", {
  id: text("id").primaryKey(),
  email: text("email").unique(),
  emailVerified: boolean("email_verified").notNull().default(false),
  // TODO: Create an id suffix for the username
  passwordHash: text("password_hash"),
});

export const userInsertSchema = createInsertSchema(userTable);
export const userSelectSchema = createSelectSchema(userTable);

export type UserInsertSchema = typeof userTable.$inferInsert;
export type UserSelectSchema = typeof userTable.$inferSelect;

export const sessionTable = pgTable("session", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
});

export const sessionInsertSchema = createInsertSchema(sessionTable);
export const sessionSelectSchema = createSelectSchema(sessionTable);

export type SessionInsertSchema = typeof sessionTable.$inferInsert;
export type SessionSelectSchema = typeof sessionTable.$inferSelect;

export const emailVerificationTable = pgTable("email_verification", {
  id: serial("id").primaryKey(),
  code: text("code"),
  userId: text("user_id")
    .unique()
    .references(() => userTable.id),
  email: text("email"),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
});

export const emailVerificationInsertSchema = createInsertSchema(
  emailVerificationTable
);
export const emailVerificationSelectSchema = createSelectSchema(
  emailVerificationTable
);

export type EmailVerificationInsertSchema =
  typeof emailVerificationTable.$inferInsert;
export type EmailVerificationSelectSchema =
  typeof emailVerificationTable.$inferSelect;

export const passwordResetTokenTable = pgTable("password_reset_token", {
  id: serial("id").primaryKey(),
  tokenHash: text("token_hash").unique(),
  userId: text("user_id").references(() => userTable.id),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
});

export const workspaceTable = pgTable("workspace", {
  id: bigserial("id", { mode: "number" }).primaryKey(),
  // TODO: Create a unique constraint for the workspace name for users (not globally unique)
  name: text("name"),
  userId: text("user_id").references(() => userTable.id),
});

export const workspaceInsertSchema = createInsertSchema(workspaceTable);
export const workspaceSelectSchema = createSelectSchema(workspaceTable);

export type WorkspaceInsertSchema = typeof workspaceTable.$inferInsert;
export type WorkspaceSelectSchema = typeof workspaceTable.$inferSelect;

export const accountTable = pgTable("account", {
  id: bigserial("id", { mode: "number" }).primaryKey(),
  userId: text("user_id").references(() => userTable.id),
  username: text("username"),
  avatar: json("avatar").default({
    url: null,
    alt: null,
  }),
});

export const accountInsertSchema = createInsertSchema(accountTable);
export const accountSelectSchema = createSelectSchema(accountTable);

export type AccountInsertSchema = typeof accountTable.$inferInsert;
export type AccountSelectSchema = typeof accountTable.$inferSelect;
