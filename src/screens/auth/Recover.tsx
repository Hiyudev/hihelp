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
import { Envelope } from "phosphor-react-native";
import { useEffect, useState } from "react";
import auth from "@react-native-firebase/auth";

import Logo from "../../assets/Logo.svg";

import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { useNavigation } from "@react-navigation/native";
import { RecoverFormValidation } from "../../lib/zod/recoverValidation";
import { z } from "zod";
import { Toast } from "../../components/Toast";
import { ThemeSwitcher } from "../../components/ThemeSwitcher";

export function Recover() {
  const { colors } = useTheme();
  const toast = useToast();
  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [genericError, setGenerticError] = useState(false);

  const bgColor = useColorModeValue("gray.100", "gray.900");
  const txtColor = useColorModeValue("gray.900", "gray.100");
  const txtColorObj = useColorModeValue(colors.gray[700], colors.gray[300]);

  function handleSignIn() {
    try {
      RecoverFormValidation.parse({
        email,
      });

      setIsLoading(true);

      auth()
        .sendPasswordResetEmail(email)
        .then(() => {
          setIsLoading(false);
          toast.show({
            render: () => (
              <Toast
                style="success"
                message={
                  "E-mail para redefinir a senha foi enviada com sucesso"
                }
              />
            ),
          });
          navigation.navigate("signin");
        })
        .catch((error) => {
          console.log(error);
          const errorCode = error.code;
          setIsLoading(false);

          switch (errorCode) {
            case "auth/invalid-email":
            case "auth/user-not-found":
            default:
              return toast.show({
                render: () => (
                  <Toast style="danger" message={"E-mail inválido"} />
                ),
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
            }
          });

          setGenerticError(true);
        }
      }
    }
  }

  const handleGoBack = () => {
    navigation.goBack();
  };

  const emailHasError = emailError.length > 0;

  useEffect(() => {
    if (!genericError) return;

    setEmailError("");
    setGenerticError(false);
  }, [email]);

  return (
    <>
      <VStack flex={1} alignItems="center" bg={bgColor} px={8} pt={24}>
        <ThemeSwitcher position={"absolute"} right={8} top={12} />
        <HStack>
          <Logo color={useColorModeValue("black", "white")} />
        </HStack>

        <Heading color={txtColor} fontSize="xl" mt={16} mb={6}>
          Recuperar a sua senha
        </Heading>

        <FormControl mb={emailHasError ? 2 : 8} isInvalid={emailHasError}>
          <FormControl.Label>Email</FormControl.Label>

          <Input
            placeholder="E-mail"
            InputLeftElement={
              <Icon ml={4} as={<Envelope color={txtColorObj} />} />
            }
            onChangeText={setEmail}
          />

          <FormControl.ErrorMessage>{emailError}</FormControl.ErrorMessage>
        </FormControl>

        <Button
          error={emailHasError}
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
