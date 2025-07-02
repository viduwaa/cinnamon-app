// screens/AddFarmer.tsx
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

export default function AddFarmer() {
    const [formData, setFormData] = useState({
        farmName: "",
        dateOfPlanting: new Date(),
        seedingSource: "",
        fertilizer: "",
        pesticides: "",
        organicCertified: "",
    });

    const router = useRouter();

    const handleInputChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = () => {
        Alert.alert("Form Submitted", JSON.stringify(formData, null, 2));
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
                        Cultivation Stage
                    </Text>
                    <Text className="text-2xl">Farm Information</Text>
                </View>
                <View className="w-[90%] flex gap-4 items-start justify-center mx-auto pb-10">
                    <View className="w-full">
                        <Text className="mb-2 text-lg font-semibold">
                            Farm Name
                        </Text>
                        <TextInput
                            className="ml-2 py-4 text-lg w-[90%] border rounded-lg p-4"
                            placeholder="Farm Name"
                            value={formData.farmName}
                            onChangeText={(text) =>
                                handleInputChange("farmName", text)
                            }
                        />
                    </View>

                    <View className="w-full">
                        <Text className=" text-lg font-semibold">
                            Date of Planting
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
                            Seeding Source
                        </Text>
                        <TextInput
                            className="ml-2 py-4 text-lg w-[90%] border rounded-lg p-4"
                            placeholder="Seeding Source"
                            value={formData.seedingSource}
                            onChangeText={(text) =>
                                handleInputChange("seedingSource", text)
                            }
                        />
                    </View>

                    <View className="w-full">
                        <Text className="mb-2 text-lg font-semibold">
                            Cultivation Practices
                        </Text>
                        <View className="flex gap-3 items-end">
                            <TextInput
                                className="ml-2 py-4 text-lg w-[90%] border rounded-lg p-4"
                                placeholder="Type of Fertilizer used"
                                value={formData.fertilizer}
                                onChangeText={(text) =>
                                    handleInputChange("fertilizer", text)
                                }
                            />
                            <TextInput
                                className="ml-2 py-4 text-lg w-[90%] border rounded-lg p-4"
                                placeholder="Pesticides Used"
                                value={formData.pesticides}
                                onChangeText={(text) =>
                                    handleInputChange("pesticides", text)
                                }
                            />
                            <TextInput
                                className="ml-2 py-4 text-lg w-[90%] border rounded-lg p-4"
                                placeholder="Organic Certification (Yes  |   No)"
                                value={formData.organicCertified}
                                onChangeText={(text) =>
                                    handleInputChange("organicCertified", text)
                                }
                            />
                        </View>
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
