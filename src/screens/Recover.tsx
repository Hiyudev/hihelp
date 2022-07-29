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
import auth from "@react-native-firebase/auth";

import Logo from "../assets/Logo.svg";

import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

export function Recover() {
  const { colors } = useTheme();
  const { toggleColorMode, colorMode } = useColorMode();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const navigation = useNavigation();

  const bgColor = useColorModeValue("gray.100", "gray.900");
  const sbgColor = useColorModeValue("gray.200", "gray.800");
  const txtColor = useColorModeValue("gray.900", "gray.100");
  const txtColorObj = useColorModeValue(colors.gray[700], colors.gray[300]);

  function handleSignIn() {
    if (!email) {
      return Alert.alert("Recuperar", "Informe e-mail para recuperar senha.");
    }

    setIsLoading(true);

    auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        setIsLoading(false);
        Alert.alert(
          "Recuperar",
          "E-mail para redefinir a senha foi enviada com sucesso."
        );
        navigation.navigate("signin");
      })
      .catch((error) => {
        console.log(error);
        const errorCode = error.code;
        setIsLoading(false);

        switch (errorCode) {
          case "auth/invalid-email":
            return Alert.alert("Recuperar", "E-mail inválido.");
          case "auth/user-not-found":
          default:
            return Alert.alert("Recuperar", "E-mail inválido.");
        }
      });
  }

  const handleGoBack = () => {
    navigation.goBack();
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
          Recuperar a sua senha
        </Heading>

        <Input
          placeholder="E-mail"
          mb={4}
          InputLeftElement={
            <Icon ml={4} as={<Envelope color={txtColorObj} />} />
          }
          onChangeText={setEmail}
        />

        <Button
          isLoading={isLoading}
          title="Recuperar"
          w="full"
          onPress={handleSignIn}
        />

        <Text onPress={handleGoBack} mt={4}>
          Voltar
        </Text>
      </VStack>
    </>
  );
}
