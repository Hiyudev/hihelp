import {
  Box,
  HStack,
  Icon,
  Text,
  useColorModeValue,
  useTheme,
} from "native-base";
import { CheckCircle, HandWaving, WarningCircle } from "phosphor-react-native";

type ToastStyles = "success" | "danger" | "welcome";

type ToastProps = {
  style: ToastStyles;
  message: string;
};
export function Toast({ style, message }: ToastProps) {
  let bgColor: string;
  let txtColor: string;
  const { colors } = useTheme();

  let icon: JSX.Element;
  switch (style) {
    case "success":
      bgColor = "green.500";
      icon = <CheckCircle size={24} color={colors.white} />;
      break;
    case "danger":
      bgColor = "red.500";
      icon = <WarningCircle size={24} color={colors.white} />;
      break;
    case "welcome":
      bgColor = "blue.500";
      icon = <HandWaving size={24} color={colors.white} />;
      break;
  }

  return (
    <Box
      mx={8}
      py={2}
      px={4}
      rounded="full"
      justifyContent={"center"}
      bg={bgColor}
    >
      <HStack alignItems={"center"}>
        <Icon as={icon} />
        <Text color={"white"} ml={2} mr={4}>
          {message}
        </Text>
      </HStack>
    </Box>
  );
}
