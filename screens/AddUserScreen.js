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
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import jwt_decode from "jwt-decode";
import { ALERT_TYPE, Dialog } from "react-native-alert-notification";

const AddUserScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const usernameRef = React.useRef();
  const emailRef = React.useRef();
  const passwordRef = React.useRef();

  const handleRegister = async () => {
    console.log(name, email, username, password);
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
          textBody: "User added successfully",
          button: "close",
          autoClose: true,
        });
        setTimeout(() => {
          navigation.navigate("Admin");
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
          const decodedToken = jwt_decode(token);
          if (decodedToken.role !== "admin") {
            setTimeout(() => {
              navigation.navigate("Events");
            }, 1000);
          }
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
    <View className="flex-1 items-center justify-center bg-white">
      <View className="items-center fixed -top-16">
        <Image
          className="w-32 h-32 mx-auto"
          source={require("../assets/icons/people.png")}
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
        <CustomButton title="Add User" onPress={handleRegister} />
      </View>

      <StatusBar style="auto" />
    </View>
  );
};

export default AddUserScreen;
