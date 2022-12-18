import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { Image, Text, View } from "react-native";
import { axiosAuth } from "../api/axios";
import CustomButton from "../components/CustomButton";
import jwt_decode from "jwt-decode";

const ProfileScreen = ({ navigation, route }) => {
  const [profile, setProfile] = useState(null);

  const handleLogout = async () => {
    await AsyncStorage.removeItem("token");
    navigation.navigate("Login");
  };

  useFocusEffect(
    useCallback(() => {
      const checkToken = async () => {
        const token = await AsyncStorage.getItem("token");
        if (token) {
          const decodedToken = jwt_decode(token);
          console.log(decodedToken);
          axiosAuth(token)
            .get(`user/${decodedToken.uid}`)
            .then((res) => {
              console.log(res.data);
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

      // axiosAuth(token).get(`user/${token.uid}`);
    }, [])
  );

  return (
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
      <View className="flex mx-12 mt-12">
        
        <CustomButton title="Logout" onPress={handleLogout} />
      </View>
    </View>
  );
};

export default ProfileScreen;
