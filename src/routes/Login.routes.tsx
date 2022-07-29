import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Recover } from "../screens/Recover";

import { SignIn } from "../screens/SignIn";
import { SignUp } from "../screens/SignUp";

const { Navigator, Screen } = createNativeStackNavigator();

export function LoginRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="signin" component={SignIn} />
      <Screen name="signup" component={SignUp} />
      <Screen name="recover" component={Recover} />
    </Navigator>
  );
}
