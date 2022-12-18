import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";
import { axiosAuth } from "../api/axios";
import Card from "../components/Card";

const HomeScreen = ({ navigation }) => {
  const [token, setToken] = useState("");
  const [events, setEvents] = useState([]);

  useFocusEffect(
    useCallback(() => {
      const checkToken = async () => {
        const token = await AsyncStorage.getItem("token");
        if (token) {
          if (events.length <= 0) {
            axiosAuth(token)
              .get("event")
              .then((res) => {
                setEvents(res.data.events);
              })
              .catch(async (err) => {
                console.log(err);
                // await AsyncStorage.removeItem("token");
                // navigation.navigate("Login");
              });
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
    <View className="flex bg-white">
      {events.length > 0 ? (
        <View className="flex items-center">
          <FlatList
            data={events}
            renderItem={({ item }) => <Card item={item} />}
            keyExtractor={(item) => item.id}
          />
        </View>
      ) : (
        <View className="flex-1 justify-center items-center h-full">
          <ActivityIndicator size="large" />
        </View>
      )}
    </View>
  );
};

export default HomeScreen;
