import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  Alert,
  Button,
  Image,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import axios, { axiosAuth } from "../api/axios";
import CustomButton from "../components/CustomButton";

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const passwordRef = React.useRef();

  const handleLogin = async () => {
    axios
      .post("login", {
        username: username,
        password: password,
      })
      .then(async (res) => {
        Alert.alert("Login Success");
        await AsyncStorage.setItem("token", res.data.token);
        navigation.navigate("Home");
      })
      .catch((err) => {
        Alert.alert("Login Failed");
        console.log(err);
      });
  };

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <View className="items-center fixed -top-16">
        <Image
          className="w-32 h-32 mx-auto"
          source={require("../assets/eventku.png")}
        />
      </View>
      <View className="w-10/12">
        {/* logo */}
        <TextInput
          className="border px-5 py-2 rounded-md w-full"
          placeholder="Username"
          onChangeText={setUsername}
          autoCapitalize="none"
          onSubmitEditing={() => {
            passwordRef.current.focus();
          }}
          blurOnSubmit={false}
          returnKeyType="next"
        />
        <TextInput
          ref={passwordRef}
          className="border px-5 py-2 rounded-md w-full mt-5"
          placeholder="Password"
          onChangeText={setPassword}
          autoCapitalize="none"
          secureTextEntry={true}
        />
      </View>
      <View className="w-10/12 relative top-7">
        <CustomButton title="Register" onPress={handleLogin} />
        <View className="flex flex-row justify-center mt-5">
          <Text className="text-gray-500">Already have an account?</Text>
          <TouchableWithoutFeedback
            onPress={() => {
              navigation.navigate("Login");
            }}
          >
            <Text className="text-blue-500 ml-2">Login</Text>
          </TouchableWithoutFeedback>
        </View>
      </View>

      <StatusBar style="auto" />
    </View>
  );
};

export default RegisterScreen;
