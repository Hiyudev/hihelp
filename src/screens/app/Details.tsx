import firestore from "@react-native-firebase/firestore";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  HStack,
  ScrollView,
  Text,
  useColorModeValue,
  useTheme,
  VStack,
} from "native-base";
import {
  CircleWavyCheck,
  DesktopTower,
  Hourglass,
  ClipboardText,
} from "phosphor-react-native";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { Button } from "../../components/Button";
import { CardDetails } from "../../components/CardDetails";

import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import { Loading } from "../../components/Loading";
import { OrderProps } from "../../components/Order";
import { OrderFirestoreDTO } from "../../DTOs/OrderFirestoreDTO";
import { formatFirestoreDate } from "../../utils/firestoreDateFormat";

type RouteParams = {
  orderId: string;
};

type OrderDetails = OrderProps & {
  description: string;
  solution: string;
  closed: string;
};

export function Details() {
  const navigation = useNavigation();
  const route = useRoute();
  const { colors } = useTheme();
  const { orderId } = route.params as RouteParams;

  const [isLoading, setIsLoading] = useState(true);
  const [solution, setSolution] = useState("");
  const [order, setOrder] = useState<OrderDetails>({} as OrderDetails);

  const bgColor = useColorModeValue("gray.100", "gray.900");
  const secondaryBgColor = useColorModeValue("gray.200", "gray.800");

  const orangeColor = useColorModeValue(colors.orange[700], colors.orange[500]);
  const greenColor = useColorModeValue(colors.green[700], colors.green[500]);

  const handleCloseOrder = () => {
    if (!solution) {
      return Alert.alert(
        "Solicitação",
        "Por favor, informe a solução do problema para encerrar"
      );
    }

    firestore()
      .collection<OrderFirestoreDTO>("orders")
      .doc(orderId)
      .update({
        status: "closed",
        solution,
        closedAt: firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        Alert.alert("Solicitação", "Solução encerrada com sucesso");
        navigation.goBack();
      })
      .catch((error) => {
        console.log(error);
        Alert.alert("Solicitação", "Não foi possível encerrar a solicitação");
      });
  };

  useEffect(() => {
    firestore()
      .collection<OrderFirestoreDTO>("orders")
      .doc(orderId)
      .get()
      .then((doc) => {
        const {
          createdAt,
          description,
          solution,
          patrimony,
          status,
          closedAt,
        } = doc.data();

        const closed = closedAt ? formatFirestoreDate(closedAt) : null;

        setOrder({
          id: doc.id,
          patrimony,
          status,
          description,
          solution,
          closed,
          when: formatFirestoreDate(createdAt),
        });
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <VStack flex={1} bg={bgColor}>
      <Header title="Solicitação" />

      <HStack justifyContent="center" p={4} bg={secondaryBgColor}>
        {order.status == "closed" ? (
          <CircleWavyCheck size={22} color={greenColor} />
        ) : (
          <Hourglass size={22} color={orangeColor} />
        )}

        <Text
          color={order.status == "closed" ? greenColor : orangeColor}
          ml={2}
          fontSize="sm"
          textTransform="uppercase"
        >
          {order.status == "closed" ? "Finalizado" : "Em andamento"}
        </Text>
      </HStack>

      <ScrollView mx={5} showsVerticalScrollIndicator={false}>
        <CardDetails
          title="Equipamento"
          description={`Patrimônio ${order.patrimony}`}
          icon={DesktopTower}
        />
        <CardDetails
          title="Descrição do problema"
          description={order.description}
          icon={ClipboardText}
          footer={`Registrado em ${order.when}`}
        />
        <CardDetails
          title="Solução"
          icon={CircleWavyCheck}
          description={order.solution}
          footer={order.closed && `Encerrado me ${order.closed}`}
        >
          {order.status == "open" && (
            <Input
              placeholder="Descrição da solução"
              onChangeText={setSolution}
              h={24}
              textAlignVertical="top"
              multiline
            />
          )}
        </CardDetails>
      </ScrollView>

      {order.status == "open" && (
        <Button onPress={handleCloseOrder} title="Encerrar solicitação" m={5} />
      )}
    </VStack>
  );
}
