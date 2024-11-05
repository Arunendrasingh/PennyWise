import AddExpenseButton from "@/components/AddExpenseButton";
import { Text, View, StyleSheet, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import FontAwesome from "@expo/vector-icons/FontAwesome";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { colorBlue, lightGray } from "@/constants/Colors";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useEffect } from "react";
import {
  createBatchCategory,
  getCategories,
} from "@/database/utils/categoryManager";
import { categories } from "@/assets/data/defaultCategory";
// import { useUser } from "@/hooks/useProfile";

export default function Index(): JSX.Element {
  // Load app and if category is not created then create and set the record.
  useEffect(() => {
    async function loadDefaultCategory() {
      const category = await getCategories();
      if (category.length === 0) {
        const newCategory = await createBatchCategory(categories);
        console.log("Default Category: ", newCategory);
      }
    }

    loadDefaultCategory();
  }, []);
  return (
    <SafeAreaView>
      <View style={styles.container}>
        {/* Profile Container */}
        <View style={styles.profileContainer}>
          <View style={styles.profileImageContainer}>
            <Image
              source={require("@/assets/images/profile/profile.png")}
              style={styles.profileImage}
            />
            <View>
              <View style={styles.profileTextContainer}>
                <Text style={styles.profileText}>Hello</Text>
              </View>
              <Text style={styles.normalText}>Charles David: local user</Text>
            </View>
          </View>
          <View style={styles.bellContainer}>
            <FontAwesome name="bell-o" size={24} color="black" />
            <View style={styles.badge}>
              <Text style={styles.badgeText} />
            </View>
          </View>
        </View>
        {/* Total Expense Container */}
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
        <AddExpenseButton />
      </View>
    </SafeAreaView>
  );
}

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
