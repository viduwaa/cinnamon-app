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

  export default function Delivery() {
      const [formData, setFormData] = useState({
          batchID: "",
          deliveredDate: new Date(),
          deliveredTO: "",
          Condition: "",
      });

      const router = useRouter();

      const handleInputChange = (field: string, value: string) => {
          setFormData((prev) => ({ ...prev, [field]: value }));
      };

      const handleNext = async () => {
          try {
              // Save delivery data to AsyncStorage
              await AsyncStorage.setItem('deliverData', JSON.stringify(formData));
              Alert.alert("Success", "Delivery data saved successfully!");
              // Navigate to ExporterQRCode
              router.push("/(tabs)/dashboard/exporter/QRCode");
          } catch (error) {
              console.error('Error saving Delivery data:', error);
              Alert.alert("Error", "Failed to save Delivery data.");
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
                      <Text className="text-2xl">Delivery Information</Text>
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
                              Delivery Date
                          </Text>
                          <DatePickerForm
                              date={formData.deliveredDate}
                              onChange={(newDate) =>
                                  setFormData({
                                      ...formData,
                                      deliveredDate: newDate,
                                  })
                              }
                              text='Transport'
                          />
                      </View>

                      <View className="w-full">
                          <Text className="mb-2 text-lg font-semibold">
                              Delivery to (Name/Company)
                          </Text>
                          <TextInput
                              className="ml-2 py-4 text-lg w-[90%] border rounded-lg p-4"
                              placeholder="Delivered To"
                              value={formData.deliveredTO}
                              onChangeText={(text) =>
                                  handleInputChange("deliveredTO", text)
                              }
                          />
                      </View>

                      <View className="w-full">
                          <Text className="mb-2 text-lg font-semibold">
                              Condition Upon Delivery
                          </Text>
                          <TextInput
                              className="ml-2 py-4 text-lg w-[90%] border rounded-lg p-4"
                              placeholder="Condition"
                              value={formData.Condition}
                              onChangeText={(text) =>
                                  handleInputChange("Condition", text)
                              }
                          />
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