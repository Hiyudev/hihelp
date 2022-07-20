import {
  Button as NativeBaseButton,
  IButtonProps as NativeBaseIButtonProps,
  Heading,
} from "native-base";

type IButtonProps = NativeBaseIButtonProps & {
  title: string;
};

export function Button({ title, ...rest }: IButtonProps) {
  return (
    <NativeBaseButton
      bg="green.700"
      h={14}
      fontSize="sm"
      rounded="sm"
      _pressed={{ backgroundColor: "green.500" }}
      {...rest}
    >
      <Heading color="white" fontSize="sm">
        {title}
      </Heading>
    </NativeBaseButton>
  );
}
