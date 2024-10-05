import { Stack } from "expo-router/stack";

export default function Layout() {
  return (
    <Stack id="ad">
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="AddExpense" />
    </Stack>
  );
}
