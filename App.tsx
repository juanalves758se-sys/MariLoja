import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "./src/pagesandlogin/Login";
import Pedidos from "./src/pagesandlogin/Pedidos";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Pedidos" component={Pedidos} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
