// app/(tabs)/_layout.tsx
import { Tabs } from "expo-router";
import { Tractor, Truck, UserRoundPen ,Boxes} from "lucide-react-native";

export default function TabsLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    width: "90%",
                    margin: "auto",
                    borderRadius: 15,
                    bottom: 10,
                    height: 60,
                    backgroundColor: "#5dd969",
                    paddingTop:5
                },
            }}
        >
            <Tabs.Screen
                name="farmer"
                options={{
                    title: "Farmer",
                    tabBarIcon: ({ focused }) => <Tractor />,
                }}
            />
            <Tabs.Screen
                name="collector"
                options={{
                    title: "Collector",
                    tabBarIcon: ({ focused }) => <Boxes />,
                }}
            />
            <Tabs.Screen
                name="transport"
                options={{
                    title: "Transport",
                    tabBarIcon: ({ focused }) => <Truck />,
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: "Profile",
                    tabBarIcon: ({ focused }) => <UserRoundPen />,
                }}
            />
        </Tabs>
    );
}
