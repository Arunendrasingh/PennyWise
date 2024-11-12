import { Q } from "@nozbe/watermelondb";

import { useEffect, useState } from "react";
import { database } from "../database/database";
import { Expense } from "../database/models";
import { ExpenseType } from "../config/types";

export function useExpenses(skip: number, limit: number) {
  const [expenses, setExpenses] = useState<ExpenseType[]>([]);

  useEffect(() => {
    const expenseCollection = database
      .get<Expense>("expenses")
      .query(Q.sortBy("date", Q.desc), Q.skip(skip), Q.take(limit));

    const subscription = expenseCollection.observe().subscribe((records) => {
      const latestExpenses = records.map((item) => ({
        id: item.id,
        notes: item.notes,
        amount: item.amount,
        date: item.date,
        category_id: item.category_id,
        user_id: item.user_id,
      }));

      setExpenses(latestExpenses);
    });

    return () => subscription.unsubscribe();
  }, []);

  return expenses;
}
