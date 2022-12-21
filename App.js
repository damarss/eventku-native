import { NavigationContainer, useFocusEffect } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import LoginScreen from "./screens/LoginScreen";
import { TailwindProvider } from "tailwindcss-react-native";
import LoadingScreen from "./screens/LoadingScreen";
import RegisterScreen from "./screens/RegisterScreen";
import HomeTab from "./screens/HomeTab";
import EventDetailScreen from "./screens/EventDetailScreen";
import EditProfileScreen from "./screens/EditProfileScreen";
import AddUserScreen from "./screens/AddUserScreen";
import AddEventScreen from "./screens/AddEventScreen";
import EditEventScreen from "./screens/EditEventScreen";
import EditUserScreen from "./screens/EditUserScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <TailwindProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Loading"
            component={LoadingScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ title: "Login", headerShown: false }}
          />
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{ title: "Register", headerShown: false }}
          />
          <Stack.Screen
            name="Home"
            component={HomeTab}
            options={{
              title: "Home",
              headerShown: false,
            }}
          />
          <Stack.Screen name="Detail" component={EventDetailScreen} />
          <Stack.Screen
            name="EditProfile"
            component={EditProfileScreen}
            options={{
              title: "Edit Profile",
            }}
          />
          <Stack.Screen
            name="AddUser"
            component={AddUserScreen}
            options={{
              title: "Add User",
            }}
          />
          <Stack.Screen
            name="AddEvent"
            component={AddEventScreen}
            options={{
              title: "Add Event",
            }}
          />
          <Stack.Screen
            name="EditEvent"
            component={EditEventScreen}
            options={{
              title: "Edit Event",
            }}
          />
          <Stack.Screen
            name="EditUser"
            component={EditUserScreen}
            options={{
              title: "Edit User",
            }}
          />
        </Stack.Navigator>
        <StatusBar style="auto" />
      </NavigationContainer>
    </TailwindProvider>
  );
}
