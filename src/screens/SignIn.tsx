import { VStack, Heading, Icon, useTheme } from "native-base";
import { Envelope, Key } from "phosphor-react-native";
import { useState } from "react";
import auth from "@react-native-firebase/auth";

import Logo from "../assets/logo_primary.svg";

import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { Alert } from "react-native";

export function SignIn() {
  const { colors } = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSignIn() {
    if (!email || !password) {
      return Alert.alert("Entrar", "Informe e-mail e senha.");
    }

    setIsLoading(true);

    auth()
      .signInWithEmailAndPassword(email, password)
      .catch((error) => {
        console.log(error);
        const errorCode = error.code;
        setIsLoading(false);

        switch (errorCode) {
          case "auth/invalid-email":
            return Alert.alert("Entrar", "E-mail inválido.");
          case "auth/user-not-found":
          case "auth/wrong-password":
            return Alert.alert("Entrar", "E-mail ou senha inválida.");
          default:
            return Alert.alert("Entrar", "Erro ao entrar.");
        }
      });
  }

  return (
    <VStack flex={1} alignItems="center" bg="gray.600" px={8} pt={24}>
      <Logo />

      <Heading color="gray.100" fontSize="xl" mt={20} mb={6}>
        Acesse sua conta
      </Heading>

      <Input
        placeholder="E-mail"
        mb={4}
        InputLeftElement={
          <Icon ml={4} as={<Envelope color={colors.gray[300]} />} />
        }
        onChangeText={setEmail}
      />
      <Input
        secureTextEntry
        mb={8}
        placeholder="Password"
        InputLeftElement={<Icon ml={4} as={<Key color={colors.gray[300]} />} />}
        onChangeText={setPassword}
      />
      <Button
        isLoading={isLoading}
        title="Entrar"
        w="full"
        onPress={handleSignIn}
      />
    </VStack>
  );
}
