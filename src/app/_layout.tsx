import { Stack } from "expo-router";

export default function RootLayout() {

  // Load the SplashScreen & hide
  return <Stack screenOptions={
    {headerShown: false}
  } />;
}
