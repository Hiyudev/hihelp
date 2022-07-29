import { NavigationContainer } from "@react-navigation/native";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { useState, useEffect } from "react";

import { AppRoutes } from "./App.routes";
import { LoginRoutes } from "./Login.routes";
import { Loading } from "../components/Loading";
import { StatusBar } from "react-native";
import { useColorModeValue } from "native-base";

export function Routes() {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User>();

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged((res) => {
      setUser(res);
      setIsLoading(false);
    });

    return subscriber;
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <StatusBar
        barStyle={useColorModeValue("dark-content", "light-content")}
        backgroundColor={"transparent"}
        translucent
      />
      <NavigationContainer>
        {user ? <AppRoutes /> : <LoginRoutes />}
      </NavigationContainer>
    </>
  );
}
