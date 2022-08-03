import auth from "@react-native-firebase/auth";
import { useNavigation } from "@react-navigation/native";
import {
  VStack,
  Heading,
  Icon,
  useTheme,
  useColorModeValue,
  HStack,
  IconButton,
  useColorMode,
  Text,
} from "native-base";
import { Envelope, Key, Moon, Sun } from "phosphor-react-native";
import { useState } from "react";
import { Alert } from "react-native";

import Logo from "../assets/Logo.svg";
import { Button } from "../components/Button";
import { Input } from "../components/Input";

export function SignIn() {
  const { colors } = useTheme();
  const { toggleColorMode, colorMode } = useColorMode();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const bgColor = useColorModeValue("gray.100", "gray.900");
  const sbgColor = useColorModeValue("gray.200", "gray.800");
  const txtColor = useColorModeValue("gray.900", "gray.100");
  const txtColorObj = useColorModeValue(colors.gray[700], colors.gray[300]);

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

  const handleGoSignUp = () => {
    navigation.navigate("signup");
  };

  const handleGoRecover = () => {
    navigation.navigate("recover");
  };

  const handleChangeTheme = () => {
    toggleColorMode();
  };

  return (
    <>
      <VStack flex={1} alignItems="center" bg={bgColor} px={8} pt={24}>
        <IconButton
          position="absolute"
          right={8}
          top={8}
          bg={sbgColor}
          rounded="full"
          onPress={handleChangeTheme}
          icon={
            colorMode === "dark" ? (
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
          Acesse sua conta
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
          mb={8}
          placeholder="Senha"
          InputLeftElement={<Icon ml={4} as={<Key color={txtColorObj} />} />}
          onChangeText={setPassword}
        />
        <Button
          isLoading={isLoading}
          title="Entrar"
          w="full"
          onPress={handleSignIn}
        />

        <Text onPress={handleGoSignUp} mt={4}>
          Cadastrar-se
        </Text>

        <Text onPress={handleGoRecover} mt={4}>
          Recuperar senha
        </Text>
      </VStack>
    </>
  );
}
