import { appSchema, tableSchema } from "@nozbe/watermelondb";

const schema = appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: "users",
      columns: [{ name: "name", type: "string" },
        {name: "email", type: "string"},
        
      ],
    }),
  ],
});