import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Image,
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

const UserList = ({ item, navigation }) => {
  return (
    <AlertNotificationRoot>
      <View
        className="flex justify-center bg-white my-2 px-3 py-2"
        style={{ elevation: 4 }}
      >
        <View className="flex-row">
          <View className="flex-1">
            <Text className="text-base">{item.name}</Text>
            <Text className="text-sm">{item.username}</Text>
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
            <Text className="text-gray-500">{item.role}</Text>
          </View>
          <View className="flex-row items-center justify-center">
            <TouchableWithoutFeedback
              onPress={() => {
                navigation.navigate("EditUser", {
                  user: item,
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
                  title: "Delete User",
                  textBody: "Are you sure you want to delete this user?",
                  button: "Delete",
                  onPressButton: async () => {
                    const token = await AsyncStorage.getItem("token");

                    const res = await axiosAuth(token)
                      .delete(`user/${item.id}`)
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

export default UserList;
