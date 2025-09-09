import MainButton from "@/components/ui/MainButton";
import { useAuth } from "@/contexts/AuthContext";
import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";
import {
    Eye,
    EyeOff,
    RectangleEllipsis,
    Smartphone,
} from "lucide-react-native";
import { useState } from "react";
import {
    Image,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    StatusBar,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignIn() {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const [selectedRole, setSelectedRole] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const { setRole } = useAuth();
    const router = useRouter();

    const handleSignIn = () => {
        if (!phoneNumber || !password || !selectedRole) {
            alert("Please fill in all fields, including role.");
            return;
        }
        setRole(selectedRole);
        router.replace("/(tabs)/dashboard");
    };

    return (
        <>
            <StatusBar
                barStyle="dark-content"
                translucent
                backgroundColor="transparent"
            />
            <SafeAreaView
                className="flex-1 bg-primary"
                style={{
                    paddingTop:
                        Platform.OS === "android" ? StatusBar.currentHeight : 0,
                }}
            >
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    keyboardVerticalOffset={
                        Platform.OS === "ios" ? 0 : StatusBar.currentHeight
                    }
                    style={{ flex: 1 }}
                >
                    <ScrollView
                        contentContainerStyle={{ flexGrow: 1 }}
                        keyboardShouldPersistTaps="handled"
                    >
                        <View className="flex-1 justify-between">
                            {/* Header / Logo */}
                            <View className="items-center mt-8">
                                <Image
                                    source={require("@/assets/images/logo-main.png")}
                                    className="w-36 h-36"
                                    resizeMode="contain"
                                />
                                <Text className="text-3xl font-bold text-black mt-4">
                                    Sign In
                                </Text>
                            </View>

                            {/* Card with form */}
                            <View className="bg-white mx-6 rounded-2xl p-6 shadow-lg">
                                {/* PHONE */}
                                <View className="mb-4">
                                    <Text className="text-xs uppercase text-gray-500 mb-2">
                                        PHONE NUMBER{" "}
                                        <Text className="text-red-600">*</Text>
                                    </Text>
                                    <View className="flex-row items-center border border-gray-200 rounded-xl px-3 py-2">
                                        <Smartphone size={24} />
                                        <TextInput
                                            style={{ flex: 1 }}
                                            className="ml-3 text-base"
                                            placeholder="+94 7X XXX XXXX"
                                            value={phoneNumber}
                                            onChangeText={setPhoneNumber}
                                            keyboardType="phone-pad"
                                            autoCorrect={false}
                                            autoCapitalize="none"
                                        />
                                    </View>
                                </View>

                                {/* PASSWORD */}
                                <View className="mb-4">
                                    <Text className="text-xs uppercase text-gray-500 mb-2">
                                        PASSWORD{" "}
                                        <Text className="text-red-600">*</Text>
                                    </Text>
                                    <View className="flex-row items-center border border-gray-200 rounded-xl px-3 py-2">
                                        <RectangleEllipsis size={24} />
                                        <TextInput
                                            style={{ flex: 1 }}
                                            className="ml-3 text-base"
                                            placeholder="●●●●●●●●●●"
                                            value={password}
                                            onChangeText={setPassword}
                                            secureTextEntry={!showPassword}
                                            autoCorrect={false}
                                            autoCapitalize="none"
                                        />
                                        <TouchableOpacity
                                            onPress={() =>
                                                setShowPassword(!showPassword)
                                            }
                                            className="p-2"
                                            accessibilityLabel={
                                                showPassword
                                                    ? "Hide password"
                                                    : "Show password"
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

                                {/* ROLE */}
                                <View className="mb-4">
                                    <Text className="text-xs uppercase text-gray-500 mb-2">
                                        ROLE{" "}
                                        <Text className="text-red-600">*</Text>
                                    </Text>
                                    <View className="border border-gray-200 rounded-xl overflow-hidden">
                                        <Picker
                                            selectedValue={selectedRole}
                                            onValueChange={(itemValue) =>
                                                setSelectedRole(itemValue)
                                            }
                                            style={{
                                                height: 50,
                                                width: "100%",
                                                backgroundColor: "#FFF8F3",
                                            }}
                                        >
                                            <Picker.Item
                                                label="Select Role"
                                                value=""
                                            />
                                            <Picker.Item
                                                label="Farmer"
                                                value="farmer"
                                            />
                                            <Picker.Item
                                                label="Collector"
                                                value="collector"
                                            />
                                            <Picker.Item
                                                label="Processor"
                                                value="processor"
                                            />
                                            <Picker.Item
                                                label="Distributor"
                                                value="distributor"
                                            />
                                            <Picker.Item
                                                label="Exporter"
                                                value="exporter"
                                            />
                                        </Picker>
                                    </View>
                                </View>

                                {/* Sign in button + sign up link */}
                                <View className="mt-2">
                                    <MainButton
                                        text="Sign In"
                                        onPress={handleSignIn}
                                        className="w-full"
                                    />
                                    <View className="flex-row justify-center mt-3">
                                        <Text className="text-sm text-gray-600">
                                            Don't have an account?
                                        </Text>
                                        <Pressable
                                            onPress={() =>
                                                router.push("/(auth)/sign-up")
                                            }
                                        >
                                            <Text className="ml-1 text-sm underline text-[#A97C37]">
                                                Sign Up
                                            </Text>
                                        </Pressable>
                                    </View>
                                </View>
                            </View>

                            {/* bottom spacing */}
                            <View style={{ height: 24 }} />
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </>
    );
}
