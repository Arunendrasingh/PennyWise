import { categories } from "@/assets/data/defaultCategory";
import { create } from "zustand";
import { Budget } from "../database/models";

const expenseTrackerStore = create((set) => ({
  // Store State
  user: null,
  totalBudgetDetail: null,
  // Store Action

  setBudgetDetail: (newBudgetDetail) =>
    set((state) => ({
      ...state,
      totalBudgetDetail: newBudgetDetail,
    })),
  setUser: (newUser) => set((state) => ({ ...state, user: newUser })),
}));

export default expenseTrackerStore;
