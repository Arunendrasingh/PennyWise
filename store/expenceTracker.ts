import { create } from "zustand";

const expenseTrackerStore = create((set) => ({
  // Store State
  user: null,

  // Store Action
  setUser: (newUser) => set((state) => ({ ...state, user: newUser })),
}));

export default expenseTrackerStore;
