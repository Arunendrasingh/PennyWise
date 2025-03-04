import { Tabs } from "expo-router";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { defaultColors } from "@/src/constant/Color";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: defaultColors.paytmColors.lightBlue }}>
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
        name="statistics"
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="stats-chart" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: "History",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="history" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => (
            <Ionicons name="settings" size={24} color={color} />
          ),
          headerShown: false,
        }}
      />
    </Tabs>
  );
}