import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  Alert,
  Button,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import axios, { axiosAuth } from "../api/axios";
import CustomButton from "../components/CustomButton";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import { ALERT_TYPE, Dialog } from "react-native-alert-notification";

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const usernameRef = React.useRef();
  const emailRef = React.useRef();
  const passwordRef = React.useRef();

  const handleRegister = async () => {
    axios
      .post("register", {
        name: name,
        email: email,
        username: username,
        password: password,
      })
      .then((res) => {
        Dialog.show({
          type: ALERT_TYPE.SUCCESS,
          title: "Success",
          textBody: "Register success",
          button: "close",
          autoClose: true,
        });
        setTimeout(() => {
          navigation.navigate("Login");
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
          navigation.navigate("Loading");
        }
      };
      checkToken();
    }, [])
  );

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 items-center bg-white mt-5 my-10">
        <View className="items-center fixed">
          <Image
            className="w-32 h-32 mx-auto"
            source={require("../assets/eventku.png")}
          />
        </View>
        <View className="w-10/12">
          <View className="border-2 px-3 py-4 rounded-2xl w-full">
            <TextInput
              placeholder="Name"
              onChangeText={setName}
              autoCapitalize="none"
              onSubmitEditing={() => {
                emailRef.current.focus();
              }}
              returnKeyType="next"
            />
          </View>
          <View className="border-2 px-3 py-4 rounded-2xl w-full mt-5">
            <TextInput
              ref={emailRef}
              placeholder="Email"
              onChangeText={setEmail}
              autoCapitalize="none"
              onSubmitEditing={() => {
                usernameRef.current.focus();
              }}
              returnKeyType="next"
            />
          </View>
          <View className="border-2 px-3 py-4 rounded-2xl w-full mt-5">
            <TextInput
              ref={usernameRef}
              placeholder="Username"
              onChangeText={setUsername}
              autoCapitalize="none"
              onSubmitEditing={() => {
                passwordRef.current.focus();
              }}
              returnKeyType="next"
            />
          </View>
          <View className="border-2 px-3 py-4 rounded-2xl w-full mt-5">
            <TextInput
              ref={passwordRef}
              placeholder="Password"
              onChangeText={setPassword}
              autoCapitalize="none"
              blurOnSubmit={true}
              secureTextEntry={true}
              returnKeyType="done"
            />
          </View>
        </View>
        <View className="w-10/12 relative top-7">
          <CustomButton title="Register" onPress={handleRegister} />
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
    </ScrollView>
  );
};

export default RegisterScreen;
