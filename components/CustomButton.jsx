import { Alert, Button, Text, Touchable, TouchableNativeFeedback, TouchableOpacity, TouchableWithoutFeedback } from "react-native";

const CustomButton = ({ children, ...props }) => (
    <TouchableNativeFeedback onPress={props.onPress}>
        <Text className="bg-teal-400 rounded-lg font-bold px-6 py-2 my-3 text-white">{props.title}</Text>
    </TouchableNativeFeedback>
);

export default CustomButton;