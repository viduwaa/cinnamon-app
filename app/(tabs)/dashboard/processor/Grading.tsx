import DatePickerForm from "@/components/DatePicker";
import AsyncStorage from "@react-native-async-storage/async-storage";
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

export default function Grading() {
    const [formData, setFormData] = useState({
        batchID: "",
        gradingDate: new Date(),
        gradedBy: "",
        grade: "",
    });

    const router = useRouter();

    const handleInputChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async () => {
        try {
            await AsyncStorage.setItem("GradedData", JSON.stringify(formData));
            Alert.alert("Success", "GradedData data saved successfully!");
            // Navigate back to the collector dashboard or previous screen
            router.back();
        } catch (error) {
            console.error("Error saving GradedData data:", error);
            Alert.alert("Error", "Failed to save GradedData data.");
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
                    <Text className="text-3xl font-bold">Processing Stage</Text>
                    <Text className="text-2xl">Sorting and Grading</Text>
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
                            Grading Date
                        </Text>
                        <DatePickerForm
                            date={formData.gradingDate}
                            onChange={(newDate) =>
                                setFormData({
                                    ...formData,
                                    gradingDate: newDate,
                                })
                            }
                            text="Grading"                        
                        />
                    </View>

                    <View className="w-full">
                        <Text className="mb-2 text-lg font-semibold">
                            Graded By (Name/ID)
                        </Text>
                        <TextInput
                            className="ml-2 py-4 text-lg w-[90%] border rounded-lg p-4"
                            placeholder="By Name or ID"
                            value={formData.gradedBy}
                            onChangeText={(text) =>
                                handleInputChange("gradedBy", text)
                            }
                        />
                    </View>

                    <View className="w-full">
                        <Text className="mb-2 text-lg font-semibold">
                            Grade Assigned
                        </Text>
                        <TextInput
                            className="ml-2 py-4 text-lg w-[90%] border rounded-lg p-4"
                            placeholder="Grade"
                            value={formData.grade} 
                            onChangeText={(text) =>
                                handleInputChange("grade", text)
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
