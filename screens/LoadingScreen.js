import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";

const LoadingScreen = ({ navigation }) => {
  useFocusEffect(
    useCallback(() => {
      const checkToken = async () => {
        const token = await AsyncStorage.getItem("token");
        if (token) {
          setTimeout(() => {
            navigation.navigate("Home");
          }, 1000);
        } else {
          setTimeout(() => {
            navigation.navigate("Login");
          }, 1000);
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
