import {
  Heading,
  HStack,
  Icon,
  IconButton,
  useColorMode,
  useColorModeValue,
  useTheme,
  VStack,
  Text,
} from "native-base";
import React, { useState } from "react";
import { Alert } from "react-native";
import auth from "@react-native-firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { Moon, Sun, Envelope, Key } from "phosphor-react-native";
import Logo from "../assets/Logo.svg";

import { Button } from "../components/Button";
import { Input } from "../components/Input";

export function SignUp() {
  const { colors } = useTheme();
  const { toggleColorMode, colorMode } = useColorMode();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const navigation = useNavigation();

  const bgColor = useColorModeValue("gray.100", "gray.900");
  const sbgColor = useColorModeValue("gray.200", "gray.800");
  const txtColor = useColorModeValue("gray.900", "gray.100");
  const txtColorObj = useColorModeValue(colors.gray[700], colors.gray[300]);

  function handleSignUp() {
    if (!email || !password) {
      return Alert.alert("Cadastrar", "Informe e-mail e senha.");
    }

    if (!cpassword || cpassword !== password) {
      return Alert.alert("Cadastrar", "As senhas não se coencidem.");
    }

    setIsLoading(true);

    auth()
      .createUserWithEmailAndPassword(email, password)
      .catch((error) => {
        console.log(error);
        const errorCode = error.code;
        setIsLoading(false);

        switch (errorCode) {
          case "auth/invalid-email":
            return Alert.alert("Cadastrar", "E-mail inválido.");
          case "auth/weak-password":
            return Alert.alert("Cadastrar", "Senha fraca.");
          case "auth/email-already-in-use":
            return Alert.alert("Cadastrar", "E-mail já em uso.");
          default:
            return Alert.alert("Cadastrar", "Erro ao entrar.");
        }
      });
  }

  const handleGoSignIn = () => {
    navigation.navigate("signin");
  };

  const handleChangeTheme = () => {
    toggleColorMode();
  };

  return (
    <>
      <VStack flex={1} alignItems="center" bg={bgColor} px={8} pt={24}>
        <IconButton
          position={"absolute"}
          right={8}
          top={8}
          bg={sbgColor}
          rounded="full"
          onPress={handleChangeTheme}
          icon={
            colorMode == "dark" ? (
              <Moon size={24} color={colors.blue[300]} />
            ) : (
              <Sun size={24} color={colors.orange[700]} />
            )
          }
        />
        <HStack>
          <Logo color={useColorModeValue("black", "white")} />
        </HStack>

        <Heading color={txtColor} fontSize="xl" mt={20} mb={6}>
          Cadastre uma nova conta
        </Heading>

        <Input
          placeholder="E-mail"
          mb={4}
          InputLeftElement={
            <Icon ml={4} as={<Envelope color={txtColorObj} />} />
          }
          onChangeText={setEmail}
        />
        <Input
          secureTextEntry
          mb={4}
          placeholder="Senha"
          InputLeftElement={<Icon ml={4} as={<Key color={txtColorObj} />} />}
          onChangeText={setPassword}
        />
        <Input
          secureTextEntry
          mb={8}
          placeholder="Confirme a senha"
          InputLeftElement={<Icon ml={4} as={<Key color={txtColorObj} />} />}
          onChangeText={setCPassword}
        />
        <Button
          isLoading={isLoading}
          title="Cadastrar"
          w="full"
          onPress={handleSignUp}
        />

        <Text onPress={handleGoSignIn} mt={4}>
          Logar em uma conta
        </Text>
      </VStack>
    </>
  );
}
