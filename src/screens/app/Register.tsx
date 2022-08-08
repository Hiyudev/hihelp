import {
  Box,
  FormControl,
  Icon,
  ScrollView,
  useColorModeValue,
  useTheme,
  VStack,
} from "native-base";
import { useState } from "react";
import { Alert } from "react-native";
import firestore from "@react-native-firebase/firestore";
import { useNavigation } from "@react-navigation/native";

import { Button } from "../../components/Button";
import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import { DesktopTower, TextAlignLeft } from "phosphor-react-native";

export function Register() {
  const { colors } = useTheme();
  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState(false);
  const [patrimony, setPatrimony] = useState("");
  const [description, setDescription] = useState("");

  const bgColor = useColorModeValue("gray.100", "gray.900");
  const secondaryBgColor = useColorModeValue("gray.200", "gray.800");

  const txtColor = useColorModeValue("gray.900", "gray.100");
  const secondaryTxtColor = useColorModeValue("gray.800", "gray.200");

  const iconColor = useColorModeValue(colors.indigo[700], colors.indigo[300]);

  function handleNewOrderRegister() {
    if (!patrimony || !description) {
      return Alert.alert("Registrar", "Preencha todos os campos.");
    }

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
        Alert.alert("Solicitação", "Solicitação registrada com sucesso.");
        navigation.goBack();
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
        return Alert.alert("Solicitação", "Erro ao registrar a solicitação.");
      });
  }

  return (
    <VStack flex={1} bg={bgColor}>
      <Header title="Solicitação" />

      <VStack flex={1} justifyContent={"space-between"} mt={4} p={6}>
        <ScrollView flex={1} showsVerticalScrollIndicator={false}>
          <VStack>
            <FormControl>
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
              />
              <FormControl.ErrorMessage>
                O número do patrimônio é obrigatório.
              </FormControl.ErrorMessage>
            </FormControl>
          </VStack>

          <VStack flex={1}>
            <FormControl mt={5}>
              <FormControl.Label>Descrição do problema</FormControl.Label>
              <Input
                onChangeText={setDescription}
                placeholder="Descrição do problema"
                flex={1}
                multiline
                h="96"
                textAlignVertical="top"
              />
              <FormControl.ErrorMessage>
                Descrição do problema é obrigatório.
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
