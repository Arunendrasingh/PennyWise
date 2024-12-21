import { database } from "../database";
import { Budget } from "../models";
import { Q } from '@nozbe/watermelondb';

async function getBudgetUsage(userId: string): Promise<{ totalBudget: number; totalUsed: number; percentageUsed: string }> {
  // Fetch all budgets for the specific user
  const budgets = await database.collections
    .get<Budget>('budgets')
    .query(Q.where('user_id', userId))
    .fetch();

  // Calculate totals
  const totalBudget = budgets.reduce((sum, budget) => sum + budget.amount, 0);
  const totalUsed = budgets.reduce((sum, budget) => sum + budget.usedAmount, 0);

  // Calculate percentage (avoid division by zero)
  const percentageUsed = totalBudget > 0 ? (totalUsed / totalBudget) * 100 : 0;

  return {
    totalBudget,
    totalUsed,
    percentageUsed: percentageUsed.toFixed(2), // Rounded to 2 decimal places
  };
}


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
