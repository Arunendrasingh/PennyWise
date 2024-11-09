import { Stack } from "expo-router/stack";
import { StyleSheet } from "react-native";

export default function Layout() {
  /** Layout
   * Setup the user name entry interface here
   */
  
  return (
    <Stack id="ad">
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="expenses/AddExpense"
        options={{
          title: "Add New Transaction",
          headerStyle: styles.header,
          headerTitleStyle: styles.headerTitle,
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="categories"
        options={{
          title: "Categories",
          headerStyle: styles.header,
          headerTitleStyle: styles.headerTitle,
          headerBackVisible: false,
          headerTitleAlign: "center",
        }}
      />
    </Stack>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  header: {
    paddingVertical: 20,
    paddingHorizontal: 16,
    backgroundColor: "#007AFF",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
  },
});
