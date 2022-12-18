import { Image, Text, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

// card component
const Card = ({ item }) => {
  return (
    <View
      className="bg-white p-3 mx-3 my-2 rounded-xl flex justify-center"
      style={{ elevation: 6 }}
    >
      <View className="w-full h-52">
        <Image
          className="w-full h-full rounded-xl"
          source={{
            uri: `https://eventku-id.my.id/uploads/images/${item.image_url}`,
          }}
        />
      </View>
      <Text className="font-bold text-lg">{item.title}</Text>
      <Text className="text-blue-500 font-bold">
        {new Date(item.start.replace(" ", "T")).toLocaleDateString()}
      </Text>
      <View className="flex flex-row items-center">
        <Ionicons name="location" className="bg-blue-500" />
        <Text className="">{item.venue}</Text>
      </View>
    </View>
  );
};

export default Card;
