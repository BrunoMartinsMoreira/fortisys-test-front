import {
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Spinner,
  Text,
} from '@chakra-ui/react';

interface ModalProps {
  isOpen: boolean;
}

export const Loading = ({ isOpen }: ModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={() => null}>
      <ModalOverlay backdropFilter='blur(3px)' />
      <ModalContent bg='transparent' top='48'>
        <ModalBody>
          <Flex direction='column' align='center'>
            <Text fontSize='2xl' mb='5'>
              Aguarde...
            </Text>
            <Spinner
              color='pink.800'
              size='xl'
              thickness='3px'
              speed='0.65s'
              emptyColor='gray.200'
            />
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
