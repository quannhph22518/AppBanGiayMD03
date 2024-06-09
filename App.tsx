import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import WelcomeScreen from "./src/screens/Welcome";
import LoginScreen from "./src/screens/Login";
import SigupScreen from "./src/screens/Signup";
import PassW from "./src/screens/PassW";
import Profile from "./src/screens/Profile";
import Setting from "./src/screens/Setting";


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
      
        <Stack.Screen name="SETTING" component={Setting} />




      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});