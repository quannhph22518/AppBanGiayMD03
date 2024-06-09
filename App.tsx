import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import WelcomeScreen from "./src/Screen/Welcome";
import LoginScreen from "./src/Screen/Login";
import SigupScreen from "./src/Screen/Signup";
import PassW from "./src/Screen/PassW";
import Profile from "./src/Screen/Profile";
import Setting from "./src/Screen/Setting";


const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name={"Welcome"} component={WelcomeScreen} />
        <Stack.Screen name={"LOGIN"} component={LoginScreen} />
        <Stack.Screen name="SIGNUP" component={SigupScreen} />
        <Stack.Screen name="PASSW" component={PassW} />
        <Stack.Screen name="PROFILE" component={Profile} />
        <Stack.Screen name="SETTING" component={Setting} />




      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});