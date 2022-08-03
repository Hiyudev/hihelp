import { VStack } from "native-base";
import { useState } from "react";
import { Alert } from "react-native";
import firestore from "@react-native-firebase/firestore";
import { useNavigation } from "@react-navigation/native";

import { Button } from "../../components/Button";
import { Header } from "../../components/Header";
import { Input } from "../../components/Input";

export function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const [patrimony, setPatrimony] = useState("");
  const [description, setDescription] = useState("");
  const navigation = useNavigation();

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
    <VStack flex={1} p={6} bg="gray.600">
      <Header title="Solicitação" />

      <Input
        onChangeText={setPatrimony}
        mt={4}
        placeholder="Número do patrimonio"
      />

      <Input
        onChangeText={setDescription}
        placeholder="Descrição do problema"
        mt={5}
        flex={1}
        multiline
        textAlignVertical="top"
      />

      <Button
        isLoading={isLoading}
        onPress={handleNewOrderRegister}
        mt={5}
        title="Cadastrar"
      />
    </VStack>
  );
}
