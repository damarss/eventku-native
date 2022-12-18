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
        navigation.navigate("Login");
      })
      .catch((err) => {
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
            onSubmitEditing={() => {
              buttonRef.current.props.onPress();
            }}
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
  );
};

export default RegisterScreen;
