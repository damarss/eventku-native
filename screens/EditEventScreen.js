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
  TouchableHighlight,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import axios, { axiosAuth } from "../api/axios";
import CustomButton from "../components/CustomButton";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import jwt_decode from "jwt-decode";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
  AlertNotificationRoot,
  ALERT_TYPE,
  Dialog,
} from "react-native-alert-notification";
import * as ImagePicker from "expo-image-picker";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import mime from "mime";

const EditEventScreen = ({ navigation, route }) => {
  const event = route.params.event;
  const [title, setTitle] = useState(event.title);
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState(event.description);
  const [startDate, setStartDate] = useState(new Date(event.start));
  const [endDate, setEndDate] = useState(new Date(event.end));
  const [venue, setVenue] = useState(event.venue);
  const [price, setPrice] = useState(event.price);
  const [organizer, setOrganizer] = useState(event.organizer);

  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);

  const handleEdit = async () => {
    const token = await AsyncStorage.getItem("token");

    if (!token) {
      navigation.navigate("Login");
      return;
    }

    if (!title || !description || !startDate || !endDate || !venue || !price) {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: "Error",
        textBody: "All fields are required",
        button: "close",
        autoClose: true,
      });
      return;
    }

    // remove second from date format
    let start = startDate.toISOString().replace(/\:\d{2}\.\d{3}Z$/, "");
    let end = endDate.toISOString().replace(/\:\d{2}\.\d{3}Z$/, "");

    const data = {
      title,
      description,
      start,
      end,
      venue,
      price,
      organizer,
      image,
    };

    const formData = getFormDataFromObj(data);

    try {
      const res = await axiosAuth(token).post("event", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.status === 201) {
        Dialog.show({
          type: ALERT_TYPE.SUCCESS,
          title: "Success",
          textBody: "Event added successfully",
          button: "close",
          autoClose: true,
        });
        setTimeout(() => {
          navigation.navigate("Events");
        }, 1000);
      }
    } catch (error) {
      console.log(error);
      console.log(error.response.data.message);
    }
  };

  const getFormDataFromObj = (formObj) => {
    const payload = new FormData();
    for (const key in formObj) {
      if (formObj.hasOwnProperty(key)) {
        payload.append(key, formObj[key]);
      }
    }
    return payload;
  };

  const selectImage = async () => {
    // request permission to access media library
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: "Error",
        textBody: "Permission to access media library is required",
        button: "close",
        autoClose: true,
      });
      return;
    }

    const res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    if (res.canceled) {
      return;
    }

    const newUri = res.assets[0].uri;

    const image = {
      uri: newUri,
      type: mime.getType(newUri),
      name: newUri.split("/").pop(),
    };

    setImage(image);
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
    <ScrollView className="flex-1 bg-white">
      <AlertNotificationRoot>
        <View className="flex-1 items-center bg-white mt-5 my-10">
          <View className="items-center mb-10">
            <Image
              className="w-16 h-16 mx-auto"
              source={require("../assets/icons/event.png")}
            />
          </View>
          <View className="w-10/12">
            <View className="border-2 px-3 py-4 rounded-2xl w-full flex flex-row items-center">
              <Ionicons name="text-outline" size={21} color="#242565" />
              <TextInput
                placeholder="Title"
                onChangeText={setTitle}
                autoCapitalize="words"
                className="ml-2 w-full"
                value={title}
              />
            </View>
            <View className="border-2 px-3 py-4 rounded-2xl w-full mt-5 max-h-52 flex flex-row items-center">
              <Ionicons name="text-outline" size={21} color="#242565" />
              <TextInput
                placeholder="Description"
                onChangeText={setDescription}
                autoCapitalize="sentences"
                multiline={true}
                className="ml-2 w-full"
                value={description}
              />
            </View>
            <View className="border-2 px-3 py-4 rounded-2xl w-full mt-5">
              <TouchableHighlight onPress={selectImage} underlayColor="white">
                <View className="flex flex-row items-center">
                  <Ionicons name="image" size={21} color="#242565" />
                  <Text className="ml-2 w-full text-gray-400">
                    {image ? image?.name : "Select New Image (optional)"}
                  </Text>
                </View>
              </TouchableHighlight>
            </View>
            <View>
              <TouchableHighlight
                onPress={() => setShow(true)}
                underlayColor="white"
              >
                <View className="border-2 px-3 py-4 rounded-2xl w-full mt-5">
                  <View className="flex flex-row items-center">
                    <Ionicons name="calendar" size={21} color="#242565" />
                    <Text className="ml-2 w-full text-gray-400">
                      {startDate
                        ? new Date(startDate).toDateString()
                        : "Select Start Date"}
                    </Text>
                  </View>
                </View>
              </TouchableHighlight>
              {show && (
                <RNDateTimePicker
                  onChange={(date) => {
                    setShow(false);
                    let timestamp = date.nativeEvent.timestamp;
                    setStartDate(new Date(timestamp));
                  }}
                  value={startDate}
                  display="default"
                  mode="date"
                  minimumDate={new Date()}
                />
              )}
            </View>
            <View>
              <TouchableHighlight
                onPress={() => setShow2(true)}
                underlayColor="white"
              >
                <View className="border-2 px-3 py-4 rounded-2xl w-full mt-5">
                  <View className="flex flex-row items-center">
                    <Ionicons name="calendar" size={21} color="#242565" />
                    <Text className="ml-2 w-full text-gray-400">
                      {endDate
                        ? new Date(endDate).toDateString()
                        : "Select End Date"}
                    </Text>
                  </View>
                </View>
              </TouchableHighlight>
              {show2 && (
                <RNDateTimePicker
                  onChange={(date) => {
                    setShow2(false);
                    let timestamp = date.nativeEvent.timestamp;
                    setEndDate(new Date(timestamp));
                  }}
                  value={endDate}
                  display="default"
                  mode="date"
                  minimumDate={new Date()}
                />
              )}
            </View>
            <View className="border-2 px-3 py-4 rounded-2xl w-full mt-5 max-h-52 flex flex-row items-center">
              <Ionicons name="location" size={21} color="#242565" />
              <TextInput
                placeholder="Venue"
                onChangeText={setVenue}
                autoCapitalize="words"
                className="ml-2 w-full"
                value={venue}
              />
            </View>
            <View className="border-2 px-3 py-4 rounded-2xl w-full mt-5 max-h-52 flex flex-row items-center">
              <Ionicons name="pricetags" size={21} color="#242565" />
              <TextInput
                placeholder="Price"
                onChangeText={setPrice}
                keyboardType="numeric"
                className="ml-2 w-full"
                value={price}
              />
            </View>
            <View className="border-2 px-3 py-4 rounded-2xl w-full mt-5 max-h-52 flex flex-row items-center">
              <Ionicons name="people" size={21} color="#242565" />
              <TextInput
                placeholder="Organizer"
                onChangeText={setOrganizer}
                autoCapitalize="words"
                className="ml-2 w-full"
                value={organizer}
              />
            </View>
          </View>
          <View className="w-10/12 relative top-7">
            <CustomButton title="Edit Event" onPress={handleEdit} />
          </View>

          <StatusBar style="auto" />
        </View>
      </AlertNotificationRoot>
    </ScrollView>
  );
};

export default EditEventScreen;
