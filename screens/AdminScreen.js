import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { axiosAuth } from "../api/axios";
import jwt_decode from "jwt-decode";
import Card from "../components/Card";

const AdminScreen = ({ navigation }) => {
  const [token, setToken] = useState("");

  useFocusEffect(
    useCallback(() => {
      const checkToken = async () => {
        const token = await AsyncStorage.getItem("token");
        if (token) {
          const decodedToken = jwt_decode();
        } else {
          console.log("token not found");
          setTimeout(() => {
            navigation.navigate("Events");
          }, [700]);
        }
      };
      checkToken();
    }, [])
  );

  return (
    <View className="flex-1 items-center bg-white">
      <Text>Halo</Text>
    </View>
  );
};

export default AdminScreen;
