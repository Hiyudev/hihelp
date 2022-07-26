import firestore from "@react-native-firebase/firestore";
import { useRoute } from "@react-navigation/native";
import { Text, VStack } from "native-base";
import { useEffect, useState } from "react";

import { Header } from "../components/Header";
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
      <Text color="white">{orderId}</Text>
    </VStack>
  );
}
