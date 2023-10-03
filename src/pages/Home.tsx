import React from "react";
import {
  Box,
  Drawer,
  DrawerContent,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import MyCalendar from "../components/Calendar";
import { ColorModeSwitcher } from "../components/ColorModeSwitcher";
import SidebarContent from "../components/base/SideBar";
import MobileNav from "../components/base/navbar";

const Home = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <ColorModeSwitcher justifySelf="flex-end" />
        </DrawerContent>
      </Drawer>

      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        <MyCalendar />
      </Box>
    </Box>
  );
};

export default Home;
