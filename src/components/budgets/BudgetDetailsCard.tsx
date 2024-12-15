import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Bar } from "react-native-progress";
import { defaultColors } from "@/src/constants/Colors";
import { generateHexColor } from "@/src/utils/colorUtils";

interface BudgetDetailsProps {
  name: string;
  progress: number; // Progress as a decimal (e.g., 0.5 for 50%)
  startTime: string;
  endTime: string;
  remaining: number;
  expense: number;
  totalBudget: number;
}

const BudgetDetailsCard: React.FC<BudgetDetailsProps> = ({
  name,
  progress,
  startTime,
  endTime,
  remaining,
  expense,
  totalBudget,
}) => {
  const backgroundColor = generateHexColor(name);
  return (
    <View style={styles.outerContainer}>
      <View style={styles.container}>
        <View style={[styles.tip, { backgroundColor: backgroundColor }]} />
        <Text style={styles.budgetName}>{name}</Text>
        <Bar width={null} progress={0.1} color={backgroundColor} />
        <View style={styles.dateRow}>
          <Text style={styles.dateText}>{startTime}</Text>
          <Text style={styles.dateText}>to {endTime}</Text>
        </View>
        {/* <View style={styles.divider} /> */}
        <View style={styles.detailsContainer}>
          <Text style={styles.detailText}>
            Remaining: ${remaining.toFixed(2)}
          </Text>
          <Text style={styles.detailText}>Expense: ${expense.toFixed(2)}</Text>
          <Text style={styles.detailText}>
            Total Budget: ${totalBudget.toFixed(2)}
          </Text>
        </View>
        {/* <View style={styles.divider} /> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    paddingHorizontal: 10,
  },
  container: {
    borderStartWidth: 2,
    borderColor: defaultColors.paytmColors.darkGray,
    paddingStart: 15,
    paddingBottom: 10
  },
  tip: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#2196F3",
    position: "absolute",
    top: 0,
    left: -11,
  },
  budgetName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: defaultColors.paytmColors.textBlack,
  },
  dateRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  dateText: {
    fontSize: 14,
    color: "#757575",
  },
  divider: {
    height: 1,
    backgroundColor: "#ddd",
    marginVertical: 10,
  },
  detailsContainer: {
    marginHorizontal: 50,
    paddingLeft: 10,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: defaultColors.paytmColors.primaryBlue,
  },
  detailText: {
    fontSize: 16,
    marginVertical: 5,
  },
});

export default BudgetDetailsCard;
