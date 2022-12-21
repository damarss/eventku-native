import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Image,
  ImageBackground,
  Linking,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import {
  AlertNotificationRoot,
  ALERT_TYPE,
  Dialog,
  Toast,
} from "react-native-alert-notification";
import { axiosAuth } from "../api/axios";

const EventList = ({ item, navigation }) => {
  const idrCurrencyFormat = (num) => {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  };

  return (
    <AlertNotificationRoot>
      <View
        className="flex justify-center bg-white my-2 px-3 py-2"
        style={{ elevation: 4 }}
      >
        <ImageBackground
          className="w-full h-32"
          source={{
            uri: `https://eventku-id.my.id/uploads/images/${item.image_url}`,
          }}
        />
        <View className="flex-row">
          <View className="flex-1">
            <Text className="text-base">{item.title}</Text>
            <Text className="text-sm">Organizer: {item.organizer}</Text>
            <TouchableWithoutFeedback
              onPress={() => {
                const url = `https://maps.google.com?q=${item.venue}`;

                Linking.canOpenURL(url).then((supported) => {
                  if (supported) {
                    Linking.openURL(url);
                  } else {
                    console.log("Don't know how to open URI: " + url);
                  }
                });
              }}
            >
              <Text className="text-blue-500">{item.venue}</Text>
            </TouchableWithoutFeedback>
            <Text className="text-gray-500">
              {item.price != 0
                ? `IDR ${idrCurrencyFormat(item.price)}`
                : "Gratis"}
            </Text>
          </View>
          <View className="flex-row items-center justify-center">
            <TouchableWithoutFeedback
              onPress={() => {
                navigation.navigate("EditEvent", {
                  event: item,
                });
              }}
            >
              <Image
                className="w-14 h-14"
                source={require("../assets/icons/edit.png")}
              />
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => {
                Dialog.show({
                  type: ALERT_TYPE.WARNING,
                  title: "Delete Event",
                  textBody: "Are you sure you want to delete this event?",
                  button: "Delete",
                  onPressButton: async () => {
                    const token = await AsyncStorage.getItem("token");

                    const res = await axiosAuth(token)
                      .delete(`event/${item.id}`)
                      .catch((err) => {
                        console.log(err.response.data);
                      });
                    if (res.status === 200) {
                      Toast.show({
                        type: ALERT_TYPE.SUCCESS,
                        title: "Success",
                        textBody: "User deleted successfully",
                        autoClose: true,
                      });
                      Dialog.hide();
                    } else {
                      Toast.show({
                        type: ALERT_TYPE.DANGER,
                        title: "Error",
                        textBody: "Something went wrong",
                        autoClose: true,
                      });
                      Dialog.hide();
                    }
                  },
                });
              }}
            >
              <Image
                className="w-14 h-14"
                source={require("../assets/icons/delete.png")}
              />
            </TouchableWithoutFeedback>
          </View>
        </View>
      </View>
    </AlertNotificationRoot>
  );
};

export default EventList;
