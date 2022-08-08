import {
  Box,
  FormControl,
  Icon,
  ScrollView,
  useColorModeValue,
  useTheme,
  useToast,
  VStack,
} from "native-base";
import { useEffect, useState } from "react";
import firestore from "@react-native-firebase/firestore";
import { useNavigation } from "@react-navigation/native";

import { Button } from "../../components/Button";
import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import { DesktopTower } from "phosphor-react-native";
import { z } from "zod";
import { Toast } from "../../components/Toast";
import { RegisterFormValidation } from "../../lib/zod/registerValidation";

export function Register() {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const toast = useToast();

  const [isLoading, setIsLoading] = useState(false);
  const [patrimony, setPatrimony] = useState("");
  const [description, setDescription] = useState("");

  const [patrimonyError, setPatrimonyError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [genericError, setGenericError] = useState(false);

  const hasPatrimonyError = patrimonyError.length > 0;
  const hasDescriptionError = descriptionError.length > 0;

  const bgColor = useColorModeValue("gray.100", "gray.900");
  const iconColor = useColorModeValue(colors.indigo[700], colors.indigo[300]);

  function handleNewOrderRegister() {
    try {
      RegisterFormValidation.parse({
        patrimony,
        description,
      });

      setIsLoading(true);

      firestore()
        .collection("orders")
        .add({
          patrimony,
          description,
          status: "open",
          createdAt: firestore.FieldValue.serverTimestamp(),
        })
        .then(() => {
          toast.show({
            render: () => (
              <Toast
                style="success"
                message={"Solicitação registrada com sucesso"}
              />
            ),
          });
          navigation.goBack();
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
          return toast.show({
            render: () => (
              <Toast
                style="danger"
                message={"Erro ao registrar a solicitação"}
              />
            ),
          });
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
              case "patrimony":
                setPatrimonyError(message);
                break;
              case "description":
                setDescriptionError(message);
                break;
            }
          });

          setGenericError(true);
        }
      }
    }
  }

  useEffect(() => {
    if (!genericError) return;

    setPatrimonyError("");
    setDescriptionError("");
    setGenericError(false);
  }, [patrimony, description]);

  return (
    <VStack flex={1} bg={bgColor}>
      <Header title="Solicitação" />

      <VStack flex={1} justifyContent={"space-between"} mt={4} p={6}>
        <ScrollView flex={1} showsVerticalScrollIndicator={false}>
          <VStack>
            <FormControl isInvalid={hasPatrimonyError}>
              <FormControl.Label>Número do patrimônio</FormControl.Label>
              <Input
                keyboardType="numeric"
                InputLeftElement={
                  <Icon
                    ml={4}
                    as={<DesktopTower size={24} color={iconColor} />}
                  />
                }
                onChangeText={setPatrimony}
                placeholder="Número do patrimonio"
                error={hasPatrimonyError}
              />
              <FormControl.ErrorMessage>
                {patrimonyError}
              </FormControl.ErrorMessage>
            </FormControl>
          </VStack>

          <VStack flex={1}>
            <FormControl mt={5} isInvalid={hasDescriptionError}>
              <FormControl.Label>Descrição do problema</FormControl.Label>
              <Input
                onChangeText={setDescription}
                placeholder="Descrição do problema"
                flex={1}
                multiline
                h="96"
                textAlignVertical="top"
                error={hasDescriptionError}
              />
              <FormControl.ErrorMessage>
                {descriptionError}
              </FormControl.ErrorMessage>
            </FormControl>
          </VStack>
        </ScrollView>

        <Button
          isLoading={isLoading}
          onPress={handleNewOrderRegister}
          title="Cadastrar"
          mt={5}
        />
      </VStack>
    </VStack>
  );
}
