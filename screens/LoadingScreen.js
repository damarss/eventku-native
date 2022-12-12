import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";
import CustomButton from "../components/CustomButton";

const LoadingScreen = ({ navigation }) => {
  useFocusEffect(
    useCallback(() => {
      const checkToken = async () => {
        const token = await AsyncStorage.getItem("token");
        if (token) {
          navigation.navigate("Home");
          console.log(token);
        } else {
          console.log("token not found");
          setTimeout(() => {
            navigation.navigate("Login");
          }, 700);
        }
      };
      checkToken();
    }, [])
  );

  return (
    <View className="flex flex-1 items-center justify-center">
      {/* show loading image */}
      <Image className="w-32 h-32" source={require("../assets/eventku.png")} />
      <ActivityIndicator size="large" />
    </View>
  );
};

export default LoadingScreen;
