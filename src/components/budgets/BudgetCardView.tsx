import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { defaultColors } from "@/src/constants/Colors";

import { Bar } from "react-native-progress";

const BudgetCardView = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.budgetAmount}>$ 6000.00</Text>
      <View>
        <View style={[styles.budgetInfo, { marginBottom: 10 }]}>
          <Text style={[styles.budgetTextInfo, { fontSize: 16 }]}>
            Remaining at this month
          </Text>
          <Text style={styles.remainingBudgetPercentage}> 54%</Text>
        </View>
        <Bar width={null} />
        <View style={styles.budgetInfo}>
          <Text style={styles.budgetTextInfo}>Spent </Text>
          <Text style={styles.totalBudgetText}>$ 4000 </Text>
          <Text style={styles.budgetTextInfo}>of $ 8000</Text>
        </View>
      </View>
    </View>
  );
};

export default BudgetCardView;

const styles = StyleSheet.create({
  container: {
    height: 200,
    borderRadius: 10,
    margin: 8,
    paddingHorizontal: 10,
    shadowColor: defaultColors.paytmColors.primaryBlue,
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 2,
    backgroundColor: defaultColors.light.background,
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
});
