import MainButton from "@/components/ui/MainButton";
import { router } from "expo-router";
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
import DropDownPicker from "react-native-dropdown-picker";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignUp() {
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null); // null means no selection
    const [items, setItems] = useState([
        { label: "Collector", value: "collector" },
        { label: "Farmer", value: "farmer" },
    ]);
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
                <KeyboardAvoidingView
                    className="flex-1"
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    keyboardVerticalOffset={
                        Platform.OS === "ios" ? 0 : StatusBar.currentHeight
                    }
                >
                    <ScrollView
                        className="flex-1"
                        keyboardShouldPersistTaps="handled"
                        contentContainerStyle={{ flexGrow: 1 }}
                    >
                        {/* Logo and title */}
                        <View className="flex-[1] items-center justify-center">
                            <Image
                                source={require("@/assets/images/logo-main.png")}
                                className="w-[150px] h-[150px] mb-4"
                                resizeMode="contain"
                            />
                            <Text className="font-[inter] text-5xl h-[60px]">
                                Sign Up
                            </Text>
                        </View>
                        <View className="flex-[2] w-[90%] mx-auto my-8">
                            <View className="flex flex-1 justify-start gap-6 border-gray-400 p-4 ">
                                <View className="border relative rounded-xl p-3">
                                    <Text className="bg-primary px-2 text-xl absolute top-[-30] left-[-5] mb-1">
                                        Sign Up As
                                    </Text>
                                    <View className="flex items-center justify-center">
                                        <View className="z-10 w-full my-auto text-lg">
                                            <DropDownPicker
                                                open={open}
                                                value={value}
                                                items={items}
                                                setOpen={setOpen}
                                                setValue={setValue}
                                                setItems={setItems}
                                                placeholder="Collector | Farmer"
                                                style={{
                                                    borderColor: "#FFF8F3",
                                                    height: 50,
                                                    width: 320,
                                                    backgroundColor:
                                                        "bg-primary",
                                                }}
                                                dropDownContainerStyle={{
                                                    borderColor: "black",
                                                    backgroundColor: "#FFF8F9",
                                                    width: 343,
                                                    borderBlockColor: "#000000",
                                                    margin: -12,
                                                }}
                                                textStyle={{
                                                    fontSize: 16,
                                                }}
                                                labelStyle={{
                                                    fontSize: 18, // 👈 Optional: control font size in the dropdown list
                                                }}
                                            />
                                        </View>
                                    </View>
                                </View>
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
                                <View className="border relative rounded-xl p-3">
                                    <Text className="bg-primary px-2 text-md absolute top-[-9] left-3 mb-1">
                                        RE-PASSWORD
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
                                onPress={() => router.push("/(tabs)")}
                            ></MainButton>
                            <View className="flex flex-row mt-2">
                                <Text className="text-lg">
                                    Already have an account?{" "}
                                </Text>
                                <Pressable
                                    onPress={() =>
                                        router.push("/(auth)/sign-in")
                                    }
                                >
                                    <Text className="underline text-lg text-[#A97C37]">{`\tSign In`}</Text>
                                </Pressable>
                            </View>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </>
    );
}
