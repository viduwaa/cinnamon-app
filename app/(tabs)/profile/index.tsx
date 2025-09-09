import { useRouter } from "expo-router";
import React from "react";
import { Image, ScrollView, StatusBar, Text, TouchableOpacity, View,Dimensions } from "react-native";
import { useAuth } from "@/contexts/AuthContext";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export default function Profile() {
  const { role, setRole } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    setRole(null);
    router.replace("/(auth)/landing");
  };

  const handleUpdateProfilePic = () => {
    // Placeholder for profile picture update functionality
    // In a real app, this would use expo-image-picker or similar
    alert("Profile picture update functionality would be implemented here.");
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
              Profile
            </Text>
          </View>
          <View className="items-end">
            <View className="flex-row gap-1">
              <View className="w-2 h-2 rounded-full bg-gray-600" />
              <View className="w-2 h-2 rounded-full bg-gray-600" />
              <View className="w-2 h-2 rounded-full bg-gray-300" />
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
            <Text className="text-base text-gray-600 font-medium">
              Account Created: January 15, 2023
            </Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View className="px-5 mt-6">
          <TouchableOpacity
            className="bg-amber-900 flex-row justify-between items-center ml-10 w-4/5 p-4 rounded-lg mb-4 shadow-md"
            onPress={handleUpdateProfilePic}
          >
            <Text className="text-white text-sm font-semibold text-justify">
              Update Profile Picture
            </Text>
            <Text className="text-white text-lg font-bold">→</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-amber-900 flex-row justify-between items-center ml-10 w-4/5 p-4 rounded-lg mb-4 shadow-md"
            onPress={handleLogout}
          >
            <Text className="text-white text-sm font-semibold text-justify">
              Logout
            </Text>
            <Text className="text-white text-lg font-bold">→</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
}