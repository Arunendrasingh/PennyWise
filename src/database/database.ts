import { Database } from "@nozbe/watermelondb";
import SQLiteAdapter from "@nozbe/watermelondb/adapters/sqlite";
import schema from "./schema";
import { Budget, Category, Expense, User } from "./models";

// First, create the adapter to the underlying database:
const adapter = new SQLiteAdapter({
  schema,
  dbName: "pennyWiseDB",
  jsi: false,
  onSetUpError: (error) => {
    console.log("Failed to create database due to: ", error);
    console.error("Failed to create database due to: ", error);
  },
});

// Then, make a Watermelon database from it!
export const database = new Database({
  adapter,
  modelClasses: [User, Expense, Category, Budget],
});
