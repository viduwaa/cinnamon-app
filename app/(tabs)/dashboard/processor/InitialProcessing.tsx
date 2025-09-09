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

export default function InitialProcessing() {
    const [formData, setFormData] = useState({
        processor: "",
        processingDate: new Date(),
        batchID: "",
        drying: {
            batchID: "",
            method: "",
            startDate: new Date(),
            endDate: new Date(),
            moisture: "",
        },
    });

    const router = useRouter();

    const handleInputChange = (field: string, value: string) => {
        setFormData((prev) => {
            if (field.startsWith("drying.")) {
                const subField = field.split(".")[1];
                return {
                    ...prev,
                    drying: {
                        ...prev.drying,
                        [subField]: value,
                    },
                };
            }
            return {
                ...prev,
                [field]: value,
            };
        });
    };

    const handleDateChange = (field: string, newDate: Date) => {
        setFormData((prev) => {
            if (field.startsWith("drying.")) {
                const subField = field.split(".")[1];
                return {
                    ...prev,
                    drying: {
                        ...prev.drying,
                        [subField]: newDate,
                    },
                };
            }
            return {
                ...prev,
                [field]: newDate,
            };
        });
    };

    const handleNext = async () => {
        try {
            await AsyncStorage.setItem("processingData", JSON.stringify(formData));
            Alert.alert("Success", "Processing data saved successfully!");
            router.push("/(tabs)/dashboard/processor/Grading");
        } catch (error) {
            console.error("Error saving processing data:", error);
            Alert.alert("Error", "Failed to save processing data.");
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
                    <Text className="text-2xl">
                        Initial Processing Information
                    </Text>
                </View>
                <View className="w-[90%] flex gap-4 items-start justify-center mx-auto pb-10">
                    <View className="w-full">
                        <Text className="mb-2 text-lg font-semibold">
                            Processor Name
                        </Text>
                        <TextInput
                            className="ml-2 py-4 text-lg w-[90%] border rounded-lg p-4"
                            placeholder="Processor Name"
                            value={formData.processor}
                            onChangeText={(text) => handleInputChange("processor", text)}
                        />
                    </View>

                    <View className="w-full">
                        <Text className="mb-2 text-lg font-semibold">
                            Processing Date
                        </Text>
                        <DatePickerForm
                            date={formData.processingDate}
                            onChange={(newDate) => handleDateChange("processingDate", newDate)}
                            text="Processing"
                        />
                    </View>

                    <View className="w-full">
                        <Text className="mb-2 text-lg font-semibold">
                            Batch ID
                        </Text>
                        <TextInput
                            className="ml-2 py-4 text-lg w-[90%] border rounded-lg p-4"
                            placeholder="Batch ID"
                            value={formData.batchID}
                            onChangeText={(text) => handleInputChange("batchID", text)}
                        />
                    </View>

                    <View className="w-full">
                        <Text className="mb-2 text-lg font-semibold">Drying:</Text>
                        <View className="flex-row justify-between mb-2">
                            <TextInput
                                className="ml-2 py-4 text-lg w-[48%] border rounded-lg p-4"
                                placeholder="Drying Batch ID"
                                value={formData.drying.batchID}
                                onChangeText={(text) => handleInputChange("drying.batchID", text)}
                            />
                            <TextInput
                                className="ml-2 py-4 text-lg w-[48%] border rounded-lg p-4"
                                placeholder="Drying Method"
                                value={formData.drying.method}
                                onChangeText={(text) => handleInputChange("drying.method", text)}
                            />
                        </View>
                        <View className="flex-row justify-between mb-2">
                            <DatePickerForm
                                date={formData.drying.startDate}
                                onChange={(newDate) => handleDateChange("drying.startDate", newDate)}
                                text="Start"
                                width="w-[48%]"
                            />
                            <DatePickerForm
                                date={formData.drying.endDate}
                                onChange={(newDate) => handleDateChange("drying.endDate", newDate)}
                                text="End"
                                width="w-[48%]"
                            />
                        </View>
                        <TextInput
                            className="ml-2 py-4 text-lg w-[90%] border rounded-lg p-4"
                            placeholder="Moisture Level (%)"
                            value={formData.drying.moisture}
                            onChangeText={(text) => handleInputChange("drying.moisture", text)}
                        />
                    </View>

                    <Pressable
                        onPress={handleNext}
                        className="bg-blue-500 p-4 rounded mt-6 ml-auto"
                    >
                        <Text className="text-xl font-bold text-white">Next</Text>
                    </Pressable>
                </View>
            </ScrollView>
        </>
    );
}