import React, { useState, useEffect } from "react";
import {
  Flex,
  Text,
  IconButton,
  useColorModeValue,
  HStack,
  FlexProps,
  MenuItem,
  MenuDivider,
  Menu,
  MenuButton,
  Avatar,
  VStack,
  Box,
  MenuList,
} from "@chakra-ui/react";
import { FiMenu, FiBell, FiChevronDown } from "react-icons/fi";
import axios from "axios";

interface MobileProps extends FlexProps {
  onOpen: () => void;
}

const MobileNav = ({ onOpen }: MobileProps) => {
  const [userName, setUserName] = useState<string>("");

  const handleLogout = () => {
    localStorage.removeItem("USER_TOKEN");

    window.location.reload();
  };

  const getUserData = async (userToken: string) => {
    try {
      const tokenPayload = JSON.parse(atob(userToken.split(".")[1]));
      const userId = tokenPayload.id;

      const response = await axios.get(`/colaborador/get/${userId}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });

      return response.data[0]?.usuario || "";
    } catch (error) {
      console.error("Erro ao obter dados do usuário:", error);
      return "";
    }
  };

  useEffect(() => {
    const userToken = localStorage.getItem("USER_TOKEN");

    if (userToken) {
      const fetchUserData = async () => {
        const userName = await getUserData(userToken);
        setUserName(userName);
      };

      fetchUserData();
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
                <VStack
                  display={{ base: "none", md: "flex" }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="sm">{userName}</Text>
                </VStack>
                <Box display={{ base: "none", md: "flex" }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue("white", "gray.900")}
              borderColor={useColorModeValue("gray.200", "gray.700")}
            >
              <MenuItem>Profile</MenuItem>
              <MenuItem onClick={handleLogout}>Sair</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};

export default MobileNav;
