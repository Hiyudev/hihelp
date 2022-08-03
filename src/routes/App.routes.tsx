import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Details } from "../screens/app/Details";
import { Home } from "../screens/app/Home";
import { Register } from "../screens/app/Register";

import { Recover } from "../screens/auth/Recover";
import { SignUp } from "../screens/auth/SignUp";
import { SignIn } from "../screens/auth/SignIn";

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
