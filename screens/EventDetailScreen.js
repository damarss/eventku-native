import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import {
  View,
  Text,
  Dimensions,
  TouchableWithoutFeedback,
  Linking,
  ScrollView,
} from "react-native";
import Image from "react-native-scalable-image";
import Ionicons from "react-native-vector-icons/Ionicons";

const EventDetailScreen = ({ navigation, route }) => {
  const [item, setItem] = useState("");
  const [description, setDescription] = useState("");
  const [isClicked, setIsClicked] = useState(false);

  const idrCurrencyFormat = (num) => {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  };

  useFocusEffect(
    useCallback(() => {
      const getsetItem = () => {
        const { item } = route.params;
        setItem(item);
        setDescription(item.description.slice(0, 300));
        if (item.description.length > 300) {
          setDescription(item.description.slice(0, 300) + "...");
        }
      };
      getsetItem();
    }, [])
  );

  return (
    <ScrollView className="flex-1 bg-white">
      {item && (
        <>
          <Image
            width={Dimensions.get("window").width}
            source={{
              uri: `https://eventku-id.my.id/uploads/images/${item.image_url}`,
            }}
          />
          <View className="flex mx-4 mt-4 pb-5">
            <Text className="text-xl font-medium">{item.title}</Text>
            <View className="flex flex-row items-center gap-3 mt-3">
              <View className="bg-blue-200 p-3 rounded-full">
                <Ionicons name="calendar" color="#3B82F6" size={32} />
              </View>
              <View>
                <Text className="text-base font-bold">
                  {new Date(item.start.replace(" ", "T")).toDateString()}
                </Text>
                <Text>
                  {new Date(item.start.replace(" ", "T")).toTimeString()}
                </Text>
              </View>
            </View>
            <View className="flex flex-row items-center gap-3 mt-3">
              <View className="bg-blue-200 p-3 rounded-full">
                <Ionicons name="location" color="#3B82F6" size={32} />
              </View>
              <View>
                <Text className="text-base font-bold w-11/12">
                  {item.venue}
                </Text>
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
                  <Text className="text-blue-500">See on Google Maps</Text>
                </TouchableWithoutFeedback>
              </View>
            </View>
            <View className="flex flex-row items-center gap-3 mt-3">
              <View className="bg-blue-200 p-3 rounded-full">
                <Ionicons name="pricetags" color="#3B82F6" size={32} />
              </View>
              <View>
                <Text className="text-base font-bold">
                  {item.price != 0
                    ? `IDR ${idrCurrencyFormat(item.price)}`
                    : "Gratis"}
                </Text>
              </View>
            </View>
            <View className="flex flex-row items-center gap-3 mt-3">
              <View className="bg-blue-200 p-3 rounded-full flex flex-row items-center justify-center">
                <Ionicons name="people" color="#3B82F6" size={32} />
              </View>
              <View className="ml-3 flex">
                <Text className="text-base font-bold">{item.organizer}</Text>
                <Text className="text-gray-500">Organizer</Text>
              </View>
            </View>
            <View className="border-b border-gray-300 my-4" />
            <Text className="text-lg font-bold">About Event</Text>
            <Text>{description}</Text>
            {item.description.length > 300 && !isClicked && (
              <TouchableWithoutFeedback
                onPress={() => {
                  setDescription(item.description);
                  setIsClicked(true);
                }}
              >
                <Text className="text-blue-500">Read More</Text>
              </TouchableWithoutFeedback>
            )}
          </View>
        </>
      )}
    </ScrollView>
  );
};

export default EventDetailScreen;
