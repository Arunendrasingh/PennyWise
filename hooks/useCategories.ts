import { CategoryType } from "@/config/types";
import { database } from "@/database/database";
import { Category } from "@/database/models";
import { getCategories } from "@/database/utils/categoryManager";
import { useEffect, useState } from "react";

function useCategories() {
  const [categories, setCategories] = useState<CategoryType[]>([]);

  useEffect(() => {
    const categoryCollection = database.get<Category>("categories").query();

    console.log("Category Collection: ", categoryCollection);

    const subscription = categoryCollection.observe().subscribe((records) => {
      console.log("SubscriptionRecords: ", records);
      const newCategoryList = records.map((record) => {
        console.log("Record: ", record);
        return {
          id: record.id,
          name: record.name,
          icon: record.icon,
          iconLibrary: record.iconLibrary,
          description: record.description,
        };
      });

      console.log("Setting Categories: ", newCategoryList);
      setCategories(newCategoryList);
    });

    console.log("Subsciption: ", subscription);

    return () => subscription.unsubscribe();
  }, []);

  return categories;
}

export default useCategories;
