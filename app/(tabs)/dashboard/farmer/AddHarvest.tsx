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

export default function AddHarvest() {
    const [formData, setFormData] = useState({
        farmName: "",
        dateOfPlanting: new Date(),
        harvestMethod: "",
        quantity: "",
    });

    const router = useRouter();

    const handleInputChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async () => {
        try {
            await AsyncStorage.setItem('harvestData', JSON.stringify(formData));
            Alert.alert("Success", "Harvest data saved successfully!");
        } catch (error) {
            console.error('Error saving harvest data:', error);
            Alert.alert("Error", "Failed to save harvest data.");
        }
    };

    return (
        <>
            <ScrollView className="flex-1 bg-primary relative">
                <View className="absolute top-2 left-4">
                    <Pressable
                        className="active:bg-amber-400 p-2 rounded-md"
                        onPress={router.back}
                    >
                        <ArrowLeft size={30} />
                    </Pressable>
                </View>
                <View className="flex items-center h-[80px] mt-10">
                    <Text className="text-3xl font-bold">
                        Harvesting Stage
                    </Text>
                    <Text className="text-2xl">Harvesting Information</Text>
                </View>
                <View className="w-[90%] flex gap-4 items-start justify-center mx-auto pb-10">
                    <View className="w-full">
                        <Text className="mb-2 text-lg font-semibold">
                            Batch ID
                        </Text>
                        <TextInput
                            className="ml-2 py-4 text-lg w-[90%] border rounded-lg p-4"
                            placeholder="ID"
                            value={formData.farmName}
                            onChangeText={(text) =>
                                handleInputChange("farmName", text)
                            }
                        />
                    </View>

                    <View className="w-full">
                        <Text className="mb-2 text-lg font-semibold">
                            Harvest Date
                        </Text>
                        <DatePickerForm
                            date={formData.dateOfPlanting}
                            onChange={(newDate) =>
                                setFormData({
                                    ...formData,
                                    dateOfPlanting: newDate,
                                })
                            }
                        />
                    </View>

                    <View className="w-full">
                        <Text className="mb-2 text-lg font-semibold">
                            Harvest Method
                        </Text>
                        <TextInput
                            className="ml-2 py-4 text-lg w-[90%] border rounded-lg p-4"
                            placeholder="Method of Harvest"
                            value={formData.harvestMethod}
                            onChangeText={(text) =>
                                handleInputChange("harvestMethod", text)
                            }
                        />
                    </View>

                    <View className="w-full">
                        <Text className="mb-2 text-lg font-semibold">
                            Quantity Harvested (kg)
                        </Text>
                        <TextInput
                            className="ml-2 py-4 text-lg w-[90%] border rounded-lg p-4"
                            placeholder="Quantity in KG"
                            value={formData.quantity}
                            onChangeText={(text) =>
                                handleInputChange("quantity", text)
                            }
                        />
                    </View>

                    <Pressable
                        onPress={handleSubmit}
                        className="bg-blue-500 p-4 rounded mt-6 ml-auto"
                    >
                        <Text className="text-xl font-bold text-white">
                            Submit
                        </Text>
                    </Pressable>
                </View>
            </ScrollView>
        </>
    );
}