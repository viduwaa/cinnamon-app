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

     export default function Packaging() {
         const [formData, setFormData] = useState({
             batchID: "",
             packagingDate: new Date(),
             packageBy: "",
             packageType: "",
             packageWeight: "" // Fixed typo from 'pacakageWeight'
         });

         const router = useRouter();

         const handleInputChange = (field: string, value: string) => {
             setFormData((prev) => ({ ...prev, [field]: value }));
         };

         const handleNext = async () => {
             try {
                 // Save collector data to AsyncStorage
                 await AsyncStorage.setItem('distributorData', JSON.stringify(formData));
                 Alert.alert("Success", "Distributor data saved successfully!");
                 // Navigate to AddTransporter screen
                 router.push("/(tabs)/dashboard/distributor/Transport");
             } catch (error) {
                 console.error('Error saving Distributor data:', error);
                 Alert.alert("Error", "Failed to save Distributor data.");
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
                             Packaging Stage
                         </Text>
                         <Text className="text-2xl">Packaging Information</Text>
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
                                 Packaging Date
                             </Text>
                             <DatePickerForm
                                 date={formData.packagingDate}
                                 onChange={(newDate) =>
                                     setFormData({
                                         ...formData,
                                         packagingDate: newDate,
                                     })
                                 }
                                 text='Packed'
                             />
                         </View>

                         <View className="w-full">
                             <Text className="mb-2 text-lg font-semibold">
                                 Package By (Name/ID)
                             </Text>
                             <TextInput
                                 className="ml-2 py-4 text-lg w-[90%] border rounded-lg p-4"
                                 placeholder="By Name or ID"
                                 value={formData.packageBy}
                                 onChangeText={(text) =>
                                     handleInputChange("packageBy", text)
                                 }
                             />
                         </View>

                         <View className="w-full">
                             <Text className="mb-2 text-lg font-semibold">
                                 Packaging Type (Quills/Powder)
                             </Text>
                             <TextInput
                                 className="ml-2 py-4 text-lg w-[90%] border rounded-lg p-4"
                                 placeholder="Type"
                                 value={formData.packageType}
                                 onChangeText={(text) =>
                                     handleInputChange("packageType", text)
                                 }
                             />
                         </View>
                         <View className="w-full">
                             <Text className="mb-2 text-lg font-semibold">
                                 Package Weight (g/Kg)
                             </Text>
                             <TextInput
                                 className="ml-2 py-4 text-lg w-[90%] border rounded-lg p-4"
                                 placeholder="Weight"
                                 value={formData.packageWeight} // Updated to match state
                                 onChangeText={(text) =>
                                     handleInputChange("packageWeight", text)
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