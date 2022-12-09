import { StatusBar } from "expo-status-bar";
import { Button, Text, View } from "react-native";
import CustomButton from "../components/CustomButton";

const LoginScreen = ({ navigation }) => {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Button
        className="bg-blue-400 shadow-none text-white p-5 rounded-full"
        title="Profile"
        onPress={() => navigation.navigate("Profile", { name: "Jane" })}
      />
      <CustomButton />
      <StatusBar style="auto" />
    </View>
  );
};

export default LoginScreen;
