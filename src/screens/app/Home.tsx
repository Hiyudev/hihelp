import { useNavigation } from "@react-navigation/native";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import {
  HStack,
  IconButton,
  VStack,
  useTheme,
  Text,
  Heading,
  FlatList,
  Center,
  useColorModeValue,
} from "native-base";
import { ChatTeardropText, SignOut } from "phosphor-react-native";
import { useEffect, useState } from "react";

import Logotipo from "../../assets/Logotipo.svg";
import { Button } from "../../components/Button";
import { Filter } from "../../components/Filter";
import { Order, OrderProps } from "../../components/Order";
import { Alert } from "react-native";
import { formatFirestoreDate } from "../../utils/firestoreDateFormat";
import { Loading } from "../../components/Loading";
import { ThemeSwitcher } from "../../components/ThemeSwitcher";

export function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState<OrderProps[]>();
  const [statusSelected, setStatusSelected] = useState<"open" | "closed">(
    "open"
  );
  const { colors } = useTheme();
  const navigation = useNavigation();

  const bgColor = useColorModeValue("gray.100", "gray.900");
  const secondaryBgColor = useColorModeValue("gray.200", "gray.800");

  const txtColor = useColorModeValue("gray.900", "gray.100");
  const secondaryTxtColor = useColorModeValue("gray.800", "gray.200");
  const tertiaryTxtColor = useColorModeValue("gray.700", "gray.300");
  const tertiaryTxtColorObj = useColorModeValue(
    colors.gray[700],
    colors.gray[300]
  );

  const logoColor = useColorModeValue("black", "white");
  const logoColorObj = useColorModeValue(colors.black, colors.white);

  const handleNewOrder = () => {
    navigation.navigate("new");
  };

  const handleOpenDetails = (orderId: string) => {
    navigation.navigate("details", { orderId });
  };

  const handleLogout = () => {
    auth()
      .signOut()
      .catch((error) => {
        console.log(error);
        return Alert.alert("Sair", "Não foi possivel sair da conta.");
      });
  };

  useEffect(() => {
    setIsLoading(true);

    const subscriber = firestore()
      .collection("orders")
      .where("status", "==", statusSelected)
      .onSnapshot((snapshot) => {
        const data = snapshot.docs.map((doc) => {
          const { patrimony, description, status, createdAt } = doc.data();

          return {
            id: doc.id,
            patrimony,
            description,
            status,
            when: formatFirestoreDate(createdAt),
          };
        });

        setOrders(data);
        setIsLoading(false);
      });

    return subscriber;
  }, [statusSelected]);

  return (
    <VStack flex={1} pb={6} bg={bgColor}>
      <HStack
        w="full"
        justifyContent={"space-between"}
        alignItems={"center"}
        bg={secondaryBgColor}
        pt={12}
        pb={5}
        px={6}
      >
        <Logotipo height={32} width={74} color={logoColor} />

        <HStack>
          <ThemeSwitcher />

          <IconButton
            onPress={handleLogout}
            icon={<SignOut size={26} color={logoColorObj} />}
          />
        </HStack>
      </HStack>

      <VStack flex={1} px={6}>
        <HStack
          w="full"
          mt={8}
          mb={4}
          justifyContent="space-between"
          alignItems={"center"}
        >
          <Heading color={txtColor}>Solicitações</Heading>
          <Text color={secondaryTxtColor}>{orders?.length ?? 0}</Text>
        </HStack>

        <HStack space={3} mb={8}>
          <Filter
            type="open"
            title="Em andamento"
            onPress={() => setStatusSelected("open")}
            isActive={statusSelected === "open"}
          />

          <Filter
            type="closed"
            title="Finalizados"
            onPress={() => setStatusSelected("closed")}
            isActive={statusSelected === "closed"}
          />
        </HStack>

        {isLoading ? (
          <Loading />
        ) : (
          <FlatList
            data={orders ?? []}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Order onPress={() => handleOpenDetails(item.id)} data={item} />
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 100 }}
            ListEmptyComponent={() => (
              <Center>
                <ChatTeardropText color={tertiaryTxtColorObj} size={40} />
                <Text
                  color={tertiaryTxtColor}
                  fontSize="xl"
                  mt={6}
                  textAlign="center"
                >
                  Você ainda não possui{"\n"}
                  solicitações{" "}
                  {statusSelected === "open" ? "em andamento" : "finalizadas"}
                </Text>
              </Center>
            )}
          />
        )}

        <Button onPress={handleNewOrder} title="Nova solicitação" />
      </VStack>
    </VStack>
  );
}
