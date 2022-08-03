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
      bg="indigo.700"
      h={54}
      fontSize="sm"
      rounded="sm"
      _pressed={{ backgroundColor: "indigo.500" }}
      {...rest}
    >
      <Heading color="white" fontSize="sm">
        {title}
      </Heading>
    </NativeBaseButton>
  );
}
