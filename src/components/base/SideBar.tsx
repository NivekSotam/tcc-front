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
  FiBox,
} from "react-icons/fi";
import NavItem from "./NavItem";

const SidebarContent = () => {
  const [showPessoas, setShowPessoas] = useState(false);
  const [showServicos, setShowServicos] = useState(false);
  const [showItens, setShowItens] = useState(false);
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

      {/* <NavItem icon={FiFileText} to="/vendas">
        Vendas
      </NavItem>

      <NavItem icon={FiFileText} to="/compras">
        Compras
      </NavItem> */}

      <Button
        onClick={() => setShowItens(!showItens)}
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
          <Icon as={FiBox} />
          Gestão de Estoque
          <Icon
            ml="4"
            fontSize="16"
            as={showItens ? FiChevronUp : FiChevronDown}
          />
        </Flex>
      </Button>
      <Collapse in={showItens}>
        <NavItem icon={FiFileText} to="/itens">
          Itens
        </NavItem>
        <NavItem icon={FiFileText} to="/itensCategoria">
          Iten-Categoria
        </NavItem>
        <NavItem icon={FiFileText} to="/categorias">
          Categorias
        </NavItem>
      </Collapse>

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
          Gestão Pessoal
          <Icon
            ml="4"
            fontSize="16"
            as={showPessoas ? FiChevronUp : FiChevronDown}
          />
        </Flex>
      </Button>
      <Collapse in={showPessoas}>
        <NavItem icon={FiFileText} to="/clientes">
          Clientes
        </NavItem>
        <NavItem icon={FiFileText} to="/fornecedores">
          Fornecedores
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
          Gestão de Serviços
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
        <NavItem icon={FiFileText} to="/prestacoes">
          Prestações
        </NavItem>
      </Collapse>
    </Box>
  );
};

export default SidebarContent;
