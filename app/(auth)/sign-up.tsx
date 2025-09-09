import MainButton from "@/components/ui/MainButton";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "expo-router";
import {
  Eye,
  EyeOff,
  RectangleEllipsis,
  Smartphone,
} from "lucide-react-native";
import { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignUp() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);

  const [open, setOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [items, setItems] = useState([
    { label: "Farmer", value: "farmer" },
    { label: "Collector", value: "collector" },
    { label: "Exporter", value: "exporter" },
    { label: "Distributor", value: "distributor" },
  ]);

  const { setRole } = useAuth();
  const router = useRouter();

  const handleSignUp = () => {
    if (!phoneNumber || !password || !rePassword || !selectedRole) {
      alert("Please fill in all fields.");
      return;
    }
    if (password !== rePassword) {
      alert("Passwords do not match.");
      return;
    }
    setRole(selectedRole);
    router.replace("/(tabs)/dashboard");
  };

  return (
    <>
      <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />
      <SafeAreaView
        className="flex-1 bg-primary"
        style={{
          paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        }}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 0 : StatusBar.currentHeight}
          style={{ flex: 1 }}
        >
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
          >
            <View className="flex-1 justify-between">
              {/* Logo + title */}
              <View className="items-center mt-8">
                <Image
                  source={require("@/assets/images/logo-main.png")}
                  className="w-36 h-36"
                  resizeMode="contain"
                />
                <Text className="text-3xl font-bold text-black mt-4">Sign Up</Text>
              </View>

              {/* Form card */}
              <View className="bg-white mx-6 rounded-2xl p-6 shadow-lg mt-6">
                {/* Role dropdown */}
                <View className="mb-4 z-50">
                  <Text className="text-xs uppercase text-gray-500 mb-2">
                    Sign Up As <Text className="text-red-600">*</Text>
                  </Text>
                  <DropDownPicker
                    open={open}
                    value={selectedRole}
                    items={items}
                    setOpen={setOpen}
                    setValue={setSelectedRole}
                    setItems={setItems}
                    placeholder="Select Role"
                    style={{
                      borderColor: "#d1d5db",
                      height: 50,
                      backgroundColor: "#FFF8F3",
                    }}
                    dropDownContainerStyle={{
                      borderColor: "#d1d5db",
                      backgroundColor: "#FFF8F3",
                      zIndex: 9999,
                    }}
                    textStyle={{
                      fontSize: 16,
                      color: "#000",
                    }}
                  />
                </View>

                {/* Phone */}
                <View className="mb-4">
                  <Text className="text-xs uppercase text-gray-500 mb-2">
                    Phone Number <Text className="text-red-600">*</Text>
                  </Text>
                  <View className="flex-row items-center border border-gray-200 rounded-xl px-3 py-2">
                    <Smartphone size={24} />
                    <TextInput
                      style={{ flex: 1 }}
                      className="ml-3 text-base"
                      placeholder="+94 7X XXX XXXX"
                      value={phoneNumber}
                      onChangeText={setPhoneNumber}
                      keyboardType="phone-pad"
                      autoCorrect={false}
                      autoCapitalize="none"
                    />
                  </View>
                </View>

                {/* Password */}
                <View className="mb-4">
                  <Text className="text-xs uppercase text-gray-500 mb-2">
                    Password <Text className="text-red-600">*</Text>
                  </Text>
                  <View className="flex-row items-center border border-gray-200 rounded-xl px-3 py-2">
                    <RectangleEllipsis size={24} />
                    <TextInput
                      style={{ flex: 1 }}
                      className="ml-3 text-base"
                      placeholder="●●●●●●●●●●"
                      value={password}
                      onChangeText={setPassword}
                      secureTextEntry={!showPassword}
                      autoCorrect={false}
                      autoCapitalize="none"
                    />
                    <TouchableOpacity
                      onPress={() => setShowPassword(!showPassword)}
                      className="p-2"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Re-password */}
                <View className="mb-4">
                  <Text className="text-xs uppercase text-gray-500 mb-2">
                    Re-enter Password <Text className="text-red-600">*</Text>
                  </Text>
                  <View className="flex-row items-center border border-gray-200 rounded-xl px-3 py-2">
                    <RectangleEllipsis size={24} />
                    <TextInput
                      style={{ flex: 1 }}
                      className="ml-3 text-base"
                      placeholder="●●●●●●●●●●"
                      value={rePassword}
                      onChangeText={setRePassword}
                      secureTextEntry={!showRePassword}
                      autoCorrect={false}
                      autoCapitalize="none"
                    />
                    <TouchableOpacity
                      onPress={() => setShowRePassword(!showRePassword)}
                      className="p-2"
                    >
                      {showRePassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Submit + link */}
                <View className="mt-2">
                  <MainButton text="Sign Up" onPress={handleSignUp} className="w-full" />
                  <View className="flex-row justify-center mt-3">
                    <Text className="text-sm text-gray-600">Already have an account?</Text>
                    <Pressable onPress={() => router.push("/(auth)/sign-in")}>
                      <Text className="ml-1 text-sm underline text-[#A97C37]">Sign In</Text>
                    </Pressable>
                  </View>
                </View>
              </View>

              <View style={{ height: 24 }} />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
}
