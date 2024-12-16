import { ExpenseType } from "@/src/config/types";
import { database } from "../database";
import { Budget, Expense, User } from "../models";
/**
 * Create methods to insert new expense, update an exiting expense and delete an existing expense
 */

/**
 * Creates a new expense in the database.
 *
 * @param expenseData - The data to create an expense with. Should have a `title`, `notes`, `amount`, `date`, `category_id` and `user_id`.
 * @returns The newly created `Expense` object.
 */
export function createExpense(
  notes: string,
  amount: number,
  date: Date,
  category_id: string,
  user_id: string
): Promise<Expense> {
  return database.write(async () => {
    const newExpense = await database
      .get<Expense>("expenses")
      .create((expense) => {
        expense.notes = notes;
        expense.amount = amount;
        expense.date = date;
        expense.isRecurring = false;
        expense._raw.category_id = category_id;
        expense._raw.user_id = user_id;
      });

    console.log("Created Expense: ", newExpense);
    return newExpense;
  });
}

export async function createExpenseWithBudgetUpdate(
  notes: string,
  amount: number,
  date: Date,
  budgetId: string,
  userId: string
) {
  return await database.write(async () => {
    const usersCollection = database.collections.get<User>("users");
    const budgetsCollection = database.collections.get<Budget>("budgets");

    // Fetch the user and budget by their IDs
    const user = await usersCollection.find(userId);
    const budget = await budgetsCollection.find(budgetId);

    if (!user) {
      throw new Error("User not found");
    }

    if (!budget) {
      throw new Error("Budget not found");
    }
    // Step 1: Create the new expense
    const expensesCollection = database.collections.get<Expense>("expenses");
    const newExpense = await expensesCollection.create((expense) => {
      expense.notes = notes;
      expense.amount = amount;
      expense.date = date;
      expense.isRecurring = false;
      expense.user.set(user);
      expense.budget.set(budget);
    });


    if (!budget) {
      throw new Error("Budget not found");
    }

    await budget.update((record) => {
      record.usedAmount += amount;
    });

    return newExpense; // Return the created expense if needed
  });
}
