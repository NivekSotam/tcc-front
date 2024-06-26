import React from "react";
import {
  Box,
  Drawer,
  DrawerContent,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import SidebarContent from "../components/base/SideBar";
import MobileNav from "../components/base/navbar";
import ListagemEndereco from "../components/Endereco/Listagem.Endereco";

const Endereco
 = () => {
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
        <ListagemEndereco />
      </Box>
    </Box>
  );
};
export default Endereco;
