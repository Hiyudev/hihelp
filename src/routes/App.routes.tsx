import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Details } from "../screens/Details";
import { Home } from "../screens/Home";
import { Recover } from "../screens/Recover";
import { Register } from "../screens/Register";
import { SignUp } from "../screens/SignUp";
import { SignIn } from "../screens/SignIn";

const { Navigator, Screen } = createNativeStackNavigator();

type AppRoutesProps = {
  isSignedIn: boolean;
};

export function AppRoutes({ isSignedIn }: AppRoutesProps) {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      {isSignedIn ? (
        <>
          <Screen name="home" component={Home} />
          <Screen name="new" component={Register} />
          <Screen name="details" component={Details} />
        </>
      ) : (
        <>
          <Screen name="signin" component={SignIn} />
          <Screen name="signup" component={SignUp} />
          <Screen name="recover" component={Recover} />
        </>
      )}
    </Navigator>
  );
}
