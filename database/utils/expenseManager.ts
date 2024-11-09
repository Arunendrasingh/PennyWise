import { ExpenseType } from "@/config/types";
import { database } from "../database";
import { Expense } from "../models";
/**
 * Create methods to insert new expense, update an exiting expense and delete an existing expense
 */

/**
 * Creates a new expense in the database.
 *
 * @param expenseData - The data to create an expense with. Should have a `title`, `notes`, `amount`, `date`, `category_id` and `user_id`.
 * @returns The newly created `Expense` object.
 */
export function createExpense(notes: string, amount: number, date: Date, category_id: string, user_id: string): Promise<Expense> {
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
