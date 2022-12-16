import { Image, Text, View } from "react-native";

// card component
const Card = ({ item }) => {
  return (
    <View className="bg-neutral-200 p-11 my-8">
      <Text className="text-green-500">{item.title}</Text>
      <Text className="text-green-500">{item.description}</Text>
      <Image
        className="w-32 h-32"
        source={{
          uri: `https://eventku-id.my.id/uploads/images/${item.image_url}`,
        }}
      />
    </View>
  );
};

export default Card;
