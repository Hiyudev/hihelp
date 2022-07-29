import {
  Input as NativeBaseInput,
  IInputProps,
  useColorModeValue,
} from "native-base";

export function Input({ ...rest }: IInputProps) {
  const bgColor = useColorModeValue("gray.300", "gray.700");
  const txtColor = useColorModeValue("gray.700", "gray.300");

  return (
    <NativeBaseInput
      bg={bgColor}
      h={14}
      size={"md"}
      borderWidth={2}
      borderColor={bgColor}
      fontSize="md"
      fontFamily={"body"}
      placeholderTextColor={txtColor}
      color={txtColor}
      _focus={{
        borderWidth: 2,
        borderColor: "green.500",
        bg: bgColor,
      }}
      {...rest}
    />
  );
}
