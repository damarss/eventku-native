import { StatusBar } from "expo-status-bar";
import { Button, Text, TouchableWithoutFeedback, View } from "react-native";
import axios from "../api/axios";
import CustomButton from "../components/CustomButton";

const LoginScreen = ({ navigation }) => {
  const handleLogin = () => {
    axios
      .post("login", {
        username: "admin",
        password: "uzumymw555",
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log("NJING");
        console.log(err);
      });
  };

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Button
        className="bg-blue-400 shadow-none text-white p-5 rounded-full"
        title="Profile"
        onPress={handleLogin}
      />
      <CustomButton title="Login" onPress={handleLogin} />
      <TouchableWithoutFeedback className="bg-blue-400" onPress={handleLogin}>
        <Text className="text-red-500">This is LoginScreen</Text>
      </TouchableWithoutFeedback>
      <StatusBar style="auto" />
    </View>
  );
};

export default LoginScreen;
