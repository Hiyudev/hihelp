import {
  IconButton,
  IIconButtonProps,
  useColorMode,
  useColorModeValue,
  useTheme,
} from "native-base";
import { Moon, Sun } from "phosphor-react-native";
import React from "react";

export function ThemeSwitcher({ ...rest }: IIconButtonProps) {
  const { colors } = useTheme();
  const { toggleColorMode, colorMode } = useColorMode();
  const bgColor = useColorModeValue("gray.200", "gray.800");

  const handleChangeTheme = () => {
    toggleColorMode();
  };

  return (
    <IconButton
      bg={bgColor}
      rounded="full"
      onPress={handleChangeTheme}
      icon={
        colorMode == "dark" ? (
          <Moon size={24} color={colors.blue[300]} />
        ) : (
          <Sun size={24} color={colors.orange[700]} />
        )
      }
      {...rest}
    />
  );
}
