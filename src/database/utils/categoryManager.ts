import { CategoryType } from "@/config/types";
import { database } from "../database";
import { Category } from "../models";

function createCategory(
  name: string,
  icon: string,
  iconLibrary: string,
  desc: string
) {
  return database.write(async () => {
    return await database.get<Category>("categories").create((category) => {
      category.name = name;
      category.icon = icon;
      category.iconLibrary = iconLibrary;
      category.description = desc;
    });
  });
}

function getCategories() {
  return database.get<Category>("categories").query().fetch();
}

function createBatchCategory(categories: CategoryType[]) {
  return database.write(async () => {
    const categoryBatchOp = categories.map((category) =>
      database.get<Category>("categories").prepareCreate((categories) => {
        categories.name = category.name;
        categories.icon = category.icon;
        categories.iconLibrary = category.iconLibrary;
        categories.description = category.description;
      })
    );

    const batchCreateResult = await database.batch(...categoryBatchOp);
    console.log("Batch Operation: ", batchCreateResult);
    return batchCreateResult;
  });
}

export { createCategory, createBatchCategory, getCategories };
