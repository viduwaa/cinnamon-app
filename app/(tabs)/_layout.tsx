import { Tabs } from "expo-router";
import { BarChart3, Map, UserRoundPen } from "lucide-react-native";
import { useAuth } from "@/contexts/AuthContext";
import { View, ActivityIndicator } from "react-native";

export default function TabsLayout() {
  const { role } = useAuth();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "black",
        tabBarActiveBackgroundColor: "green",
        tabBarStyle: {
          width: "90%",
          marginHorizontal: "auto",
          borderRadius: 15,
          bottom: 10,
          height: 60,
          backgroundColor: "#5dd969",
        },
        tabBarItemStyle: {
          borderRadius: 10,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "bold",
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="dashboard"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color, size }) => (
            <BarChart3 color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="location"
        options={{
          title: "Location",
          tabBarIcon: ({ color, size }) => (
            <Map color={color} size={size} />
          ),
          href: role === "farmer" ? "/(tabs)/location" : null,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <UserRoundPen color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}