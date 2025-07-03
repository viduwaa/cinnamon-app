import MainButton from "@/components/ui/MainButton";
import { useRouter } from "expo-router";
import {
    ArrowRight,
    Eye,
    EyeOff,
    RectangleEllipsis,
    Smartphone,
} from "lucide-react-native";
import { useState } from "react";
import {
    Image,
    Platform,
    Pressable,
    SafeAreaView,
    StatusBar,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function SignIn() {
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const router = useRouter();
    return (
        <>
            <StatusBar
                barStyle={"dark-content"}
                backgroundColor="transparent"
            />
            <SafeAreaView
                className="flex-1 bg-primary"
                style={{
                    paddingTop:
                        Platform.OS === "android" ? StatusBar.currentHeight : 0,
                }}
            >
                <View className="flex flex-1">
                    {/* Logo and title */}
                    <View className="flex-[3] items-center justify-center">
                        <Image
                            source={require("@/assets/images/logo-main.png")}
                            className="w-[150px] h-[150px] mb-4"
                            resizeMode="contain"
                        />
                        <Text className="font-[inter] text-5xl h-[60px]">
                            Sign In
                        </Text>
                    </View>

                    {/* sign in form */}
                    <View className="flex-[3] w-[90%] mx-auto">
                        <View className="flex flex-1 justify-start gap-8 border-gray-400 p-4 ">
                            <View className="border relative rounded-xl p-3">
                                <Text className="bg-primary px-2 text-md absolute top-[-9] left-3 mb-1">
                                    PHONE NUMBER
                                    <Text className="text-red-700">*</Text>
                                </Text>
                                <View className="flex flex-row items-center">
                                    <Smartphone size={36} />
                                    <TextInput
                                        className="ml-2 py-4 text-lg w-[90%]"
                                        placeholder="+94 7X XXX XXXX"
                                    />
                                </View>
                            </View>

                            <View className="border relative rounded-xl p-3">
                                <Text className="bg-primary px-2 text-md absolute top-[-9] left-3 mb-1">
                                    PASSWORD
                                    <Text className="text-red-700">*</Text>
                                </Text>
                                <View className="flex flex-row items-center">
                                    <RectangleEllipsis size={36} />
                                    <TextInput
                                        className="ml-2 py-4 text-lg w-[80%]"
                                        placeholder="●●●●●●●●●●"
                                        onChangeText={setPassword}
                                        secureTextEntry={!showPassword}
                                        autoCorrect={false}
                                        autoCapitalize="none"
                                    />
                                    <TouchableOpacity
                                        onPress={() =>
                                            setShowPassword(!showPassword)
                                        }
                                    >
                                        {showPassword ? (
                                            <EyeOff size={20} />
                                        ) : (
                                            <Eye size={20} />
                                        )}
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>

                    {/* login button and forogot password */}
                    <View className="flex-[2] items-center w-full">
                        <MainButton
                            className="w-4/5"
                            text="Sign In"
                            onPress={() => router.replace("/(tabs)/farmer")}
                        ></MainButton>
                        <View className="flex flex-row mt-2">
                            <Text className="text-lg">
                                Don't have an account?{" "}
                            </Text>
                            <Pressable
                                onPress={() => router.push("/(auth)/sign-up")}
                            >
                                <Text className="underline text-lg text-[#A97C37]">{`\tSign Up`}</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        </>
    );
}
