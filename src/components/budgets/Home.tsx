import React, { useRef } from "react";
import { Link } from "expo-router";
import { FlatList, StyleSheet, Text, View, Animated } from "react-native";
import BudgetCardView from "@/src/components/budgets/BudgetCardView";
import { defaultColors } from "@/src/constants/Colors";
import BudgetDetailsCard from "@/src/components/budgets/BudgetDetailsCard";
import useBudgets from "@/src/hooks/useBudgets";
import { BudgetType } from "@/src/config/types";
import expenseTrackerStore from "@/src/store/expenceTracker";
import { useStore } from "zustand";

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

const Home = () => {
  const budgets: BudgetType[] = useBudgets(0, 10);

  const scrollY = useRef(new Animated.Value(0)).current;

  // Calculate dynamic height for Component 1
  const component1Height = scrollY.interpolate({
    inputRange: [0, 200], // Adjust 200 based on Component 1's initial height
    outputRange: [200, 0], // Shrinks from full height to 0
    extrapolate: "clamp",
  });

  // Budget Details
  // const [budgetDetail, setBudgetDetail] = expenseTrackerStore(state => [state.budgetDetail, state.setBudgetDetail]);
  const {totalBudgetDetail, setBudgetDetail} = useStore(expenseTrackerStore);

  
  
  // Count the budget detail
  function calculateBudgetUsage() {  
    // Calculate totals
    if (budgets.length === 0) {
      return;
    }

    // Print the budgets list
    console.log("Budgets: ", budgets);
    const totalBudget = budgets.reduce((sum, budget) => sum + parseFloat(budget.totalBudget), 0);
    const totalUsed = budgets.reduce((sum, budget) => sum + parseFloat(budget.usedBudget), 0);
  
    // Calculate percentage (avoid division by zero)
    const percentageUsed = Math.round(totalBudget > 0 ? (totalUsed / totalBudget) * 100 : 0);
    console.log("Total Budget: ", totalBudget);
    console.log("Total Used: ", totalUsed);
    console.log("Percentage Used: ", percentageUsed);
    setBudgetDetail({
      totalBudget,
      totalUsed,
      percentageUsed,
    });
  }


  // Use state to update the BudgetDetail card, as soon as the budgets are fetched
  React.useEffect(() => {
    calculateBudgetUsage();
  }, [budgets]);



  console.log("Budget Detail from Zustand: ", totalBudgetDetail)

  return (
    <View>
      <Animated.ScrollView
        // style={}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
      >
        <Animated.View style={{ height: component1Height }}>
          <BudgetCardView totalBudget={totalBudgetDetail.totalBudget} spentBudget={totalBudgetDetail.totalUsed} />
        </Animated.View>

        {/* TODO: Render list of budgets */}
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <Text style={styles.budgetHeader}>Budgets </Text>
            <View style={styles.addBudgetButton}>
              <Link href="/budgets/addBudget">
                <Text>+</Text>
              </Link>
            </View>
          </View>

          <View style={styles.budgetDetailList}>
            <FlatList
              data={budgets}
              renderItem={({ item }: BudgetType) => (
                <BudgetDetailsCard
                  name={item.title}
                  remaining={item.remainingBudget}
                  startTime={item.startDate}
                  endTime={item.endDate}
                  expense={item.usedBudget}
                  totalBudget={item.totalBudget}
                />
              )}
              scrollEnabled={false}
            />
          </View>
        </View>
      </Animated.ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    backgroundColor: defaultColors.paytmColors.backgroundWhite,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  headerContainer: {
    marginHorizontal: 20,
    marginVertical: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  budgetHeader: {
    fontSize: 26,
    fontWeight: "bold",
    color: defaultColors.paytmColors.textBlack,
  },
  budgetDetailList: {
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  addBudgetButton: {
    width: 25,
    height: 25,
    borderRadius: 20,
    backgroundColor: defaultColors.paytmColors.dividerGray,
    alignItems: "center",
    justifyContent: "center",
  },
});
