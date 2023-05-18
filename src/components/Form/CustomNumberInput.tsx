import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  InputProps as ChakraInputProps,
} from "@chakra-ui/react";
import { forwardRef, ForwardRefRenderFunction } from "react";
import { FieldError } from "react-hook-form";

interface CustomNumberInputProps extends ChakraInputProps {
  inputName?: string;
  label?: string;
  placeHolder?: string;
  error?: FieldError;
  prefix: string;
  placeholder: string;
}

const InputBase: ForwardRefRenderFunction<
  HTMLInputElement,
  CustomNumberInputProps
> = ({ placeholder, label, inputName, error = null, prefix, ...rest }, ref) => {
  return (
    <FormControl isInvalid={!!error}>
      {!label || <FormLabel htmlFor={inputName}>{label}</FormLabel>}
      <InputGroup>
        <InputLeftAddon bg="gray.800" children={prefix} />
        <Input
          placeholder={placeholder}
          type="number"
          step="0.01"
          name={inputName}
          id={inputName}
          focusBorderColor="pink.700"
          _hover={{
            bgColor: "gray.900",
          }}
          ref={ref}
          {...rest}
        />
      </InputGroup>
      {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  );
};

export const CustomNumberInput = forwardRef(InputBase);
