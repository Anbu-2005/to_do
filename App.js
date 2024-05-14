import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./src/screen/LoginScreen";
import SignupScreen from "./src/screen/SignUpScreen";
import ProfileScreen from "./src/screen/TodoListScreen";
import CGPACALCULATOR from "./src/screen/CGPACALCULATOR";
const Stack = createNativeStackNavigator();

const MyStack = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  useEffect(() => {
    const checkSignedIn = async () => {
      try {
        const value = await AsyncStorage.getItem("password");
        if (value == null) {
          setIsSignedIn(true);
        } else {
          setIsSignedIn(false);
        }
      } catch (error) {
        console.error("Error ", error);
      }
    };
    checkSignedIn();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isSignedIn ? (
          <>
            <Stack.Screen
              name="Home"
              component={LoginScreen}
              options={{ title: "Welcome", headerLeft: null }}
            />
            <Stack.Screen
              name="MyTasks"
              component={ProfileScreen}
              options={{ headerLeft: null }}
            />
            <Stack.Screen
              name="Register"
              component={SignupScreen}
              options={{ headerLeft: null }}
            />
            <Stack.Screen
              name="CGPACALCULATOR"
              component={CGPACALCULATOR}
              options={{ headerLeft: null }}
            />
          </>
        ) : (
          <Stack.Screen
            name="Profile"
            component={ProfileScreen}
            options={{ headerLeft: null }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default MyStack;
