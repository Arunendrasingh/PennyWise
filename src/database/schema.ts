import { appSchema, tableSchema } from "@nozbe/watermelondb";

const schema = appSchema({
  version: 3,
  tables: [
    tableSchema({
      name: "users",
      columns: [
        { name: "name", type: "string" },
        { name: "email", type: "string" },
        { name: "phone_number", type: "string" },
        { name: "created_at", type: "number" },
        { name: "updated_at", type: "number" },
      ],
    }),
    tableSchema({
      name: "budgets",
      columns: [
        { name: "title", type: "string" },
        { name: "amount", type: "number" },
        { name: "used_amount", type: "number" },
        { name: "user_id", type: "string" },
        { name: "start_at", type: "number" },
        { name: "end_at", type: "number" },
        { name: "created_at", type: "number" },
        { name: "updated_at", type: "number" },
      ],
    }),
    // tableSchema({
    //   name: "profiles",
    //   columns: [
    //     { name: "name", type: "string" },
    //     { name: "email", type: "string" },
    //     { name: "phone", type: "string" },
    //     { name: "avatar", type: "string", isOptional: true },
    //     { name: "user_id", type: "string", isIndexed: true },
    //     { name: "created_at", type: "number" },
    //     { name: "updated_at", type: "number" },
    //   ],
    // }),
    // tableSchema({
    //   name: "settings",
    //   columns: [
    //     { name: "currency", type: "string" },
    //     { name: "theme", type: "string" },
    //     { name: "user_id", type: "string", isIndexed: true },
    //     { name: "created_at", type: "number" },
    //     { name: "updated_at", type: "number" },
    //   ],
    // }),
    tableSchema({
      name: "expenses",
      columns: [
        { name: "notes", type: "string", isOptional: true },
        { name: "amount", type: "number" },
        { name: "date", type: "number" },
        { name: "is_recurring", type: "boolean" },
        // { name: "payment_method", type: "string", isOptional: true },
        { name: "budget_id", type: "string", isIndexed: true },
        { name: "user_id", type: "string", isIndexed: true },
        { name: "created_at", type: "number" },
        { name: "updated_at", type: "number" },
      ],
    }),
    tableSchema({
      name: "categories",
      columns: [
        { name: "name", type: "string" },
        { name: "icon", type: "string" },
        { name: "icon_library", type: "string" },
        { name: "description", type: "string" },
        { name: "created_at", type: "number" },
        { name: "updated_at", type: "number" },
      ],
    }),
    // tableSchema({
    //   name: "global_categories",
    //   columns: [
    //     { name: "name", type: "string" },
    //     { name: "icon", type: "string" },
    //     { name: "color", type: "string" },
    //     { name: "description", type: "string" },
    //   ],
    // }),
  ],
});

export default schema;
