import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { Image, Text, TouchableHighlight, View } from "react-native";
import { axiosAuth } from "../api/axios";
import CustomButton from "../components/CustomButton";
import jwt_decode from "jwt-decode";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
  AlertNotificationRoot,
  ALERT_TYPE,
  Dialog,
} from "react-native-alert-notification";

const ProfileScreen = ({ navigation, route }) => {
  const [profile, setProfile] = useState(null);

  const handleLogout = async () => {
    Dialog.show({
      type: ALERT_TYPE.WARNING,
      title: "Logout",
      textBody: "Are you sure want to logout?",
      button: "Yes",
      onPressButton: async () => {
        console.log("logout");
        await AsyncStorage.removeItem("token");
        navigation.navigate("Login");
        Dialog.hide();
      },
    });
  };

  useFocusEffect(
    useCallback(() => {
      const checkToken = async () => {
        const token = await AsyncStorage.getItem("token");
        if (token) {
          const decodedToken = jwt_decode(token);
          axiosAuth(token)
            .get(`user/${decodedToken.uid}`)
            .then((res) => {
              setProfile(res.data);
            });
        } else {
          console.log("token not found");
          setTimeout(() => {
            navigation.navigate("Login");
          }, [700]);
        }
      };
      checkToken();
    }, [])
  );

  return (
    <AlertNotificationRoot>
      <View className="flex-1 bg-white">
        {/* profile pict */}
        <View className="flex flex-row justify-center bg-white">
          {/* random image */}
          <View className="w-32 h-32 rounded-full">
            <Image
              className="w-32 h-32 rounded-full"
              source={{
                uri: "https://i.pravatar.cc/",
              }}
            />
          </View>

          {/* profile info */}
          {profile && (
            <View className="flex flex-col justify-center ml-5">
              <Text className="text-xl font-bold">{profile.name}</Text>
              <Text className="text-gray-500">{profile.username}</Text>
              <Text className="text-gray-500">{profile.email}</Text>
            </View>
          )}
        </View>

        {/* profile menu */}
        <View className="flex flex-col mt-12">
          <TouchableHighlight
            underlayColor="white"
            onPress={() => {
              navigation.navigate("Events");
            }}
          >
            <View className="flex flex-row items-center gap-3 mx-12">
              <View className="bg-blue-200 p-3 rounded-full">
                <Ionicons name="calendar" color="#3B82F6" size={32} />
              </View>
              <View>
                <Text className="text-base font-bold">My Events</Text>
                <Text>See all your events</Text>
              </View>
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor="white"
            onPress={() => {
              navigation.navigate("EditProfile");
            }}
          >
            <View className="flex flex-row items-center gap-3 mx-12 mt-3">
              <View className="bg-blue-200 p-3 rounded-full">
                <Ionicons name="settings" color="#3B82F6" size={32} />
              </View>
              <View>
                <Text className="text-base font-bold">Settings</Text>
                <Text>Change your profile</Text>
              </View>
            </View>
          </TouchableHighlight>
        </View>

        <View className="flex mx-12 mt-12">
          <CustomButton title="Logout" onPress={handleLogout} />
        </View>
      </View>
    </AlertNotificationRoot>
  );
};

export default ProfileScreen;
