import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { useState } from "react";
import { useCallback } from "react";
import { Button, FlatList, Image, Text, View } from "react-native";
import CustomButton from "../components/CustomButton";
import jwt_decode from "jwt-decode";
import { axiosAuth } from "../api/axios";
import Card from "../components/Card";

const HomeScreen = ({ navigation }) => {
  const [token, setToken] = useState("");
  const [events, setEvents] = useState([]);

  const handleLogout = async () => {
    await AsyncStorage.removeItem("token");
    console.log("logout");
    navigation.navigate("Login");
  };

  // data for flatlist
  const data = [
    {
      id: 1,
      title: "Event 1",
      description: "Event 1 Description",
      image: "https://picsum.photos/200/300",
    },
    {
      id: 2,
      title: "Event 2",
      description: "Event 2 Description",
      image: "https://picsum.photos/200/300",
    },
  ];

  useFocusEffect(
    useCallback(() => {
      const checkToken = async () => {
        const token = await AsyncStorage.getItem("token");
        if (token) {
          const decodedToken = jwt_decode(token);
          console.log(decodedToken);
          setToken(decodedToken);

          console.log(events[0]);

          if (events.length <= 0) {
            const res = await axiosAuth(token).get("event");
            setEvents(res.data.events);
            console.log(events);
          }
        } else {
          console.log("token not found");
          setEvents([]);
          setTimeout(() => {
            navigation.navigate("Login");
          }, [700]);
        }
      };
      checkToken();
    }, [])
  );

  return (
    <View className="flex-1 items-center bg-white">
      {events.length > 0 && (
        <FlatList
          data={events}
          renderItem={({ item }) => <Card item={item} />}
          keyExtractor={(item) => item.id}
        />
      )}
      <Button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        title="Go to Jane's profile"
        onPress={() => navigation.navigate("Profile", { name: "Jane" })}
      />
      <CustomButton title="Logout" onPress={handleLogout} />
    </View>
  );
};

export default HomeScreen;
