import {
  Input as NativeBaseInput,
  IInputProps,
  useColorModeValue,
  IconButton,
  Icon,
  useTheme,
} from "native-base";
import { Eye, EyeSlash } from "phosphor-react-native";
import { useState } from "react";

export function Input({ ...rest }: IInputProps) {
  const bgColor = useColorModeValue("gray.300", "gray.700");
  const txtColor = useColorModeValue("gray.700", "gray.300");

  return (
    <NativeBaseInput
      bg={bgColor}
      h={54}
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

export function ShowInput({ ...rest }: IInputProps) {
  const { colors } = useTheme();
  const txtColor = useColorModeValue(colors.gray[700], colors.gray[300]);

  const [show, setShow] = useState(false);

  const handleShowPassword = () => {
    setShow((old) => !old);
  };

  return (
    <Input
      secureTextEntry={!show}
      InputRightElement={
        <IconButton
          mr={4}
          onPress={handleShowPassword}
          icon={
            <Icon
              as={
                show ? <Eye color={txtColor} /> : <EyeSlash color={txtColor} />
              }
            />
          }
        />
      }
      {...rest}
    />
  );
}
