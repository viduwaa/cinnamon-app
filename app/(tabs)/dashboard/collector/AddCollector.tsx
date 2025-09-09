import AsyncStorage from '@react-native-async-storage/async-storage';
import DatePickerForm from "@/components/DatePicker";
import { useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import React, { useState } from "react";
import {
    Alert,
    Pressable,
    ScrollView,
    Text,
    TextInput,
    View,
} from "react-native";

export default function AddCollector() {
    const [formData, setFormData] = useState({
        collectorName: "",
        collectionDate: new Date(),
        batchID: "",
        quantityKG: "",
    });

    const router = useRouter();

    const handleInputChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleNext = async () => {
        try {
            // Save collector data to AsyncStorage
            await AsyncStorage.setItem('collectorData', JSON.stringify(formData));
            Alert.alert("Success", "Collector data saved successfully!");
            // Navigate to AddTransporter screen
            router.push("/(tabs)/dashboard/collector/AddTransporter");
        } catch (error) {
            console.error('Error saving collector data:', error);
            Alert.alert("Error", "Failed to save collector data.");
        }
    };

    return (
        <>
            <ScrollView className="flex-1 bg-primary relative">
                <View className="absolute top-2 left-4">
                    <Pressable className="active:bg-amber-400 p-2 rounded-md" onPress={router.back}>
                        <ArrowLeft size={30}/>
                    </Pressable>
                </View>
                <View className="flex items-center h-[80px] mt-10">
                    <Text className="text-3xl font-bold">
                        Collector Stage
                    </Text>
                    <Text className="text-2xl">Collection Information</Text>
                </View>
                <View className="w-[90%] flex gap-4 items-start justify-center mx-auto pb-10">
                    <View className="w-full">
                        <Text className="mb-2 text-lg font-semibold">
                            Collector Name
                        </Text>
                        <TextInput
                            className="ml-2 py-4 text-lg w-[90%] border rounded-lg p-4"
                            placeholder="Collector Name"
                            value={formData.collectorName}
                            onChangeText={(text) =>
                                handleInputChange("collectorName", text)
                            }
                        />
                    </View>

                    <View className="w-full">
                        <Text className="mb-2 text-lg font-semibold">
                            Collection Date
                        </Text>
                        <DatePickerForm
                            date={formData.collectionDate}
                            onChange={(newDate) =>
                                setFormData({
                                    ...formData,
                                    collectionDate: newDate,
                                })
                            }
                        />
                    </View>

                    <View className="w-full">
                        <Text className="mb-2 text-lg font-semibold">
                            Batch IDs Collected
                        </Text>
                        <TextInput
                            className="ml-2 py-4 text-lg w-[90%] border rounded-lg p-4"
                            placeholder="Batch ID"
                            value={formData.batchID}
                            onChangeText={(text) =>
                                handleInputChange("batchID", text)
                            }
                        />
                    </View>

                    <View className="w-full">
                        <Text className="mb-2 text-lg font-semibold">
                            Total Quantity Collected (kg)
                        </Text>
                        <TextInput
                            className="ml-2 py-4 text-lg w-[90%] border rounded-lg p-4"
                            placeholder="Quantity in KG"
                            value={formData.quantityKG}
                            onChangeText={(text) =>
                                handleInputChange("quantityKG", text)
                            }
                        />
                    </View>

                    <Pressable
                        onPress={handleNext}
                        className="bg-blue-500 p-4 rounded mt-6 ml-auto"
                    >
                        <Text className="text-xl font-bold text-white">
                            Next
                        </Text>
                    </Pressable>
                </View>
            </ScrollView>
        </>
    );
}