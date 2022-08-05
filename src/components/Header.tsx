import { useNavigation } from "@react-navigation/native";
import {
  HStack,
  useTheme,
  IconButton,
  Heading,
  StyledProps,
  useColorModeValue,
} from "native-base";
import { CaretLeft } from "phosphor-react-native";
import { ThemeSwitcher } from "./ThemeSwitcher";

type HeaderComponentProps = StyledProps & {
  title: string;
};

export function Header({ title, ...rest }: HeaderComponentProps) {
  const { colors } = useTheme();
  const txtColor = useColorModeValue("gray.900", "gray.100");
  const txtColorObj = useColorModeValue(colors.gray[900], colors.gray[100]);
  const bgColor = useColorModeValue("gray.300", "gray.700");

  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <HStack
      w="full"
      justifyContent={"space-between"}
      alignItems={"center"}
      bg={bgColor}
      pt={12}
      pb={6}
      px={5}
      {...rest}
    >
      <IconButton
        onPress={handleGoBack}
        icon={<CaretLeft size={24} color={txtColorObj} />}
      />

      <Heading
        color={txtColor}
        textAlign="center"
        fontSize="lg"
        flex={1}
        ml={-6}
      >
        {title}
      </Heading>

      <ThemeSwitcher />
    </HStack>
  );
}
