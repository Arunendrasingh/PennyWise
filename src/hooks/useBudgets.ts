// import { CategoryType } from "@/src/config/types";
import { database } from "@/src/database/database";
// import { Category } from "@/src/database/models";
// import { getCategories } from "@/src/database/utils/categoryManager";
import { useEffect, useState } from "react";
import { Budget } from "../database/models";

function useBudgets() {
  const [budgets, setBudgets] = useState([]);

  useEffect(() => {
    const budgetsCollection = database.get<Budget>("budgets").query();

    const subscription = budgetsCollection.observe().subscribe((records) => {
      const newBudgetList = records.map((record) => {
        return {
          id: record.id,
          title: record.title,
        };
      });

      setBudgets(newBudgetList);
    });

    return () => subscription.unsubscribe();
  }, []);

  return budgets;
}

export default useBudgets;
