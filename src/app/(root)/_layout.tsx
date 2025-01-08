import { Redirect, Slot } from "expo-router";
import { useAuthContext } from "@/src/context/AuthContext";
import { ActivityIndicator } from "react-native";

export default function AppLayout() {
  const { isLogged, loading } = useAuthContext();

  if (loading) return <ActivityIndicator size="large" color="#00ff00" />;

  if (!isLogged) return <Redirect href="/sign-in" />;

  return <Slot />;
}
