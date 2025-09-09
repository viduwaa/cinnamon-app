import { useAuth } from "@/contexts/AuthContext";
import { Redirect } from "expo-router";
import { View, Text, StyleSheet } from "react-native";

export default function DashboardIndex() {
  const { role} = useAuth();


  // Redirect to role-specific dashboard
  switch (role) {
    case "farmer":
      return <Redirect href="/dashboard/farmer" />;
    case "collector":
      return <Redirect href="/dashboard/collector" />;
    case "distributor":
      return <Redirect href="/dashboard/distributor" />;
    case "exporter":
      return <Redirect href="/dashboard/exporter" />;
    case "processor":
      return <Redirect href="/dashboard/processor" />;
    default:
      return (
        <View style={styles.container}>
          <Text style={styles.errorText}>Unknown user role: {role}</Text>
        </View>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  errorText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
});