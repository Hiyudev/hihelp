import firestore from "@react-native-firebase/firestore";
import { useRoute } from "@react-navigation/native";
import { HStack, ScrollView, Text, useTheme, VStack } from "native-base";
import {
  CircleWavyCheck,
  DesktopTower,
  Hourglass,
  Clipboard,
} from "phosphor-react-native";
import { useEffect, useState } from "react";
import { Button } from "../components/Button";
import { CardDetails } from "../components/CardDetails";

import { Header } from "../components/Header";
import { Input } from "../components/Input";
import { Loading } from "../components/Loading";
import { OrderProps } from "../components/Order";
import { OrderFirestoreDTO } from "../DTOs/OrderFirestoreDTO";
import { formatFirestoreDate } from "../utils/firestoreDateFormat";

type RouteParams = {
  orderId: string;
};

type OrderDetails = OrderProps & {
  description: string;
  solution: string;
  closed: string;
};

export function Details() {
  const [isLoading, setIsLoading] = useState(true);
  const [solution, setSolution] = useState("");
  const [order, setOrder] = useState<OrderDetails>({} as OrderDetails);
  const route = useRoute();
  const { colors } = useTheme();

  const { orderId } = route.params as RouteParams;

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
    <VStack flex={1} bg="gray.700">
      <Header title="Solicitação" />

      <HStack justifyContent="center" p={4} bg="gray.500">
        {order.status == "closed" ? (
          <CircleWavyCheck size={22} color={colors.green[300]} />
        ) : (
          <Hourglass size={22} color={colors.secondary[300]} />
        )}

        <Text
          color={
            order.status == "closed" ? colors.green[300] : colors.secondary[700]
          }
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
          footer={order.when}
        />
        <CardDetails
          title="Descrição do problema"
          description={order.description}
          icon={Clipboard}
        />
        <CardDetails
          title="Solução"
          icon={CircleWavyCheck}
          footer={order.closed && `Encerrado me ${order.closed}`}
        >
          <Input
            placeholder="Descrição da solução"
            onChangeText={setSolution}
            h={24}
            textAlignVertical="top"
            multiline
          />
        </CardDetails>
      </ScrollView>

      {order.status == "open" && <Button title="Encerrar solicitação" m={5} />}
    </VStack>
  );
}
