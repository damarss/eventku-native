import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { useCallback } from "react";
import { useState } from "react";
import {
  Image,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import axios, { axiosAuth } from "../api/axios";
import CustomButton from "../components/CustomButton";
import jwt_decode from "jwt-decode";
import {
  AlertNotificationRoot,
  ALERT_TYPE,
  Dialog,
} from "react-native-alert-notification";

const EditUserScreen = ({ navigation, route }) => {
  const user = route.params.user;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const nameRef = React.useRef();
  const emailRef = React.useRef();
  const passwordRef = React.useRef();

  const handleEdit = async () => {
    const data = {
      name: name,
      email: email,
      username: username,
    };

    if (password) {
      data.password = password;
    }

    const token = await AsyncStorage.getItem("token");

    await axiosAuth(token).put(`user/${user.id}`, data, {
      headers: { "Content-type": "application/json" },
    });

    Dialog.show({
      type: ALERT_TYPE.SUCCESS,
      title: "Success",
      textBody: "Update profile success",
      button: "close",
      autoClose: true,
    });

    setTimeout(() => {
      navigation.navigate("Admin");
    }, 2000);
  };

  useFocusEffect(
    useCallback(() => {
      setEmail(user.email);
      setName(user.name);
      setUsername(user.username);
    }, [])
  );

  return (
    <AlertNotificationRoot>
      <View className="flex-1 items-center justify-center bg-white pt-5">
        <View className="w-32 h-32 rounded-full mb-5">
          <Image
            className="w-32 h-32 rounded-full -top-10"
            source={{
              uri: "https://i.pravatar.cc/",
            }}
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
              editable={false}
              value={username}
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
                nameRef.current.focus();
              }}
              value={email}
              returnKeyType="next"
            />
          </View>
          <View className="border-2 px-3 py-4 rounded-2xl w-full mt-5">
            <TextInput
              ref={nameRef}
              placeholder="Name"
              onChangeText={setName}
              autoCapitalize="none"
              onSubmitEditing={() => {
                passwordRef.current.focus();
              }}
              value={name}
              returnKeyType="next"
            />
          </View>
          <View className="border-2 px-3 py-4 rounded-2xl w-full mt-5">
            <TextInput
              ref={passwordRef}
              placeholder="Password (optional)"
              onChangeText={setPassword}
              autoCapitalize="none"
              blurOnSubmit={true}
              secureTextEntry={true}
              returnKeyType="done"
            />
          </View>
        </View>
        <View className="w-10/12 relative top-7">
          <CustomButton title="Edit Profile" onPress={handleEdit} />
        </View>

        <StatusBar style="auto" />
      </View>
    </AlertNotificationRoot>
  );
};

export default EditUserScreen;
