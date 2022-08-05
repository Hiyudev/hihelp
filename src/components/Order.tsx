import {
  HStack,
  Text,
  Box,
  useTheme,
  VStack,
  Circle,
  Pressable,
  IPressableProps,
  useColorModeValue,
} from "native-base";
import {
  CircleWavyCheck,
  ClockAfternoon,
  Hourglass,
} from "phosphor-react-native";

export type OrderProps = {
  id: string;
  status: "open" | "closed";
  patrimony: string;
  when: string;
};

type OrderComponentProps = IPressableProps & {
  data: OrderProps;
};

export function Order({ data, ...rest }: OrderComponentProps) {
  const { colors } = useTheme();
  const statusColor =
    data.status === "open"
      ? useColorModeValue(colors.orange[700], colors.orange[500])
      : useColorModeValue(colors.green[700], colors.green[500]);
  const bgColor = useColorModeValue("gray.200", "gray.800");
  const secondaryBgColor = useColorModeValue("gray.300", "gray.700");

  const txtColor = useColorModeValue("gray.900", "gray.100");
  const secondaryTxtColor = useColorModeValue("gray.800", "gray.200");
  const secondaryTxtColorObj = useColorModeValue(
    colors.gray[800],
    colors.gray[200]
  );

  return (
    <Pressable {...rest}>
      <HStack
        bg={bgColor}
        mb={4}
        alignItems={"center"}
        justifyContent={"space-between"}
        rounded="sm"
        overflow={"hidden"}
      >
        <Box h="full" w={2} bg={statusColor} />

        <VStack flex={1} my={5} ml={5}>
          <Text color={txtColor} fontSize="md">
            Patrimônio: {data.patrimony}
          </Text>

          <HStack alignItems="center">
            <ClockAfternoon size={15} color={secondaryTxtColorObj} />
            <Text color={secondaryTxtColor} fontSize="xs" ml={1}>
              {data.when}
            </Text>
          </HStack>
        </VStack>

        <Circle bg={secondaryBgColor} h={12} w={12} mr={5}>
          {data.status === "closed" ? (
            <CircleWavyCheck size={24} color={statusColor} />
          ) : (
            <Hourglass size={24} color={statusColor} />
          )}
        </Circle>
      </HStack>
    </Pressable>
  );
}
