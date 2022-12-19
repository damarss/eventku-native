import React, { useCallback } from "react";
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
import { useFocusEffect } from "@react-navigation/core";
import {
  AlertNotificationRoot,
  ALERT_TYPE,
  Dialog,
} from "react-native-alert-notification";
// import icon

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
        await AsyncStorage.setItem("token", res.data.token);
        setUsername("");
        setPassword("");
        Dialog.show({
          type: ALERT_TYPE.SUCCESS,
          title: "Success",
          textBody: "Login success",
          button: "close",
          autoClose: true,
        });
        setTimeout(() => {
          navigation.navigate("Loading");
        }, 1500);
      })
      .catch((err) => {
        Dialog.show({
          type: ALERT_TYPE.DANGER,
          title: "Error",
          textBody: err.response?.data?.messages?.error
            ? err.response.data.messages.error
            : "Server error",
          button: "close",
          autoClose: true,
        });
        console.log(err);
      });
  };

  useFocusEffect(
    useCallback(() => {
      const checkToken = async () => {
        const token = await AsyncStorage.getItem("token");
        if (token) {
          navigation.navigate("Home");
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
    <AlertNotificationRoot>
      <View className="flex-1 items-center justify-center bg-white">
        <View className="items-center fixed -top-16">
          <Image
            className="w-32 h-32 mx-auto"
            source={require("../assets/eventku.png")}
          />
        </View>
        <View className="w-10/12">
          <View className="border-2 px-3 py-4 rounded-2xl w-full">
            <TextInput
              placeholder="Username"
              onChangeText={setUsername}
              autoCapitalize="none"
              onSubmitEditing={() => {
                passwordRef.current.focus();
              }}
              blurOnSubmit={false}
              returnKeyType="next"
            />
          </View>
          <View className="border-2 px-3 py-4 rounded-2xl w-full mt-5">
            <TextInput
              ref={passwordRef}
              placeholder="Password"
              onChangeText={setPassword}
              autoCapitalize="none"
              secureTextEntry={true}
            />
          </View>
        </View>
        <View className="w-10/12 relative top-7">
          <CustomButton title="Login" onPress={handleLogin} />
          <View className="flex flex-row justify-center mt-5">
            <Text className="text-gray-500">Don't have an account?</Text>
            <TouchableWithoutFeedback
              onPress={() => {
                navigation.navigate("Register");
              }}
            >
              <Text className="text-blue-500 ml-2">Register</Text>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </View>
    </AlertNotificationRoot>
  );
};

export default LoginScreen;
