import { forwardRef, ForwardRefRenderFunction } from 'react';
import { FieldError } from 'react-hook-form';
import {
  Input as ChakraInput,
  InputProps as ChakraInputProps,
  FormLabel,
  FormControl,
  FormErrorMessage,
} from '@chakra-ui/react';

interface InputProps extends ChakraInputProps {
  inputName?: string;
  label?: string;
  type?: string;
  placeHolder?: string;
  error?: FieldError;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { label, inputName, error = null, ...rest },
  ref,
) => {
  return (
    <FormControl isInvalid={!!error}>
      {!label || <FormLabel htmlFor={inputName}>{label}</FormLabel>}
      <ChakraInput
        name={inputName}
        id={inputName}
        focusBorderColor='pink.700'
        size='lg'
        _hover={{
          bgColor: 'gray.900',
        }}
        ref={ref}
        {...rest}
      />

      {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  );
};

export const Input = forwardRef(InputBase);
