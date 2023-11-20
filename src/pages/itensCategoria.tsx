import React from "react";
import {
  Box,
  Drawer,
  DrawerContent,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import SidebarContent from "../components/base/SideBar";
import MobileNav from "../components/base/navbar";
import ListagemItem from "../components/Item/Listagem.Item";
import ListagemItemCategoria from "../components/Item/Listagem.Item.categoria";

const ItensCategoria = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <SidebarContent />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent></DrawerContent>
      </Drawer>

      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        <ListagemItemCategoria />
      </Box>
    </Box>
  );
};

export default ItensCategoria;
