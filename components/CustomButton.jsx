import { Alert, Button, Text, Touchable, TouchableNativeFeedback, TouchableOpacity, TouchableWithoutFeedback } from "react-native";

const CustomButton = ({ children, ...props }) => (
    <TouchableNativeFeedback onPress={props.onPress}>
        <Text className="bg-[#242565] rounded-full font-bold px-6 py-4 my-3 uppercase text-white text-center">{props.title}</Text>
    </TouchableNativeFeedback>
);

export default CustomButton;