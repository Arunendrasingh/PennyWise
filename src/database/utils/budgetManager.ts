import { database } from "../database";
import { Budget } from "../models";

export function createBudgets(
  title: string,
  amount: number,
  startDate: Date,
  endDate: Date,
  category_id: string,
  user_id: string
): Promise<Budget> {
  return database.write(async () => {
    console.log("Writing new Budgets: ", title)
    const budget = await database.get<Budget>("budgets").create((budget) => {
      budget.title = title;
      budget.amount = amount;
      budget.startDate = startDate;
      budget.endDate = endDate;
      budget._raw.category_id = category_id;
      budget._raw.user_id = user_id;
    });
    console.log("On the final Budget: ", budget)
    return budget;
  });
}
