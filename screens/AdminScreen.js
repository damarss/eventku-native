import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  Linking,
  RefreshControl,
  ScrollView,
  Text,
  Touchable,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { axiosAuth } from "../api/axios";
import jwt_decode from "jwt-decode";
import { FloatingAction } from "react-native-floating-action";
import {
  AlertNotificationRoot,
  ALERT_TYPE,
  Dialog,
  Toast,
} from "react-native-alert-notification";
import UserList from "../components/UserList";
import EventList from "../components/EventList";

const AdminScreen = ({ navigation }) => {
  const [token, setToken] = useState("");
  const [current, setCurrent] = useState("users");
  const [users, setUsers] = useState([]);
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);

    wait(2000).then(() => setRefreshing(false));

    const token = await AsyncStorage.getItem("token");
    const res = await axiosAuth(token).get("user");
    setUsers(res.data.users);

    const res2 = await axiosAuth(token).get("event");
    setEvents(res2.data.events);
  }, []);

  useFocusEffect(
    useCallback(() => {
      const checkToken = async () => {
        const token = await AsyncStorage.getItem("token");
        if (token) {
          const decodedToken = jwt_decode(token);
          if (decodedToken.role !== "admin") {
            Toast.show({
              type: ALERT_TYPE.DANGER,
              title: "Error",
              textBody: "You are not authorized to access this page",
              autoClose: true,
            });

            setTimeout(() => {
              navigation.navigate("Events");
            }, 1500);
          }

          const res = await axiosAuth(token).get("user");
          setUsers(res.data.users);

          const res2 = await axiosAuth(token).get("event");
          setEvents(res2.data.events);

          setIsLoading(false);
        } else {
          console.log("token not found");
          setTimeout(() => {
            navigation.navigate("Events");
          }, [700]);
        }
      };
      checkToken();
    }, [])
  );

  const actions = [
    {
      text: "Manage User",
      icon: require("../assets/icons/people.png"),
      name: "bt_user",
      position: 1,
      color: "#242565",
    },
    {
      text: "Add User",
      icon: require("../assets/icons/add-user.png"),
      name: "bt_add_user",
      position: 2,
      color: "#242565",
    },
    {
      text: "Manage Events",
      icon: require("../assets/icons/event.png"),
      name: "bt_events",
      position: 3,
      color: "#242565",
    },
    {
      text: "Add Event",
      icon: require("../assets/icons/add-event.png"),
      name: "bt_add_event",
      position: 4,
      color: "#242565",
    },
  ];

  const handleClick = (name) => {
    if (name === "bt_events") {
      setCurrent("events");
    } else if (name === "bt_user") {
      setCurrent("users");
    } else if (name === "bt_add_user") {
      navigation.navigate("AddUser");
    } else if (name === "bt_add_event") {
      navigation.navigate("AddEvent");
    }
  };

  return (
    <AlertNotificationRoot>
      <View className="flex-1 items-center bg-white">
        {/* show list of user */}
        <View className="flex-1 items-center bg-white">
          <View className="flex-row w-full bg-white">
            {!isLoading ? (
              <FlatList
                data={current === "users" ? users : events}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => {
                  if (current === "users") {
                    return <UserList item={item} navigation={navigation} />;
                  } else {
                    return <EventList item={item} navigation={navigation} />;
                  }
                }}
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                  />
                }
              />
            ) : (
              <ActivityIndicator size={54} color="#242565" />
            )}
          </View>
        </View>

        {/* floating action untuk add event dan user */}
        <FloatingAction
          actions={actions}
          onPressItem={(name) => {
            handleClick(name);
          }}
          color="#242565"
        />
      </View>
    </AlertNotificationRoot>
  );
};

export default AdminScreen;
