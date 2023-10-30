import React, { useState, useEffect } from "react";
import {
  Flex,
  Text,
  IconButton,
  useColorModeValue,
  HStack,
  FlexProps,
  MenuItem,
  Menu,
  MenuButton,
  Avatar,
  Box,
  MenuList,
} from "@chakra-ui/react";
import { FiMenu, FiChevronDown } from "react-icons/fi";

interface MobileProps extends FlexProps {
  onOpen: () => void;
}

const MobileNav = ({ onOpen }: MobileProps) => {
  const [userName, setUserName] = useState<string>("");

  const handleLogout = () => {
    localStorage.removeItem("USER_TOKEN");
    window.location.reload();
  };

  useEffect(() => {
    const userToken = localStorage.getItem("USER_TOKEN");

    if (userToken) {
      const tokenPayload = JSON.parse(atob(userToken.split(".")[1]));
      const userName = tokenPayload.usuario;
      setUserName(userName);
    }
  }, []);

  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />
      <Text
        display={{ base: "flex", md: "none" }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
      >
        Logo
      </Text>
      <HStack spacing={{ base: "0", md: "6" }}>
        <Flex alignItems={"center"}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: "none" }}
            >
              <HStack>
                <Avatar size={"sm"} bg="#2C3E50" />
                <Box
                  display={{ base: "none", md: "flex" }}
                  alignItems="flex-start"
                  ml="2"
                >
                  <Text fontSize="sm">{userName}</Text>
                </Box>
                <Box display={{ base: "none", md: "flex" }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue("white", "gray.900")}
              borderColor={useColorModeValue("gray.200", "gray.700")}
            >
              <MenuItem onClick={handleLogout}>Sair</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};

export default MobileNav;
