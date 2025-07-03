import { Stack } from "expo-router";

export default function CollectorLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: false, // ✅ Hides header for all screens in this stack
            }}
        />
    );
}
