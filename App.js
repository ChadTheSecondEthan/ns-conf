import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import "react-native-gesture-handler";
import Navigation from "./Navigation";
import StorageProvider from "./storage/StorageProvider";

export default function App() {
  return (
    <NavigationContainer>
      <StorageProvider>
        <Navigation />
      </StorageProvider>
    </NavigationContainer>
  );
}
