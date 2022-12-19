import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Linking,
  ScrollView,
  Text,
  Touchable,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { axiosAuth } from "../api/axios";
import jwt_decode from "jwt-decode";
import Card from "../components/Card";
import CustomButton from "../components/CustomButton";
import { FloatingAction } from "react-native-floating-action";
import {
  AlertNotificationRoot,
  ALERT_TYPE,
  Dialog,
  Toast,
} from "react-native-alert-notification";

const AdminScreen = ({ navigation }) => {
  const [token, setToken] = useState("");
  const [current, setCurrent] = useState("users");
  const [users, setUsers] = useState([]);
  const [events, setEvents] = useState([]);

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

          const res = await axiosAuth(token).get("event");
          setEvents(res.data.events);

          const res2 = await axiosAuth(token).get("user");
          setUsers(res2.data.users);
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
      text: "Manage Events",
      icon: require("../assets/icons/event.png"),
      name: "bt_events",
      position: 2,
      color: "#242565",
    },
    {
      text: "Manage User",
      icon: require("../assets/icons/people.png"),
      name: "bt_user",
      position: 1,
      color: "#242565",
    },
  ];

  const handleClick = (name) => {
    if (name === "bt_events") {
      setCurrent("events");
    } else if (name === "bt_user") {
      setCurrent("users");
    }
  };

  const UserList = ({ item }) => {
    return (
      <View className="flex-1 bg-white">
        <View className="flex justify-center">
          <Text className="text-base">{item.name}</Text>
          <TouchableWithoutFeedback
            onPress={() => {
              Linking.canOpenURL(`mailto:${item.email}`).then((supported) => {
                if (supported) {
                  Linking.openURL(`mailto:${item.email}`);
                } else {
                  console.log("Don't know how to open URI: " + item.email);
                }
              });
            }}
          >
            <Text className="text-blue-500">{item.email}</Text>
          </TouchableWithoutFeedback>
        </View>
      </View>
    );
  };

  const EventList = ({ item }) => {
    return (
      <View className="flex-1 bg-white">
        <View className="flex justify-center">
          <Text className="text-base">{item.title}</Text>
          <TouchableWithoutFeedback>
            <Text className="text-blue-500">{item.venue}</Text>
          </TouchableWithoutFeedback>
        </View>
      </View>
    );
  };

  return (
    <AlertNotificationRoot>
      <View className="flex-1 items-center bg-white">
        {/* show list of user */}
        <View className="flex-1 items-center justify-center bg-white">
          <View className="items-center">
            <Image
              className="w-16 h-16 mx-auto"
              source={
                current === "users"
                  ? require("../assets/icons/people.png")
                  : require("../assets/icons/event.png")
              }
            />
            <Text className="text-2xl font-bold text-gray-800">
              List of {current.charAt(0).toUpperCase() + current.slice(1)}
            </Text>
          </View>
          <View className="flex-1 items-center justify-center bg-white">
            <View className="flex-1 items-center justify-center bg-white">
              <FlatList
                data={current === "users" ? users : events}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => {
                  if (current === "users") {
                    return <UserList item={item} />;
                  } else {
                    return <EventList item={item} />;
                  }
                }}
              />
            </View>
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
