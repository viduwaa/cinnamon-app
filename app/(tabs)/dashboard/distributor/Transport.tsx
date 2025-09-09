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

export default function Transport() {
    const [formData, setFormData] = useState({
        batchID: "",
        transportDate: new Date(),
        transportCompany: "",
        vehicleID: "",
        temperature:"",
        humidity:""
    });

    const router = useRouter();

    const handleInputChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleNext = async () => {
        try {
            // Save collector data to AsyncStorage
            await AsyncStorage.setItem('transportDataDistributor', JSON.stringify(formData));
            Alert.alert("Success", "Transport data saved successfully!");
            // Navigate to AddTransporter screen
            router.back()
        } catch (error) {
            console.error('Error saving Transport data:', error);
            Alert.alert("Error", "Failed to save Transport data.");
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
                        Distribution and Logistics Stage
                    </Text>
                    <Text className="text-2xl">Transport Information</Text>
                </View>
                <View className="w-[90%] flex gap-4 items-start justify-center mx-auto pb-10">
                    <View className="w-full">
                        <Text className="mb-2 text-lg font-semibold">
                            Batch ID
                        </Text>
                        <TextInput
                            className="ml-2 py-4 text-lg w-[90%] border rounded-lg p-4"
                            placeholder="ID"
                            value={formData.batchID}
                            onChangeText={(text) =>
                                handleInputChange("batchID", text)
                            }
                        />
                    </View>

                    <View className="w-full">
                        <Text className="mb-2 text-lg font-semibold">
                            Transport Date
                        </Text>
                        <DatePickerForm
                            date={formData.transportDate}
                            onChange={(newDate) =>
                                setFormData({
                                    ...formData,
                                    transportDate: newDate,
                                })
                            }
                            text='Transport'
                        />
                    </View>

                    <View className="w-full">
                        <Text className="mb-2 text-lg font-semibold">
                            Transport Company
                        </Text>
                        <TextInput
                            className="ml-2 py-4 text-lg w-[90%] border rounded-lg p-4"
                            placeholder="Company Name"
                            value={formData.transportCompany}
                            onChangeText={(text) =>
                                handleInputChange("transportCompany", text)
                            }
                        />
                    </View>

                    <View className="w-full">
                        <Text className="mb-2 text-lg font-semibold">
                            Vehicle ID
                        </Text>
                        <TextInput
                            className="ml-2 py-4 text-lg w-[90%] border rounded-lg p-4"
                            placeholder="Vehicle ID"
                            value={formData.vehicleID}
                            onChangeText={(text) =>
                                handleInputChange("vehicleID", text)
                            }
                        />
                    </View>
                    <View className="w-full">
                        <Text className="mb-2 text-lg font-semibold">
                                Package Weight (g/Kg)
                            </Text>
                        <View className="flex-row justify-between mb-2">    
                            <TextInput
                                className="ml-2 py-4 text-lg w-[48%] border rounded-lg p-4"
                                placeholder="Temperature (C)"
                                value={formData.temperature}
                                onChangeText={(text) =>
                                    handleInputChange("temperature", text)
                                }
                            />
                            <TextInput
                                className="ml-2 py-4 text-lg w-[48%] border rounded-lg p-4"
                                placeholder="Humidity (%)"
                                value={formData.humidity}
                                onChangeText={(text) =>
                                    handleInputChange("humidity", text)
                                }
                            />
                        </View>
                    </View>
                    
                    <Pressable
                        onPress={handleNext}
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