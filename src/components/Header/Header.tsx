import { Flex, Box, Avatar, Text, useBreakpointValue } from "@chakra-ui/react";
import { Logo } from "./Logo";

export const Header = () => {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  return (
    <Flex
      as="header"
      w="100%"
      maxWidth={"100vw"}
      h="20"
      mx="auto"
      mt="0"
      align="center"
      px={["2", "4"]}
      py={["8", "12"]}
      bgGradient="linear(to-r, gray.800, gray.700)"
      boxShadow="0px 0px 8px 3px rgba(0, 0, 0, 0.95)"
      position="sticky"
      zIndex="999"
      top="0"
    >
      <Logo />

      <Flex align="center" mr={["0", "10"]} ml="auto">
        {isWideVersion && (
          <Box mr="2" textAlign="right">
            <Text fontWeight="bold"></Text>
          </Box>
        )}
        <Avatar backgroundColor="gray.900" size="md" name={``} />
      </Flex>
    </Flex>
  );
};
