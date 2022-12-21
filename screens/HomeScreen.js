import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  RefreshControl,
} from "react-native";
import { axiosAuth } from "../api/axios";
import Card from "../components/Card";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useRef } from "react";

const HomeScreen = ({ navigation }) => {
  const [token, setToken] = useState("");
  const [events, setEvents] = useState([]);
  const [eventsCopy, setEventsCopy] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const searchRef = useRef(null);

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
              setEventsCopy(filteredEvents);
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
      navigation.setOptions({
        headerLargeTitle: true,
        headerTitle: "Home",
        headerRight: () => (
          <View className="flex-1 flex-row items-center justify-center w-2/12 px-2 py-3 absolute right-0 mr-4 text-base focus:w-full">
            <TouchableOpacity
              onPress={() => {
                searchRef.current.focus();
              }}
            >
              <Ionicons name="search" size={20} color="blue" />
            </TouchableOpacity>
            <TextInput
              ref={searchRef}
              autoCapitalize="none"
              returnKeyType="search"
              onSubmitEditing={(e) => {
                if (e.nativeEvent.text === "") {
                  setEvents(eventsCopy);
                  return;
                }

                const filteredEvents = events.filter((event) => {
                  return (
                    event.title
                      .toLowerCase()
                      .includes(e.nativeEvent.text.toLowerCase()) ||
                    event.venue
                      .toLowerCase()
                      .includes(e.nativeEvent.text.toLowerCase()) ||
                    event.description
                      .toLowerCase()
                      .includes(e.nativeEvent.text.toLowerCase()) ||
                    event.organizer
                      .toLowerCase()
                      .includes(e.nativeEvent.text.toLowerCase())
                  );
                });
                setEvents(filteredEvents);
              }}
              className="ml-3"
            />
          </View>
        ),
      });
      checkToken();
    }, [navigation])
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
            refreshControl={
              <RefreshControl
                refreshing={isLoading}
                onRefresh={async () => {
                  setIsLoading(true);
                  const token = await AsyncStorage.getItem("token");
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
                        const eventDate = new Date(
                          event.start.replace(" ", "T")
                        );
                        return eventDate > now;
                      });
                      setEvents(filteredEvents);
                      setEventsCopy(filteredEvents);
                      setIsLoading(false);
                    })
                    .catch(async (err) => {
                      console.log(err);
                    });
                }}
              />
            }
          />
        </View>
      ) : (
        !isLoading && (
          <View className="flex-1 justify-center items-center">
            <Text className="text-lg">No events found</Text>
          </View>
        )
      )}

      {isLoading && (
        <View className="flex-1 justify-center items-center h-full">
          <ActivityIndicator size={54} color="#242565" />
        </View>
      )}
    </View>
  );
};

export default HomeScreen;
