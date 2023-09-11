import * as React from "react";
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
} from "@chakra-ui/react";
import SidebarWithHeader from "./components/SidebarWithHeader";

export const App = () => (
  <ChakraProvider theme={theme}>
    <SidebarWithHeader />
  </ChakraProvider>
);
