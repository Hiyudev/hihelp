import auth from "@react-native-firebase/auth";
import { useNavigation } from "@react-navigation/native";
import {
  VStack,
  Heading,
  Icon,
  useTheme,
  useColorModeValue,
  HStack,
  Text,
  FormControl,
  useToast,
} from "native-base";
import { Envelope, Key } from "phosphor-react-native";
import { useEffect, useState } from "react";
import { z } from "zod";

import Logo from "../../assets/Logo.svg";
import { Button } from "../../components/Button";
import { Input, ShowInput } from "../../components/Input";
import { ThemeSwitcher } from "../../components/ThemeSwitcher";
import { Toast } from "../../components/Toast";
import { SignInFormValidation } from "../../lib/zod/signInValidation";

export function SignIn() {
  const { colors } = useTheme();
  const toast = useToast();
  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [genericError, setGenerticError] = useState(false);

  const bgColor = useColorModeValue("gray.100", "gray.900");
  const txtColor = useColorModeValue("gray.900", "gray.100");
  const txtColorObj = useColorModeValue(colors.gray[700], colors.gray[300]);

  const emailHasError = emailError.length > 0;
  const passwordHasError = passwordError.length > 0;

  function handleSignIn() {
    try {
      SignInFormValidation.parse({
        email,
        password,
      });

      setIsLoading(true);

      auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          toast.show({
            render: () => (
              <Toast style="welcome" message="Bem-vindo de volta usuário!" />
            ),
          });
        })
        .catch((error) => {
          console.log(error);
          const errorCode = error.code;
          setIsLoading(false);
          setGenerticError(true);

          switch (errorCode) {
            case "auth/user-not-found":
            case "auth/wrong-password":
              return toast.show({
                render: () => (
                  <Toast style="danger" message="E-mail ou senha inválida" />
                ),
              });
            default:
              return toast.show({
                render: () => <Toast style="danger" message="Erro ao entrar" />,
              });
          }
        });
    } catch (err) {
      if (err instanceof z.ZodError) {
        const issues = err.issues;
        if (issues.length > 0) {
          issues.map((issue) => {
            const { path, message } = issue;

            toast.show({
              render: () => <Toast style="danger" message={message} />,
            });

            switch (path[0]) {
              case "email":
                setEmailError(message);
                break;
              case "password":
                setPasswordError(message);
                break;
            }
          });
          setGenerticError(true);
        }
      }
    }
  }

  const handleGoSignUp = () => {
    navigation.navigate("signup");
  };

  const handleGoRecover = () => {
    navigation.navigate("recover");
  };

  useEffect(() => {
    if (!genericError) return;

    setEmailError("");
    setPasswordError("");
    setGenerticError(false);
  }, [password, email]);

  return (
    <>
      <VStack flex={1} alignItems="center" bg={bgColor} px={8} pt={24}>
        <ThemeSwitcher position={"absolute"} right={8} top={12} />

        <HStack>
          <Logo color={useColorModeValue("black", "white")} />
        </HStack>

        <Heading color={txtColor} fontSize="xl" mt={16} mb={6}>
          Acesse sua conta
        </Heading>

        <FormControl mb={emailHasError ? 0 : 6} isInvalid={emailHasError}>
          <FormControl.Label>E-mail</FormControl.Label>
          <Input
            error={emailHasError}
            placeholder="Coloque seu e-mail"
            InputLeftElement={
              <Icon ml={4} as={<Envelope color={txtColorObj} />} />
            }
            onChangeText={setEmail}
          />
          <FormControl.ErrorMessage>{emailError}</FormControl.ErrorMessage>
        </FormControl>

        <FormControl mb={passwordHasError ? 2 : 8} isInvalid={passwordHasError}>
          <FormControl.Label>Senha</FormControl.Label>
          <ShowInput
            error={passwordHasError}
            placeholder="Coloque sua senha"
            InputLeftElement={<Icon ml={4} as={<Key color={txtColorObj} />} />}
            onChangeText={setPassword}
          />
          <FormControl.ErrorMessage>{passwordError}</FormControl.ErrorMessage>
        </FormControl>

        <Button
          error={genericError}
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
