import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AddExpenseButton from "../AddExpenseButton";
import HomeProfile from "./HomeProfile";
import TargetExpenseView from "./TargetExpenseView";
import { colorBlue, defaultColors } from "@/src/constants/Colors";
import Card from "../Card";
import { useExpenses } from "@/src/hooks/useExpenses";
import { skip } from "@nozbe/watermelondb/QueryDescription";
import { Link } from "expo-router";

const Home = () => {
  // Load Recent Transaction from Database, load only 5 records, rest will show in history section

  const expenses = useExpenses(0, 5);

  return (
    <View style={styles.container}>
      {/* Profile Container */}
      <HomeProfile />
      {/* Total Expense Container */}
      <ScrollView>
        <TargetExpenseView />

        {/* Total Income and Expense Container */}
        <View style={styles.totalIncomeExpenseContainer}>
          <View style={styles.incomeExpenseContainer}>
            <View style={styles.amountCardContainer}>
              <View style={styles.incomeContainerIcon}>
                <MaterialIcons name="trending-up" size={24} color="green" />
              </View>
              <View style={styles.incomeExpenseContainerText}>
                <Text style={[styles.amountCardTextHeader, styles.incomeColor]}>
                  Income
                </Text>
                <Text style={styles.amountText}>$1000</Text>
              </View>
            </View>
            <View style={styles.amountCardContainer}>
              <View style={styles.expenseContainerIcon}>
                <MaterialIcons name="trending-down" size={24} color="red" />
              </View>
              <View style={styles.incomeExpenseContainerText}>
                <Text
                  style={[styles.amountCardTextHeader, styles.expenseColor]}
                >
                  Expense
                </Text>
                <Text style={styles.amountText}>$ 1000</Text>
              </View>
            </View>
          </View>
        </View>

        {/* 
        Create a View to display the  recent expenses
        */}
        {/* Recent Expenses */}
        <View style={styles.recentExpenseContainer}>
          <View style={styles.recentExpenseHeader}>
            <Text style={styles.recentExpenseHeaderText}>Recent Expenses</Text>
            <Link href="/budgets">
              <Text style={styles.viewAllText}>View All</Text>
            </Link>
          </View>

          {/* 8 Recent expenses will be displayed here */}
          {expenses.map((expense) => (
            <Card
              key={expense.id}
              title={expense.notes}
              amount={expense.amount}
              date={expense.date}
            />
          ))}
        </View>
      </ScrollView>
      <AddExpenseButton />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    // backgroundColor: lightGray,
    height: "100%",
  },
  // Income and Expense Container
  totalIncomeExpenseContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 20,
    width: "100%",
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  incomeExpenseContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 20,
  },
  amountCardContainer: {
    backgroundColor: "white",
    height: 100,
    width: "48%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  amountCardTextHeader: {
    fontWeight: "semibold",
    fontSize: 16,
    marginBottom: 5,
  },
  incomeColor: {
    color: "green",
  },
  expenseColor: {
    color: "red",
  },
  incomeContainerIcon: {
    backgroundColor: "#A5FEC8",
    padding: 20,
    borderRadius: 100,
  },
  expenseContainerIcon: {
    backgroundColor: "#FEBFC0",
    padding: 20,
    borderRadius: 100,
  },
  amountText: {
    fontWeight: "bold",
    fontSize: 20,
  },
  incomeExpenseContainerText: {
    alignItems: "center",
    paddingHorizontal: "auto",
  },
  // Statistics Container
  statisticsContainer: {
    backgroundColor: "green",
    height: 100,
    width: 100,
  },
  recentExpenseContainer: {
    paddingHorizontal: 10,
  },
  recentExpenseHeader: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  recentExpenseHeaderText: {
    fontSize: 18,
    fontWeight: "bold",
    color: defaultColors.paytmColors.textBlack,
  },
  viewAllText: {
    fontSize: 18,
    fontWeight: "bold",
    color: colorBlue,
  },
});
