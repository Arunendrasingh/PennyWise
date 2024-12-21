import { Q } from "@nozbe/watermelondb";
import { database } from "@/src/database/database";
import { useEffect, useState } from "react";
import { Budget } from "../database/models";
import { create } from "zustand";

function useBudgets(skip: number, limit: number) {
  const [budgets, setBudgets] = useState([]);

  useEffect(() => {
    const budgetsCollection = database.get<Budget>("budgets").query(Q.sortBy("created_at", Q.desc), Q.skip(skip), Q.take(limit));

    const subscription = budgetsCollection.observe().subscribe((records) => {
      const newBudgetList = records.map((record) => {
        return {
          id: record.id,
          title: record.title,
          totalBudget: record.amount,
          usedBudget: record.usedAmount,
          remainingBudget: parseFloat(record.amount) - parseFloat(record.usedAmount),
          startDate: record.startDate.toDateString(),
          endDate: record.endDate.toDateString(),

        };
      });

      setBudgets(newBudgetList);
    });

    return () => subscription.unsubscribe();
  }, []);

  return budgets;
}

export default useBudgets;
