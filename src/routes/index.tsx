import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { Text, useColorModeValue } from "native-base";
import { useState, useEffect } from "react";
import { StatusBar } from "react-native";

import { Loading } from "../components/Loading";
import { AppRoutes } from "./App.routes";

export function Routes() {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User>();
  const barStyle = useColorModeValue("dark-content", "light-content");

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
        barStyle={barStyle}
        backgroundColor="transparent"
        translucent
      />
      <AppRoutes isSignedIn={!!user} />
    </>
  );
}
