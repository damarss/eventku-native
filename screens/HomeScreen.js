import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { axiosAuth } from "../api/axios";
import Card from "../components/Card";

const HomeScreen = ({ navigation }) => {
  const [token, setToken] = useState("");
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      const checkToken = async () => {
        const token = await AsyncStorage.getItem("token");
        if (token) {
          axiosAuth(token)
            .get("event")
            .then((res) => {
              res.data.events.sort(
                (a, b) =>
                  new Date(a.start.replace(" ", "T")) -
                  new Date(b.start.replace(" ", "T"))
              );

              // remove past events
              const now = new Date();
              const filteredEvents = res.data.events.filter((event) => {
                const eventDate = new Date(event.start.replace(" ", "T"));
                return eventDate > now;
              });
              setEvents(filteredEvents);
              setIsLoading(false);
            })
            .catch(async (err) => {
              console.log(err);
            });
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
        <View className="flex justify-center">
          <FlatList
            data={events}
            renderItem={({ item }) => (
              <Card item={item} navigation={navigation} />
            )}
            keyExtractor={(item) => item.id}
          />
        </View>
      ) : (
        <View className="flex-1 justify-center items-center">
          <Text className="text-lg">No events found</Text>
        </View>
      )}

      {isLoading && (
        <View className="flex-1 justify-center items-center h-full">
          <ActivityIndicator size="large" />
        </View>
      )}
    </View>
  );
};

export default HomeScreen;
