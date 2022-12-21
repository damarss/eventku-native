import { Alert, Image, Text, TouchableHighlight, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

// card component
const Card = ({ item, navigation }) => {
  const formatter = (num) => {
    if (num == 0) {
      return "Gratis";
    } else if (num > 999 && num < 1000000) {
      return (num / 1000).toFixed(0) + "K";
    } else if (num > 1000000) {
      return (num / 1000000).toFixed(0) + "M";
    }
  };

  return (
    <TouchableHighlight
      underlayColor="white"
      onPress={() => {
        navigation.navigate("Detail", { item: item });
      }}
    >
      <View
        style={{ elevation: 6 }}
        className="bg-white p-3 mx-3 my-2 rounded-xl flex justify-center"
      >
        <View className="w-full h-56 mb-3">
          <Image
            className="w-full h-full rounded-xl"
            source={{
              uri: `https://eventku-id.my.id/uploads/images/${item.image_url}`,
            }}
          />
        </View>
        <Text className="font-bold text-lg mb-2">{item.title}</Text>
        <Text className="mb-2">
          {`${item.description.slice(0, 160)}${
            item.description.length > 160 ? "..." : ""
          }`}
        </Text>
        <View className="flex flex-row items-center mb-1">
          <Ionicons name="calendar" color="#3B82F6" size={21} />
          <Text className="text-blue-500 text-[16px] font-bold ml-3">
            {new Date(item.start.replace(" ", "T")).toDateString()}
          </Text>
        </View>
        <View className="flex flex-row items-center mb-1">
          <Ionicons name="location" color="#3B82F6" size={21} />
          <Text className="font-bold text-[16px] ml-3 w-11/12">
            {item.venue}
          </Text>
        </View>
        <View className="flex flex-row items-center">
          <Ionicons name="pricetags" color="#3B82F6" size={21} />
          <Text className="font-bold text-[16px] ml-3">
            {formatter(item.price)}
          </Text>
        </View>
      </View>
    </TouchableHighlight>
  );
};

export default Card;
