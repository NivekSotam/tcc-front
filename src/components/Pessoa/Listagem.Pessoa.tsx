import React, { useState, useEffect } from "react";
import {
  Box,
  Text,
  Flex,
  Input,
  Button,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import {
  FaEdit,
  FaTrashAlt,
  FaAngleDown,
  FaPlus,
  FaSort,
} from "react-icons/fa";
import axios from "axios";
import { fetchData } from "./helpers/api";
import { Pessoa } from "../../Types/Pessoa";
import ListPagination from "../ListPagination";

const ListagemPessoa = () => {
  const [searchType, setSearchType] = useState("nome");
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState<Pessoa[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [sortOrder, setSortOrder] = useState({});
  const [buttonText, setButtonText] = useState("Buscar");

  const handleMenuItemClick = (type: string) => {
    setSearchType(type);
    setSearchTerm("");
    setButtonText(
      type === "nome" ? "Nome" : type === "email" ? " Email" : "Cadastro"
    );
  };
  useEffect(() => {
    const userToken = localStorage.getItem("USER_TOKEN");

    const fetchDataFromApi = async () => {
      try {
        const fetchedData = await fetchData(
          searchType,
          searchTerm,
          userToken,
          sortOrder
        );
        setData(fetchedData);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchDataFromApi();
  }, [searchType, searchTerm, sortOrder]);

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const renderItems = () => {
    return currentItems.map((item) => (
      <Tr key={item.id}>
        <Th>{item.id}</Th>
        <Th>{item.nome}</Th>
        <Th>{item.email}</Th>
        <Th>{item.telefone}</Th>
        <Th>{item.cadastro}</Th>
        <Th>
          <Button colorScheme="blue" mr={2}>
            <FaEdit />
          </Button>
          <Button colorScheme="red">
            <FaTrashAlt />
          </Button>
        </Th>
      </Tr>
    ));
  };

  return (
    <Box p={5}>
      <Flex mb={5}>
        <Menu>
          <MenuButton as={Button} rightIcon={<FaAngleDown />}>
            <Flex alignItems="center">
              <Box mr={4}>{buttonText}</Box>
            </Flex>
          </MenuButton>
          <MenuList>
            <MenuItem onClick={() => handleMenuItemClick("nome")}>
              Nome
            </MenuItem>
            <MenuItem onClick={() => handleMenuItemClick("email")}>
              Email
            </MenuItem>
            <MenuItem onClick={() => handleMenuItemClick("cadastro")}>
              Cadastro
            </MenuItem>
          </MenuList>
        </Menu>

        <Input
          placeholder={`Pesquisar por ${searchType}`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <Button ml={5} colorScheme="blue" rightIcon={<FaSort />}></Button>

        <Button ml={5} colorScheme="blue" rightIcon={<FaPlus />}>
          Criar
        </Button>
      </Flex>

      {data.length > 0 ? (
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Nome</Th>
              <Th>Email</Th>
              <Th>Telefone</Th>
              <Th>Cadastro</Th>
              <Th>Ações</Th>
            </Tr>
          </Thead>
          <Tbody>{renderItems()}</Tbody>
        </Table>
      ) : (
        <Text>Nenhum dado encontrado.</Text>
      )}
      <ListPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page: number) => setCurrentPage(page)}
      />
    </Box>
  );
};

export default ListagemPessoa;
