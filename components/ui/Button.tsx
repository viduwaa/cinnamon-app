import { ReactNode } from "react";
import { Pressable, Text } from "react-native";

interface ButtonProps {
    children: ReactNode;
    onPress: () => void;
    variant?: "primary" | "secondary";
    className?: string;
}

export default function Button({
    children,
    onPress,
    variant = "primary",
    className = "",
}: ButtonProps) {
    const baseClasses = "py-3 px-6 rounded-lg";
    const variantClasses = {
        primary: "bg-blue-300 active:bg-blue-700",
        secondary: "bg-gray-200 active:bg-gray-300",
    };

    return (
        <Pressable
            className={`${baseClasses} ${variantClasses[variant]} ${className}`}
            onPress={onPress}
        >
            <Text
                className={`text-center font-semibold ${
                    variant === "primary" ? "text-white" : "text-gray-900"
                }`}
            >
                {children}
            </Text>
        </Pressable>
    );
}
