import { ReactNode } from "react";
import { IconProps } from "phosphor-react-native";
import {
  VStack,
  HStack,
  Text,
  Box,
  useTheme,
  useColorModeValue,
} from "native-base";

type CardDetailsProps = {
  title: string;
  description?: string;
  footer?: string;
  icon: React.ElementType<IconProps>;
  children?: ReactNode;
};

export function CardDetails({
  title,
  description,
  footer = null,
  icon: Icon,
  children,
}: CardDetailsProps) {
  const { colors } = useTheme();

  const bgColor = useColorModeValue("gray.200", "gray.800");

  const txtColor = useColorModeValue("gray.900", "gray.100");
  const secondaryTxtColor = useColorModeValue("gray.800", "gray.200");

  const iconColor = useColorModeValue(colors.indigo[700], colors.indigo[400]);

  return (
    <VStack bg={bgColor} p={5} mt={5} rounded="sm">
      <HStack alignItems="center" mb={4}>
        <Icon color={iconColor} />
        <Text
          ml={2}
          color={secondaryTxtColor}
          fontSize="sm"
          textTransform="uppercase"
        >
          {title}
        </Text>
      </HStack>

      {!!description && (
        <Text color={txtColor} fontSize="md">
          {description}
        </Text>
      )}

      {children}

      {!!footer && (
        <Box borderTopWidth={1} borderTopColor="gray.400" mt={3}>
          <Text mt={3} color={secondaryTxtColor} fontSize="sm">
            {footer}
          </Text>
        </Box>
      )}
    </VStack>
  );
}
