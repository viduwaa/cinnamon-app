import { Stack } from "expo-router";

export default function AuthLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name="landing"
                options={{
                    headerShown: false,
                    gestureEnabled: false, // Prevent swipe back
                }}
            />
            <Stack.Screen
                name="language"
                options={{
                    headerShown: false,
                    presentation: "card",
                }}
            />
            <Stack.Screen
                name="sign-in"
                options={{
                    headerShown: false,
                    presentation: "card",
                }}
            />
            <Stack.Screen
                name="sign-up"
                options={{
                    headerShown: false,
                    presentation: "card",
                }}
            />
        </Stack>
    );
}
