import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider } from "native-base";

import { AppScreen } from "./src/screens";
import { THEME } from "./src/styles/theme";

export default function App() {
  return (
    <NativeBaseProvider theme={THEME}>
      <NavigationContainer>
        <AppScreen />
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
