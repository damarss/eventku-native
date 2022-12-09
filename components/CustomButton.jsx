import { Button } from "react-native";

const CustomButton = ({ children, ...props }) => (
    <Button className="flex py-2 px-7" {...props}>{children}</Button>
);

export default CustomButton;