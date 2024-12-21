import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { defaultColors } from "@/src/constants/Colors";
// import { Bar } from "react-native-progress";
import { Link } from "expo-router";
import MulticolorBar from "../MulticolorBar";

/**
 * BudgetCardView
 *
 * This component renders a budget card. The card displays the budget amount remaining this month, a progress bar, and the total budget amount.
 *
 * @return {React.ReactElement} BudgetCardView component
 */
const BudgetCardView = ({ totalBudget, spentBudget }) => {
  const remainingAmount = totalBudget - spentBudget;
  const percentageRemaining = (remainingAmount / totalBudget) * 100;
  const roundedPercentage = Math.max(0, Math.round(percentageRemaining));

  if (!totalBudget) {
    return (
      <View style={styles.card}>
        <Text style={styles.message}>
          You don't have any budgets yet! Start by adding a new budget.
        </Text>
        <View style={styles.addButton}>
          <Link href="/budgets/addBudget" style={styles.addButtonText}>
            +
          </Link>
        </View>
      </View>
    );
  }

  const barSegments = [
    { value: 10, style: { backgroundColor: '#4caf50' } }, // Green (40%)
    { value: 30, style: { backgroundColor: '#ff9800' } }, // Orange (30%)
    { value: 20, style: { backgroundColor: '#f44336' } }, // Red (20%)
    { value: 10, style: { backgroundColor: '#2196f3' } }, // Blue (10%)
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.budgetAmount}>$ {totalBudget}</Text>
      <View>
        <View style={[styles.budgetInfo, { marginBottom: 10 }]}>
          <Text style={[styles.budgetTextInfo, { fontSize: 16 }]}>
            Remaining at this month
          </Text>
          <Text style={styles.remainingBudgetPercentage}> {roundedPercentage}%</Text>
        </View>
        <MulticolorBar segments={barSegments}
        barHeight={15}
        barStyle={{ marginVertical: 0 }}
        />
        {/* <Bar width={null} /> */}
        <View style={styles.budgetInfo}>
          <Text style={styles.budgetTextInfo}>Spent </Text>
          <Text style={styles.totalBudgetText}>$ {spentBudget} </Text>
          <Text style={styles.budgetTextInfo}>of $ {totalBudget}</Text>
        </View>
      </View>
    </View>
  );
};

export default BudgetCardView;

const styles = StyleSheet.create({
  container: {
    height: 180,
    borderRadius: 10,
    margin: 8,
    paddingHorizontal: 10,
    shadowColor: defaultColors.paytmColors.primaryBlue,
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 2,
    backgroundColor: defaultColors.paytmColors.dividerGray,
  },
  budgetAmount: {
    fontSize: 45,
    fontWeight: "bold",
    color: defaultColors.paytmColors.text,
  },
  budgetInfo: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
  },
  budgetTextInfo: {
    color: defaultColors.paytmColors.secondaryTextGray,
    fontSize: 19,
    fontWeight: "bold",
  },
  remainingBudgetPercentage: {
    fontWeight: "bold",
    marginStart: 40,
    fontSize: 18,
    color: defaultColors.paytmColors.greenColor,
  },
  totalBudgetText: {
    color: defaultColors.paytmColors.text,
    fontWeight: "800",
    fontSize: 18,
  },
  card: {
    backgroundColor: defaultColors.paytmColors.backgroundWhite,
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 20,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  message: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
    marginBottom: 15,
    fontWeight: "500",
  },
  addButton: {
    backgroundColor: defaultColors.paytmColors.primaryBlue,
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonText: {
    fontSize: 40,
    color: defaultColors.paytmColors.backgroundWhite,
    fontWeight: "bold",
  },
});
