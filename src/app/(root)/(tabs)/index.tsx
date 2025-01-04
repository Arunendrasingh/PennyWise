import { Text, View, StyleSheet } from "react-native";
import { Link } from "expo-router";
import { defaultColors } from "@/src/constant/Color";
import HomeProfile from "@/src/components/HomeProfile";

export default function Index() {
  return (
    <View
      style={styles.container}
    >
      <HomeProfile />
      <Link href={"/sign-in"}>Sign In</Link>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: defaultColors.paytmColors.backgroundWhite,
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
    padding: 10,
    borderRadius: 100,
  },
  expenseContainerIcon: {
    backgroundColor: "#FEBFC0",
    padding: 10,
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
    marginVertical: 20,
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
    color: defaultColors.paytmColors.primaryBlue,
  },
});