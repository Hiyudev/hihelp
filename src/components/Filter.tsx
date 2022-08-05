import {
  IButtonProps,
  Button,
  useTheme,
  Text,
  useColorModeValue,
} from "native-base";

type FilterProps = IButtonProps & {
  title: string;
  isActive?: boolean;
  type: "open" | "closed";
};

export function Filter({
  title,
  isActive = false,
  type,
  ...rest
}: FilterProps) {
  const { colors } = useTheme();
  const colorType = type === "open" ? colors.orange[500] : colors.green[500];
  const bgColor = useColorModeValue("gray.300", "gray.800");
  const txtColor = useColorModeValue("gray.700", "gray.300");

  return (
    <Button
      variant="outline"
      borderWidth={isActive ? 2 : 0}
      borderColor={colorType}
      bgColor={bgColor}
      flex={1}
      size="sm"
      {...rest}
    >
      <Text
        color={isActive ? colorType : txtColor}
        fontSize="xs"
        textTransform="uppercase"
      >
        {title}
      </Text>
    </Button>
  );
}
