import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { colorBlue } from "@/src/constants/Colors";

const TargetExpenseView = () => {
  return (
    <View style={styles.budgetContainer}>
      <AnimatedCircularProgress
        size={240}
        width={15}
        fill={50}
        lineCap="square"
        arcSweepAngle={270}
        rotation={225}
        tintColor={colorBlue}
        onAnimationComplete={() => console.log("onAnimationComplete")}
        backgroundColor="#3d5875"
      >
        {() => (
          <View style={styles.budgetTextContainer}>
            <Text style={styles.budgetHeaderText}>Budged Used</Text>
            <View style={styles.budgetUsedContainer}>
              <Text style={[styles.budgetText, styles.expenseBudget]}>
                $ 40000
              </Text>
              <Text style={styles.budgetText}>/</Text>
              <Text style={styles.budgetText}>$ 1000000</Text>
            </View>
          </View>
        )}
      </AnimatedCircularProgress>
    </View>
  );
};

export default TargetExpenseView;

const styles = StyleSheet.create({
    container: {
      // backgroundColor: lightGray,
      height: "100%",
    },
    // Profile Container
    profileContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      width: "100%",
      marginVertical: 20,
      paddingHorizontal: 10,
    },
    profileImage: {
      width: 50,
      height: 50,
      borderRadius: 25,
      marginRight: 10,
    },
    profileText: {
      fontSize: 16,
      fontWeight: "bold",
    },
    normalText: {
      fontSize: 16,
    },
    profileTextContainer: {
      flexDirection: "column",
      alignItems: "flex-start",
    },
    profileImageContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    bellContainer: {
      position: "relative",
    },
    // Badge Container
    badge: {
      position: "absolute",
      right: 0,
      top: 0,
      backgroundColor: "red",
      borderRadius: 9,
      width: 10,
      height: 10,
      justifyContent: "center",
      alignItems: "center",
    },
    badgeText: {
      color: "white",
      fontSize: 3,
      fontWeight: "bold",
    },
    // Budget Container
    budgetTextContainer: {
      alignItems: "center",
      justifyContent: "center",
    },
    budgetContainer: {
      alignItems: "center",
      justifyContent: "center",
      marginVertical: 40,
    },
    budgetHeaderText: {
      fontSize: 22,
      // fontWeight: "",
      color: "gray",
    },
    budgetText: {
      fontSize: 16,
      color: "gray",
    },
    expenseBudget: {
      fontWeight: "bold",
      // fontSize: 19,
      color: "black",
    },
    budgetUsedContainer: {
      alignItems: "center",
      justifyContent: "center",
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
  });
