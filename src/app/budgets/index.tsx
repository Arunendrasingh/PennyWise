import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import BudgetCardView from "@/src/components/budgets/BudgetCardView";
import { defaultColors } from "@/src/constants/Colors";
import BudgetDetailsCard from "@/src/components/budgets/BudgetDetailsCard";
import Home from "@/src/components/budgets/Home";

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
  return (
    <View>
      <Home />
    </View>
  );
};

export default index;
