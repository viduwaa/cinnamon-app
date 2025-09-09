import { useAuth } from "@/contexts/AuthContext";
import { Stack } from "expo-router";

export default function DashboardLayout() {
    const { role } = useAuth();

    return (
        <Stack
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen
                name="index"
                options={{
                    title: `${role} Dashboard`,
                    headerShown: true,
                }}
            />
        </Stack>
    );
}
