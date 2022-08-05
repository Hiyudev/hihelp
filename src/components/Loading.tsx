import { Center, Spinner, useColorModeValue } from "native-base";

export function Loading() {
  const bgColor = useColorModeValue("gray.100", "gray.900");

  return (
    <Center flex={1} bg={bgColor}>
      <Spinner color={"secondary.700"} />
    </Center>
  );
}
