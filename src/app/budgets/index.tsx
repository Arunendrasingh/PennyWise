import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import BudgetCardView from "@/src/components/budgets/BudgetCardView";
import { defaultColors } from "@/src/constants/Colors";
import BudgetDetailsCard from "@/src/components/budgets/BudgetDetailsCard";


type Budget = {
  id: string;
  category: string;
  total: number;
  spent: number;
  remaining: number;
  startDate: string;
  endDate: string;
  dateAdded: string;
  lastTransactions: string[];
};

const index = () => {
  const budgets: Budget[] = [
    {
      id: "1",
      category: "Groceries",
      total: 500,
      spent: 200,
      remaining: 300,
      startDate: "2024-12-01",
      endDate: "2024-12-31",
      dateAdded: "2024-11-30",
      lastTransactions: ["Bought vegetables - $50", "Bought fruits - $30"],
    },
    {
      id: "2",
      category: "Movie",
      total: 500,
      spent: 200,
      remaining: 300,
      startDate: "2024-12-01",
      endDate: "2024-12-31",
      dateAdded: "2024-11-30",
      lastTransactions: ["Bought vegetables - $50", "Bought fruits - $30"],
    },
    {
      id: "3",
      category: "Gim",
      total: 500,
      spent: 200,
      remaining: 300,
      startDate: "2024-12-01",
      endDate: "2024-12-31",
      dateAdded: "2024-11-30",
      lastTransactions: ["Bought vegetables - $50", "Bought fruits - $30"],
    },
    {
      id: "4",
      category: "Others",
      total: 500,
      spent: 200,
      remaining: 300,
      startDate: "2024-12-01",
      endDate: "2024-12-31",
      dateAdded: "2024-11-30",
      lastTransactions: ["Bought vegetables - $50", "Bought fruits - $30"],
    },
    {
      id: "5",
      category: "Family",
      total: 500,
      spent: 200,
      remaining: 300,
      startDate: "2024-12-01",
      endDate: "2024-12-31",
      dateAdded: "2024-11-30",
      lastTransactions: ["Bought vegetables - $50", "Bought fruits - $30"],
    },
    // Add more budget items here
  ];
  return (
    <View>
      <BudgetCardView />
      {/* TODO: Render list of budgets */}
      <View style={styles.container}>
        <Text style={styles.budgetHeader}>Budgets</Text>

        {/* Render a Flat-list for each budget */}
        {/* <BudgetScreen /> */}
        <View style={styles.budgetDetailList}>
          <FlatList
            data={budgets}
            renderItem={({ item }) => (
              <BudgetDetailsCard
                name={item.category}
                remaining={item.remaining}
                startTime={item.startDate}
                endTime={item.endDate}
                expense={item.spent}
                totalBudget={item.total}
              />
            )}
          />
        </View>
      </View>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    backgroundColor: defaultColors.paytmColors.backgroundWhite,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  budgetHeader: {
    marginTop: 20,
    marginStart: 15,
    fontSize: 26,
    fontWeight: "bold",
  },
  budgetDetailList: {
    paddingHorizontal: 20,
  },
});
