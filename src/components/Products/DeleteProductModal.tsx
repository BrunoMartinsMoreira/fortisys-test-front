import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { IProductApiReponse } from "../../types/Products";

interface ModalProps {
  isOpen: boolean;
  handleClose: () => void;
  handleSubmit: () => void;
  product?: IProductApiReponse;
}
export const DeleteProductModal = ({
  isOpen,
  handleClose,
  handleSubmit,
  product,
}: ModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <ModalOverlay backdropFilter="blur(3px)" />
      <ModalContent backgroundColor="gray.900" top="48">
        <ModalBody>
          <Flex direction="column" align="center">
            <Text fontSize="2xl" mb="5">
              Deseja realmente excluir o produto {product?.name} ?
            </Text>
          </Flex>
          <Flex align="center" justify="flex-end" gap="2">
            <Button colorScheme="red" onClick={handleClose}>
              CANCELAR
            </Button>
            <Button colorScheme="green" onClick={handleSubmit}>
              EXCLUIR
            </Button>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
