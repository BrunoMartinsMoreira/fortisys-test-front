import {
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Button,
  Icon,
  Box,
} from "@chakra-ui/react";
import { RiPencilFill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import { IProductApiReponse } from "../../types/Products";
import { StatusBadge } from "./StatusBadge";

type PropTypes = {
  products: IProductApiReponse[];
  handleEdit(product: IProductApiReponse): void;
  handleDelete(product: IProductApiReponse): void;
};

export const ProductsTable = ({
  products,
  handleEdit,
  handleDelete,
}: PropTypes) => {
  const numberToString = (item: number) => item.toFixed(2).replace(".", ",");

  return (
    <Box overflow="auto" maxWidth="90vw">
      <Table colorScheme="whiteAlpha">
        <Thead>
          <Tr>
            <Th color="gray.300" fontSize="md" px="1">
              PRODUTO
            </Th>

            <Th color="gray.300" fontSize="md" px="1">
              PREÇO
            </Th>

            <Th color="gray.300" fontSize="md" px="1">
              QUANTIDADE
            </Th>
            <Th color="gray.300" fontSize="md" px="1">
              STATUS ESTOQUE
            </Th>
            <Th width={["2", "5"]}></Th>
          </Tr>
        </Thead>
        <Tbody>
          {products?.map((product) => (
            <Tr key={product.id}>
              <Td px="1">{product.name} </Td>

              <Td px="1">R${numberToString(product.price)}</Td>
              <Td px="10"> {product.stockQuantity}</Td>
              <Td px="10">
                <StatusBadge quantity={product.stockQuantity} />
              </Td>
              <Td px="1" display="flex" gap="2">
                <Button
                  as="a"
                  size="sm"
                  fontSize="sm"
                  colorScheme="purple"
                  cursor="pointer"
                  textTransform="uppercase"
                  onClick={() => handleEdit(product)}
                  leftIcon={<Icon as={RiPencilFill} />}
                >
                  editar
                </Button>

                <Button
                  as="a"
                  size="sm"
                  fontSize="sm"
                  colorScheme="red"
                  cursor="pointer"
                  textTransform="uppercase"
                  onClick={() => handleDelete(product)}
                  leftIcon={<Icon as={MdDelete} />}
                >
                  deletar
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};
