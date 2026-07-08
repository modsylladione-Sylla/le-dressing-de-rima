import { boolean, integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const products = pgTable("products", {
  id: serial().primaryKey(),
  category: text().notNull(),
  name: text().notNull(),
  description: text().notNull().default(""),
  price: text().notNull().default(""),
  image: text().notNull().default(""),
  video: text(),
  position: integer().notNull().default(0),
  active: boolean().notNull().default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
