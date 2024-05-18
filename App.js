import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { ThemeProvider } from "styled-components/native";
import { theme } from "./src/infrastructure/theme";
import {
  useFonts as useOswald,
  Oswald_400Regular,
} from "@expo-google-fonts/oswald";
import * as Font from "expo-font";
import { useFonts as useLato, Lato_400Regular } from "@expo-google-fonts/inter";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text } from "react-native";
import { FlatList, SafeAreaView, Platform } from "react-native";
import { Navigation } from "./src/infrastructure/navigation";
import { AuthenticationContextProvider } from "./src/services/authentication/authentication.context";
import * as firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyD8a6Nl5Muc5jCwmencjz7vh4MKNWR8OMM",
  authDomain: "mealstogo-7965d.firebaseapp.com",
  projectId: "mealstogo-7965d",
  storageBucket: "mealstogo-7965d.appspot.com",
  messagingSenderId: "913425284235",
  appId: "1:913425284235:web:aaf181cc301869ca1ae88e",
  measurementId: "G-GGW9RW3J36",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const getFonts = () => {
  return Font.loadAsync({
    "Julius-Sans": require("./assets/fonts/JuliusSansOne-Regular.ttf"),
    "Facinate-Regular": require("./assets/fonts/Fascinate-Regular.ttf"),
  });
};

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    firebase
      .auth()
      .signInWithEmailAndPassword("cartimain@gmail.com", "tester")
      .then((user) => {
        console.log(user);
        setIsAuthenticated(true);
      })
      .catch((e) => console.log(e));
    getFonts();
  }, []);

  const [oswaldLoaded] = useOswald({
    Oswald_400Regular,
  });
  const [latoLoaded] = useLato({
    Lato_400Regular,
  });

  if (!isAuthenticated) return null;

  // if(!oswaldLoaded || !latoLoaded ) {
  //     return;
  // }

  return (
    <>
      <ThemeProvider theme={theme}>
        <AuthenticationContextProvider>
          <Navigation />
        </AuthenticationContextProvider>
      </ThemeProvider>
      <ExpoStatusBar style="auto" />
    </>
  );
}
