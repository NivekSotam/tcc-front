import React, { useState } from "react";
import {
  Box,
  Flex,
  Text,
  CloseButton,
  useColorModeValue,
  Icon,
  Button,
  Collapse,
} from "@chakra-ui/react";
import {
  FiCalendar,
  FiFileText,
  FiUsers,
  FiChevronDown,
  FiChevronUp,
} from "react-icons/fi";
import NavItem from "./NavItem";

const SidebarContent = () => {
  const [showPessoas, setShowPessoas] = useState(false);
  const [showServicos, setShowServicos] = useState(false);

  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Logo
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} />
      </Flex>

      <NavItem icon={FiCalendar} to="/">
        Calendário
      </NavItem>

      <Button
        onClick={() => setShowPessoas(!showPessoas)}
        bg={"#fff"}
        mt="1rem"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "#2C3E50",
          color: "white",
        }}
      >
        <Flex align="center">
          <Icon as={FiUsers} />
          Adm.Pessoas
          <Icon
            ml="4"
            fontSize="16"
            as={showPessoas ? FiChevronUp : FiChevronDown}
          />
        </Flex>
      </Button>
      <Collapse in={showPessoas}>
        <NavItem icon={FiUsers} to="/pessoas">
          Pessoas
        </NavItem>
      </Collapse>
      <Button
        onClick={() => setShowServicos(!showServicos)}
        bg={"#fff"}
        mt="1rem"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "#2C3E50",
          color: "white",
        }}
      >
        <Flex align="center">
          <Icon as={FiFileText} />
          Adm.Serviços
          <Icon
            ml="4"
            fontSize="16"
            as={showServicos ? FiChevronUp : FiChevronDown}
          />
        </Flex>
      </Button>
      <Collapse in={showServicos}>
        <NavItem icon={FiFileText} to="/servico">
          Serviços
        </NavItem>
      </Collapse>
    </Box>
  );
};

export default SidebarContent;
