import { Stack } from "expo-router/stack";

export default function Layout() {
  return (
    <Stack id="ad">
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="editProfile"
        options={{
          title: "Update Profile",
          headerTitleAlign: "center",
        }}
      />
    </Stack>
  );
}
