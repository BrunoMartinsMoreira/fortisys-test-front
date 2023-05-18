import { Button, Flex, Grid } from "@chakra-ui/react";
import { Loading } from "../../Loading/Loading";
import { AddOrEditProductsHeader } from "../AddOrEditProductsHeader";

interface PropTypes {
  isSubmitting: boolean;
  btnText: string;
  headerTitle: string;
  children: React.ReactNode;
  onSubmit: () => void;
}

export const CreateOrEditProduct = ({
  isSubmitting,
  btnText,
  headerTitle,
  children,
  onSubmit,
}: PropTypes) => {
  return (
    <Flex
      width="100%"
      direction="column"
      gap="8"
      align="center"
      justify="center"
    >
      {isSubmitting && <Loading isOpen={isSubmitting} />}
      <Flex
        as="form"
        flexDirection="column"
        maxWidth={["98vw", "70vw"]}
        bg="gray.800"
        p="8"
        pt="4"
        pb={["2", "4"]}
        borderRadius={8}
        onSubmit={onSubmit}
      >
        <AddOrEditProductsHeader title={headerTitle} />
        <Grid
          templateRows={["repeat(5, 1fr)", "repeat(2, 1fr)"]}
          templateColumns={["1fr", "repeat(3, 1fr)"]}
          gap="4"
          alignItems="center"
        >
          {children}
        </Grid>
        <Flex justify="flex-end" gap="3">
          <Button
            type="submit"
            mt="6"
            mb="3"
            colorScheme="green"
            size="lg"
            width="40"
            isLoading={isSubmitting}
          >
            {btnText}
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};
