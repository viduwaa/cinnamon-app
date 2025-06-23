import { Text, View, SafeAreaView,Platform,StatusBar } from "react-native";

export default function addFarmer() {
    return (
    <>
        <SafeAreaView className="flex-1 bg-primary"
            style={{
                paddingTop:
                    Platform.OS === "android" ? StatusBar.currentHeight : 0,
            }}></SafeAreaView>
        <View className="flex-1 bg-red-600"><Text>Hello World</Text></View>
        </>
    )
}