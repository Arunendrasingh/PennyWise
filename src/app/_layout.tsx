import { Stack } from "expo-router";
import { StyleSheet } from "react-native";
import { AuthProvider } from "@/src/context/AuthContext";
import { defaultColors } from "../constant/Color";

export default function RootLayout() {
  // Load the SplashScreen & hide

  console.log("Loading after authetnication");
  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      {/* <Stack.Screen
        name="expenses/AddExpense"
        options={{
          title: "Add New Transaction",
          headerStyle: styles.header,
          headerTitleStyle: styles.headerTitle,
          headerTitleAlign: "center",
        }}
      /> */}
      {/* <Stack.Screen
        name="categories"
        options={{
          title: "Categories",
          headerStyle: styles.header,
          headerTitleStyle: styles.headerTitle,
          headerBackVisible: false,
          headerTitleAlign: "center",
        }}
      /> */}
      <Stack.Screen
        name="budgets"
        options={{
          title: "Budgets",
          headerStyle: styles.header,
          headerTitleStyle: styles.headerTitle,
          headerBackVisible: false,
          headerTitleAlign: "left",
          // headerRight: () => <AddExpenseButton />,
        }}
      />
      </Stack>
    </AuthProvider>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  header: {
    paddingVertical: 18,
    paddingHorizontal: 16,
    backgroundColor: defaultColors.paytmColors.primaryBlue,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
  },
});