import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    Dimensions,
    Image,
    ScrollView,
    StatusBar,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { BarChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export default function Farmer() {
    const router = useRouter();
    const [selectedDate, setSelectedDate] = useState("week1");
    const [selectedLand, setSelectedLand] = useState("land1");

    const chartData = {
        labels: ["week 01", "week 02", "week 03", "week 04", "week 5"],
        datasets: [{ data: [300, 500, 200, 400, 0] }],
    };

    return (
        <>
            <ScrollView className="flex-1 bg-primary">
                <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" />

                {/* Header with Logo */}
                <View className="flex-row justify-between items-center px-5 pt-4 pb-5 bg-gray-100">
                    <View className="flex-row items-center flex-1">
                        <Image
                            source={require("@/assets/images/logo-main.png")}
                            className="w-12 h-12"
                        />
                        <Text className="text-xl font-bold text-amber-900 ml-5">
                            Farmer
                        </Text>
                    </View>
                    <View className="items-end">
                        <View className="items-center">
                            <View className="flex-row gap-1">
                                <View className="w-2 h-2 rounded-full bg-gray-600" />
                                <View className="w-2 h-2 rounded-full bg-gray-600" />
                                <View className="w-2 h-2 rounded-full bg-gray-300" />
                            </View>
                        </View>
                    </View>
                </View>

                {/* Profile Card */}
                <View className="flex-row items-center bg-white mx-5 mt-3 p-4 rounded-3xl shadow-lg">
                    <View className="mr-4 border-4 border-blue-500 rounded-3xl p-1">
                        <Image
                            source={{
                                uri: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=240&fit=crop&crop=face",
                            }}
                            style={{
                                width: screenWidth * 0.25,
                                height: screenHeight * 0.15,
                                borderRadius: screenWidth * 0.043,
                            }}
                        />
                    </View>
                    <View className="flex-1 justify-center">
                        <Text className="text-lg font-bold text-gray-800 mb-2">
                            Isuru Madusanka
                        </Text>
                        <View className="flex-row items-center mb-1">
                            <View className="w-4 h-4 rounded-full bg-black justify-center items-center mr-2">
                                <Text className="text-xs text-white">📍</Text>
                            </View>
                            <Text className="text-base text-gray-600 font-medium">
                                Matale
                            </Text>
                        </View>
                    </View>
                    <View className="ml-3 items-center">
                        <View
                            className="bg-white rounded-lg border-2 border-black justify-center items-center"
                            style={{
                                width: screenWidth * 0.175,
                                height: screenWidth * 0.175,
                            }}
                        >
                            <View
                                className="bg-white relative"
                                style={{
                                    width: screenWidth * 0.15,
                                    height: screenWidth * 0.15,
                                }}
                            >
                                {/* QR Code pattern - simplified representation */}
                                <View
                                    className="absolute bg-black rounded-sm"
                                    style={{
                                        top: screenWidth * 0.01,
                                        left: screenWidth * 0.01,
                                        width: screenWidth * 0.03,
                                        height: screenWidth * 0.03,
                                    }}
                                />
                                <View
                                    className="absolute bg-black rounded-sm"
                                    style={{
                                        top: screenWidth * 0.01,
                                        right: screenWidth * 0.01,
                                        width: screenWidth * 0.03,
                                        height: screenWidth * 0.03,
                                    }}
                                />
                                <View
                                    className="absolute bg-black rounded-sm"
                                    style={{
                                        bottom: screenWidth * 0.01,
                                        left: screenWidth * 0.01,
                                        width: screenWidth * 0.03,
                                        height: screenWidth * 0.03,
                                    }}
                                />
                                <View
                                    className="absolute bg-black rounded-sm"
                                    style={{
                                        bottom: screenWidth * 0.01,
                                        right: screenWidth * 0.01,
                                        width: screenWidth * 0.03,
                                        height: screenWidth * 0.03,
                                    }}
                                />
                                <View
                                    className="absolute bg-black rounded-sm"
                                    style={{
                                        width: screenWidth * 0.02,
                                        height: screenWidth * 0.02,
                                        top: screenWidth * 0.065,
                                        left: screenWidth * 0.065,
                                    }}
                                />
                                {/* Additional QR pattern elements */}
                                <View
                                    className="absolute bg-black rounded-sm"
                                    style={{
                                        top: screenWidth * 0.05,
                                        left: screenWidth * 0.04,
                                        width: screenWidth * 0.02,
                                        height: screenWidth * 0.01,
                                    }}
                                />
                                <View
                                    className="absolute bg-black rounded-sm"
                                    style={{
                                        top: screenWidth * 0.09,
                                        left: screenWidth * 0.01,
                                        width: screenWidth * 0.015,
                                        height: screenWidth * 0.015,
                                    }}
                                />
                                <View
                                    className="absolute bg-black rounded-sm"
                                    style={{
                                        top: screenWidth * 0.04,
                                        right: screenWidth * 0.04,
                                        width: screenWidth * 0.01,
                                        height: screenWidth * 0.02,
                                    }}
                                />
                                <View
                                    className="absolute bg-black rounded-sm"
                                    style={{
                                        bottom: screenWidth * 0.05,
                                        right: screenWidth * 0.025,
                                        width: screenWidth * 0.015,
                                        height: screenWidth * 0.01,
                                    }}
                                />
                            </View>
                        </View>
                    </View>
                </View>

                {/* Plantings Section */}
                <View className="bg-white mx-5 mt-6 rounded-2xl p-5 shadow-lg">
                    <View className="flex-row justify-between items-center mb-1">
                        <Text className="text-base font-bold text-gray-800">
                            Plantings
                        </Text>
                        <View className="flex-row flex-1 justify-center gap-5">
                            <View className="border border-gray-300 rounded-sm bg-gray-50">
                                <Picker
                                    selectedValue={selectedDate}
                                    style={{
                                        height: screenHeight * 0.038,
                                        width: screenWidth * 0.2,
                                        fontSize: screenWidth * 0.03,
                                        color: "#666",
                                    }}
                                    onValueChange={(itemValue) =>
                                        setSelectedDate(itemValue)
                                    }
                                >
                                    <Picker.Item label="Date ▼" value="" />
                                    <Picker.Item label="Week 1" value="week1" />
                                    <Picker.Item label="Week 2" value="week2" />
                                    <Picker.Item label="Week 3" value="week3" />
                                    <Picker.Item label="Week 4" value="week4" />
                                </Picker>
                            </View>
                            <View className="border border-gray-300 rounded-sm bg-gray-50">
                                <Picker
                                    selectedValue={selectedLand}
                                    style={{
                                        height: screenHeight * 0.038,
                                        width: screenWidth * 0.2,
                                        fontSize: screenWidth * 0.03,
                                        color: "#666",
                                    }}
                                    onValueChange={(itemValue) =>
                                        setSelectedLand(itemValue)
                                    }
                                >
                                    <Picker.Item label="Land ▼" value="" />
                                    <Picker.Item
                                        label="Field A"
                                        value="land1"
                                    />
                                    <Picker.Item
                                        label="Field B"
                                        value="land2"
                                    />
                                    <Picker.Item
                                        label="Field C"
                                        value="land3"
                                    />
                                </Picker>
                            </View>
                        </View>
                        <Text className="text-sm text-gray-600">01</Text>
                    </View>
                    <Text className="text-sm text-gray-600 mb-4 text-center">
                        Cultivation
                    </Text>

                    {/* Chart with Proper Axis Labels */}
                    <View className="items-center">
                        <View
                            className="absolute z-10"
                            style={{
                                left: screenWidth * 0.0125,
                                top: screenHeight * -0.025,
                            }}
                        >
                            <Text className="text-sm text-gray-800 font-semibold">
                                Quantity(kg)
                            </Text>
                        </View>
                        <View
                            className="items-center"
                            style={{ marginLeft: screenWidth * -0.075 }}
                        >
                            <BarChart
                                data={chartData}
                                width={screenWidth * 0.75}
                                height={screenHeight * 0.28}
                                yAxisLabel=""
                                yAxisSuffix=""
                                chartConfig={{
                                    backgroundColor: "transparent",
                                    backgroundGradientFrom: "#ffffff",
                                    backgroundGradientTo: "#ffffff",
                                    decimalPlaces: 0,
                                    color: (opacity = 1) =>
                                        `rgba(255, 140, 0, ${opacity})`,
                                    labelColor: (opacity = 1) =>
                                        `rgba(0, 0, 0, ${opacity})`,
                                    style: {
                                        borderRadius: 0,
                                    },
                                    propsForBackgroundLines: {
                                        strokeDasharray: "",
                                        stroke: "#e0e0e0",
                                        strokeWidth: 1,
                                    },
                                    fillShadowGradient: "#FF8C00",
                                    fillShadowGradientOpacity: 1,
                                }}
                                style={{ borderRadius: 0 }}
                                showValuesOnTopOfBars={false}
                                fromZero={true}
                            />
                        </View>
                        <View className="mt-3 items-center">
                            <Text className="text-sm text-gray-800 font-semibold">
                                Weeks
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Action Buttons */}
                <View className="px-5 mt-6">
                    <TouchableOpacity
                        className="bg-amber-900 flex-row justify-between items-center ml-10 w-4/5 p-4 rounded-lg mb-4 shadow-md"
                        onPress={() =>
                            router.push("/(tabs)/dashboard/farmer/AddFarmer")
                        }
                    >
                        <Text className="text-white text-sm font-semibold text-justify">
                            Add Farm Information
                        </Text>
                        <Text className="text-white text-lg font-bold">→</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        className="bg-amber-900 flex-row justify-between items-center ml-10 w-4/5 p-4 rounded-lg mb-4 shadow-md"
                        onPress={() =>
                            router.push("/(tabs)/dashboard/farmer/AddBatch")
                        }
                    >
                        <Text className="text-white text-sm font-semibold text-justify">
                            Add Batch Information
                        </Text>
                        <Text className="text-white text-lg font-bold">→</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        className="bg-amber-900 flex-row justify-between items-center ml-10 w-4/5 p-4 rounded-lg mb-4 shadow-md"
                        onPress={() =>
                            router.push("/(tabs)/dashboard/farmer/AddHarvest")
                        }
                    >
                        <Text className="text-white text-sm font-semibold text-justify">
                            Add Harvesting Information
                        </Text>
                        <Text className="text-white text-lg font-bold">→</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        className="bg-amber-900 w-4/5 ml-10 mb-12 rounded-lg items-center shadow-md pt-4 h-12"
                        onPress={() =>
                            router.push("/(tabs)/dashboard/farmer/QRCode")
                        }
                    >
                        <Text className="text-white text-sm font-semibold p-1">
                            Generate QR
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </>
    );
}
