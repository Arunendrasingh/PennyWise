import { Tabs } from "expo-router";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { colorBlue } from "@/src/constants/Colors";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: colorBlue }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: function ({ color }) {
            return (
              <MaterialCommunityIcons name="home" size={24} color={color} />
            );
          },
        }}
      />
      <Tabs.Screen
        name="Statistics"
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="stats-chart" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="ExpenseHistory"
        options={{
          title: "History",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="history" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "profile",
          tabBarIcon: ({ color }) => (
            <Ionicons name="settings" size={24} color={color} />
          ),
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
