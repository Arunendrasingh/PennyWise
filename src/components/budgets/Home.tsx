import React, { useRef } from "react";
import { Link } from "expo-router";
import { FlatList, StyleSheet, Text, View, Animated } from "react-native";
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

const Home = () => {
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

  const scrollY = useRef(new Animated.Value(0)).current;

  // Calculate dynamic height for Component 1
  const component1Height = scrollY.interpolate({
    inputRange: [0, 200], // Adjust 200 based on Component 1's initial height
    outputRange: [200, 0], // Shrinks from full height to 0
    extrapolate: "clamp",
  });

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
          <BudgetCardView />
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
