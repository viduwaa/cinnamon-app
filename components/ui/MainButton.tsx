import { ReactNode } from "react";
import { Pressable, Text, View } from "react-native";

interface ButtonProps {
    text: string;
    children?: ReactNode;
    onPress: () => void;
    className?: string;
}

export default function MainButton({
    text,
    children,
    onPress,
    className = "",
}: ButtonProps) {
    return (
        <Pressable
            className={`bg-text-primary w-3/5 h-16 rounded-xl flex flex-row items-center justify-center active:bg-amber-600 ${className}`}
            onPress={onPress}
        >
            <Text className="text-2xl text-white font-bold font-[inter] mr-2">
                {text}
            </Text>
            {children && <View>{children}</View>}
        </Pressable>
    );
}
