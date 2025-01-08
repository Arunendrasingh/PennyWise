import { Stack } from "expo-router";
import { AuthProvider } from "@/src/context/AuthContext";

export default function RootLayout() {
  // Load the SplashScreen & hide

  console.log("Loading after authetnication")
  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </AuthProvider>
  );
}
