import {
  Button as NativeBaseButton,
  IButtonProps as NativeBaseIButtonProps,
  Heading,
  Icon,
  Box,
} from "native-base";
import { WarningCircle } from "phosphor-react-native";

type IButtonProps = NativeBaseIButtonProps & {
  title: string;
  error?: boolean;
};

export function Button({ title, error, ...rest }: IButtonProps) {
  const bgColor = error ? "red.700" : "indigo.700";
  const pressedBgColor = error ? "red.500" : "indigo.500";

  return (
    <NativeBaseButton
      bg={bgColor}
      h={54}
      fontSize="sm"
      rounded="sm"
      _pressed={{ backgroundColor: pressedBgColor }}
      {...rest}
    >
      {error ? (
        <Box>
          <Icon as={<WarningCircle color="white" size={24} />} />
        </Box>
      ) : (
        <Heading color="white" fontSize="sm">
          {title}
        </Heading>
      )}
    </NativeBaseButton>
  );
}
