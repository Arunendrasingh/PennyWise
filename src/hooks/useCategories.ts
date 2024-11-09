import { CategoryType } from "@/src/config/types";
import { database } from "@/src/database/database";
import { Category } from "@/src/database/models";
import { getCategories } from "@/src/database/utils/categoryManager";
import { useEffect, useState } from "react";

function useCategories() {
  const [categories, setCategories] = useState<CategoryType[]>([]);

  useEffect(() => {
    const categoryCollection = database.get<Category>("categories").query();

    const subscription = categoryCollection.observe().subscribe((records) => {
      const newCategoryList = records.map((record) => {
        return {
          id: record.id,
          name: record.name,
          icon: record.icon,
          iconLibrary: record.iconLibrary,
          description: record.description,
        };
      });

      setCategories(newCategoryList);
    });

    return () => subscription.unsubscribe();
  }, []);

  return categories;
}

export default useCategories;
