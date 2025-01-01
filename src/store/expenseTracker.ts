import { create } from "zustand";

interface ExpenseHistoryDetail {
  // Define the structure of an expense history detail
  id: string;
  amount: number;
  date: string;
  description: string;
}

interface BudgetDetail {
  // Define the structure of a budget detail
  total: number;
  spent: number;
  remaining: number;
}

interface User {
  // Define the structure of a user
  id: string;
  name: string;
  email: string;
}

interface ExpenseTrackerState {
  user: User | null;
  totalBudgetDetail: BudgetDetail | null;
  expenseHistory: ExpenseHistoryDetail[];
  setExpenseHistory: (newExpenseHistoryDetail: ExpenseHistoryDetail[]) => void;
  setBudgetDetail: (newBudgetDetail: BudgetDetail) => void;
  setUser: (newUser: User) => void;
}

const expenseTrackerStore = create<ExpenseTrackerState>()((set) => ({
  // Store State
  user: null,
  totalBudgetDetail: null,
  expenseHistory: [],

  // Store Action
  // Expense History set method
  setExpenseHistory: (newExpenseHistoryDetail) =>
    set((state) => ({
      ...state,
      expenseHistory: newExpenseHistoryDetail,
    })),
  setBudgetDetail: (newBudgetDetail) =>
    set((state) => ({
      ...state,
      totalBudgetDetail: newBudgetDetail,
    })),
  setUser: (newUser) => set((state) => ({ ...state, user: newUser })),
}));

export default expenseTrackerStore;
