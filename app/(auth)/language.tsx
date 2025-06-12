import MainButton from "@/components/ui/MainButton";
import { router } from "expo-router";
import { ArrowRight } from "lucide-react-native";
import { useState } from "react";
import {
    Image,
    Pressable,
    SafeAreaView,
    StatusBar,
    Text,
    View,
} from "react-native";

export default function SelectLanguage() {
    const [language, setLanguage] = useState("en");
    return (
        <>
            <StatusBar
                barStyle={"dark-content"}
                backgroundColor="transparent"
                translucent={true}
            />
            <SafeAreaView className="flex-1 bg-primary">
                <View className="flex-1">
                    {/* logo */}
                    <View className="flex-[2] items-center justify-center mt-12">
                        <Image
                            source={require("@/assets/images/logo-main.png")}
                        />
                    </View>

                    {/* language select */}
                    <View className="flex-[3] items-center justify-start">
                        <Text className="font-[inter] text-3xl font-bold ">
                            Select Language
                        </Text>
                        <View className="h-1/2 flex flex-1 justify-evenly ">
                            <Pressable
                                className={`border rounded-2xl h-[90px] w-[300px] flex items-center justify-center ${language === "en" && "border-[5px]"}`}
                                onPress={() => setLanguage("en")}
                            >
                                <Image
                                    source={require("@/assets/images/english.png")}
                                    className="h-[200px] w-[200px] object-contain"
                                    resizeMode="contain"
                                />
                            </Pressable>
                            <Pressable
                                className={`border p-6 rounded-2xl h-[90px] w-[300px] flex items-center justify-center ${language === "si" && "border-[5px]"}`}
                                onPress={() => setLanguage("si")}
                            >
                                <Image
                                    source={require("@/assets/images/sinhala.png")}
                                    className="h-[150px] w-[150px] object-contain"
                                    resizeMode="contain"
                                />
                            </Pressable>
                            <Pressable
                                className={`border p-6 rounded-2xl h-[90px] w-[300px]  flex items-center justify-center ${language === "tamil" && "border-[5px]"}`}
                                onPress={() => setLanguage("tamil")}
                            >
                                <Image
                                    source={require("@/assets/images/tamil.png")}
                                    className="h-[150px] w-[150px] object-contain"
                                    resizeMode="contain"
                                />
                            </Pressable>
                        </View>
                    </View>
                    {/* next btn */}
                    <View className="flex-1 items-center justify-center">
                        <MainButton text="Next" onPress={() => router.push("/sign-in")}>
                            <ArrowRight color="white" size={32} />
                        </MainButton>
                    </View>
                </View>
            </SafeAreaView>
        </>
    );
}
