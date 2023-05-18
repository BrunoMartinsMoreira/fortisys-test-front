import { Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { Header } from "../../components/Header/Header";

export const AppLayout = () => {
  return (
    <Flex direction="column" h="100vh">
      <Header />
      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px={["2", "6"]}>
        <Outlet />
      </Flex>
    </Flex>
  );
};
