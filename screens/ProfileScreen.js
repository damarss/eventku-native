import { Image, Text, View } from "react-native";

const ProfileScreen = ({ navigation, route }) => {
  return (
    <View className="mt-7 flex-1">
      {/* profile pict */}
      <Text className="text-2xl font-bold text-center">Your Profile</Text>
      <View className="flex flex-row justify-center">
        {/* random image */}
        <View className="w-32 h-32 bg-gray-300 rounded-full">
          <Image
            className="w-32 h-32 rounded-full"
            source={{
              uri: "https://i.pravatar.cc/",
            }}
          />
        </View>

        {/* profile info */}
        <View className="flex flex-col justify-center ml-5">
          <Text className="text-xl font-bold">John Doe</Text>
          <Text className="text-gray-500">Name</Text>
          <Text className="text-gray-500">Email</Text>
        </View>
      </View>

      {/* profile menu */}
      <View className="flex">

      </View>
    </View>
  );
};

export default ProfileScreen;
