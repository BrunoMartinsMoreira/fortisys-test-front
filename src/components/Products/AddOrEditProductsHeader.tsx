import { Flex, Heading, Button, Icon } from "@chakra-ui/react";
import { RiMenuFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

type PropTypes = {
  title: string;
};

export const AddOrEditProductsHeader = ({ title }: PropTypes) => {
  const navigate = useNavigate();

  return (
    <Flex mb="8" py={["2", "5"]} justify="space-between" align="center">
      <Heading size={["sm", "md"]} fontWeight="normal">
        {title}
      </Heading>
      <Button
        as="a"
        size="sm"
        fontSize="sm"
        colorScheme="pink"
        cursor="pointer"
        onClick={() => navigate("/")}
        leftIcon={
          <Icon as={RiMenuFill} fontSize={["12", "16"]} fontWeight="bold" />
        }
      >
        produtos
      </Button>
    </Flex>
  );
};
