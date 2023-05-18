import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "./styles/theme";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { queryClient } from "./queryClientConfig";

import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./Routes/AppRoutes";

export const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </QueryClientProvider>
    </ChakraProvider>
  );
};
