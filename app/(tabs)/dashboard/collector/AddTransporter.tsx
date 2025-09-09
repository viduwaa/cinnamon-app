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

export default function AddTransporter() {
    const [formData, setFormData] = useState({
        method: "",
        transportDate: new Date(),
        vehicleID: "",
        storageConditions: "",
    });

    const router = useRouter();

    const handleInputChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async () => {
        try {
            await AsyncStorage.setItem('transporterData', JSON.stringify(formData));
            Alert.alert("Success", "Transporter data saved successfully!");
            // Navigate back to the collector dashboard or previous screen
            router.back();
        } catch (error) {
            console.error('Error saving transporter data:', error);
            Alert.alert("Error", "Failed to save transporter data.");
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
                    <Text className="text-2xl">Transport to Processing Center</Text>
                </View>
                <View className="w-[90%] flex gap-4 items-start justify-center mx-auto pb-10">
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
                        />
                    </View>
                    
                    <View className="w-full">
                        <Text className="mb-2 text-lg font-semibold">
                            Transport Method
                        </Text>
                        <TextInput
                            className="ml-2 py-4 text-lg w-[90%] border rounded-lg p-4"
                            placeholder="Method"
                            value={formData.method}
                            onChangeText={(text) =>
                                handleInputChange("method", text)
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
                            Storage Conditions During Transport
                        </Text>
                        <TextInput
                            className="ml-2 py-4 text-lg w-[90%] border rounded-lg p-4"
                            placeholder="Conditions"
                            value={formData.storageConditions}
                            onChangeText={(text) =>
                                handleInputChange("storageConditions", text)
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