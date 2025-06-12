import MainButton from "@/components/ui/MainButton";
import { useRouter } from "expo-router";
import { ArrowRight } from "lucide-react-native";
import { Image, SafeAreaView, StatusBar, Text, View } from "react-native";

export default function LandingPage() {
    const router = useRouter();
    return (
        <>
            <StatusBar
                barStyle={"dark-content"}
                backgroundColor="transparent"
                translucent={true}
            />
            <SafeAreaView className="flex flex-1 bg-primary">
                <View className="flex-[1] items-center justify-end">
                    <View className="">
                        <Image
                            source={require("@/assets/images/logo-main.png")}
                            className="object-cover"
                        />
                    </View>
                </View>
                <View className="flex flex-[2] items-center justify-start">
                    <View className="flex-1 justify-end mt-12">
                        <Text className="font-[inter] font-semibold text-[48px] text-center leading-[52px] text-text-primary">
                            Department of {"\n"}Cinnamon Development
                        </Text>
                    </View>

                    <View className="flex-[2] items-center justify-center w-full">
                        <MainButton
                            onPress={() => router.push("/language")}
                            text="Get Started"
                        >
                            <ArrowRight color="white" size={32} />
                        </MainButton>
                    </View>
                </View>
            </SafeAreaView>
        </>
    );
}
