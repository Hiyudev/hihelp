import { useNavigation } from "@react-navigation/native";
import {
  HStack,
  useTheme,
  IconButton,
  Heading,
  StyledProps,
} from "native-base";
import { CaretLeft } from "phosphor-react-native";

type HeaderComponentProps = StyledProps & {
  title: string;
};

export function Header({ title, ...rest }: HeaderComponentProps) {
  const { colors } = useTheme();

  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <HStack
      w="full"
      justifyContent={"space-between"}
      alignItems={"center"}
      bg="gray.600"
      pt={12}
      pb={6}
      px={4}
      {...rest}
    >
      <IconButton
        onPress={handleGoBack}
        icon={<CaretLeft size={24} color={colors.gray[200]} />}
      />

      <Heading
        color="gray.100"
        textAlign="center"
        fontSize="lg"
        flex={1}
        ml={-6}
      >
        {title}
      </Heading>
    </HStack>
  );
}
