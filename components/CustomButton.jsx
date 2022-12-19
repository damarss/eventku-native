import {
  Text,
  TouchableHighlight,
  TouchableNativeFeedback,
} from "react-native";

const CustomButton = ({ children, ...props }) => (
  <TouchableHighlight onPress={props.onPress}
    underlayColor="white"
  >
    <Text className="bg-[#242565] rounded-full font-bold px-6 py-5 my-3 uppercase text-white text-center">
      {props.title}
    </Text>
  </TouchableHighlight>
);

export default CustomButton;
