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
  FormControl,
} from "native-base";
import React, { useEffect, useState } from "react";
import { Alert } from "react-native";
import auth from "@react-native-firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { Moon, Sun, Envelope, Key } from "phosphor-react-native";

import Logo from "../../assets/Logo.svg";

import { Button } from "../../components/Button";
import { Input, ShowInput } from "../../components/Input";
import { SignUpFormValidation } from "../../lib/zod/signUpValidation";
import { z } from "zod";

export function SignUp() {
  const { colors } = useTheme();
  const { toggleColorMode, colorMode } = useColorMode();

  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [genericError, setGenerticError] = useState(false);

  const navigation = useNavigation();

  const bgColor = useColorModeValue("gray.100", "gray.900");
  const sbgColor = useColorModeValue("gray.200", "gray.800");
  const txtColor = useColorModeValue("gray.900", "gray.100");
  const txtColorObj = useColorModeValue(colors.gray[700], colors.gray[300]);

  function handleSignUp() {
    try {
      SignUpFormValidation.parse({
        email,
        password,
        confirmPassword,
      });

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
    } catch (err) {
      if (err instanceof z.ZodError) {
        const issues = err.issues;
        if (issues.length > 0) {
          issues.map((issue) => {
            const { path, message } = issue;
            if (path[0] === "email") {
              setEmailError(message);
            } else if (path[0] === "password") {
              setPasswordError(message);
            } else if (path[0] === "confirmPassword") {
              setConfirmPasswordError(message);
            }
          });

          setGenerticError(true);
        }
      }
    }
  }

  const handleGoSignIn = () => {
    navigation.navigate("signin");
  };

  const handleChangeTheme = () => {
    toggleColorMode();
  };

  const hasEmailError = emailError.length > 0;
  const hasPasswordError = passwordError.length > 0;
  const hasConfirmPasswordError = confirmPasswordError.length > 0;

  useEffect(() => {
    if (!genericError) return;

    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");
    setGenerticError(false);
  }, [password, email, confirmPassword]);

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

        <Heading color={txtColor} fontSize="xl" mt={16} mb={6}>
          Cadastre uma nova conta
        </Heading>

        <FormControl mb={hasEmailError ? 0 : 6} isInvalid={hasEmailError}>
          <FormControl.Label>E-mail</FormControl.Label>

          <Input
            error={hasEmailError}
            placeholder="Coloque seu e-mail"
            InputLeftElement={
              <Icon ml={4} as={<Envelope color={txtColorObj} />} />
            }
            onChangeText={setEmail}
          />
          <FormControl.ErrorMessage>{emailError}</FormControl.ErrorMessage>
        </FormControl>

        <FormControl mb={hasPasswordError ? 0 : 6} isInvalid={hasPasswordError}>
          <FormControl.Label>Senha</FormControl.Label>

          <ShowInput
            error={hasPasswordError}
            placeholder="Coloque sua senha"
            InputLeftElement={<Icon ml={4} as={<Key color={txtColorObj} />} />}
            onChangeText={setPassword}
          />
          <FormControl.ErrorMessage>{passwordError}</FormControl.ErrorMessage>
        </FormControl>

        <FormControl
          mb={hasConfirmPasswordError ? 2 : 8}
          isInvalid={hasConfirmPasswordError}
        >
          <FormControl.Label>Confirme a senha</FormControl.Label>

          <ShowInput
            error={hasConfirmPasswordError}
            placeholder="Repita a sua senha"
            InputLeftElement={<Icon ml={4} as={<Key color={txtColorObj} />} />}
            onChangeText={setConfirmPassword}
          />
          <FormControl.ErrorMessage>
            {confirmPasswordError}
          </FormControl.ErrorMessage>
        </FormControl>

        <Button
          error={genericError}
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
