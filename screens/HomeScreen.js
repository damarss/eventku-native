import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { useState } from "react";
import { useCallback } from "react";
import { Button, Text, View } from "react-native";
import CustomButton from "../components/CustomButton";
import jwt_decode from "jwt-decode";

const HomeScreen = ({ navigation }) => {
  const [token, setToken] = useState("");

  const handleLogout = async () => {
    await AsyncStorage.removeItem("token");
    console.log("logout");
    navigation.navigate("Login");
  };

  useFocusEffect(
    useCallback(() => {
      const checkToken = async () => {
        const token = await AsyncStorage.getItem("token");
        if (token) {
          navigation.navigate("Home");
          console.log(token);
          const decodedToken = jwt_decode(token);
          console.log(decodedToken);
          setToken(decodedToken);
        } else {
          console.log("token not found");
          navigation.navigate("Login");
        }
      };
      checkToken();
    }, [])
  );

  return (
    <View className="flex-1 items-center bg-white">
      <View className="bg-neutral-200 p-11 my-8">
        <Text className="text-green-500">
          Your Token {JSON.stringify(token)}
        </Text>
        <Text className="text-green-500">Your Role {token.role}</Text>
      </View>
      <Button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        title="Go to Jane's profile"
        onPress={() => navigation.navigate("Profile", { name: "Jane" })}
      />
      <CustomButton title="Logout" onPress={handleLogout} />
    </View>
  );
};

export default HomeScreen;
