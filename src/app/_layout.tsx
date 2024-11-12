import React, { useEffect } from "react";
import { useNavigation, useRouter } from "expo-router";
import { Stack } from "expo-router/stack";
import { StyleSheet } from "react-native";
import { useStore } from "zustand";
import expenseTrackerStore from "../store/expenceTracker";
import { checkExistingUser } from "../database/utils/userManager";

export default function Layout() {
  const router = useRouter();

  const { setUser } = useStore(expenseTrackerStore);
  useEffect(() => {
    const loadUser = async () => {
      const user = await checkExistingUser();

      if (user) {
        setUser(user);
        router.replace("/(tabs)");
      } else {
        router.replace("/profile/editProfile");
      }
    };

    loadUser();
  }, []);

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