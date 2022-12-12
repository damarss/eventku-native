import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  Alert,
  Button,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import axios, { axiosAuth } from "../api/axios";
import CustomButton from "../components/CustomButton";

const LoginScreen = ({ navigation }) => {
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
      <TextInput
        className="border px-5 py-2 rounded-md w-44"
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
        className="border px-5 py-2 rounded-md w-44 mt-5"
        placeholder="Password"
        onChangeText={setPassword}
        autoCapitalize="none"
        returnKeyType="login"
      />
      <CustomButton title="Login" onPress={handleLogin} />

      <StatusBar style="auto" />
    </View>
  );
};

export default LoginScreen;
