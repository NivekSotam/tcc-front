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
import { fetchServicoData } from "./helpers/api";
import { Servico } from "../../Types/Servico";
import ListPagination from "../ListPagination";

const ListagemServico = () => {
  const [searchType, setSearchType] = useState("nome");
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState<Servico[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(15);
  const [buttonText, setButtonText] = useState("Buscar");

  const handleMenuItemClick = (type: string) => {
    setSearchType(type);
    setSearchTerm("");
    setButtonText(type === "nome" ? "Nome" : "Nome");
  };

  useEffect(() => {
    const userToken = localStorage.getItem("USER_TOKEN");
    const fetchDataFromApi = async () => {
      try {
        const fetchedData = await fetchServicoData(
          searchType,
          searchTerm,
          userToken
        );
        setData(fetchedData);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchDataFromApi();
  }, [searchTerm]);

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const renderItems = () => {
    return currentItems.map((item) => (
      <Tr key={item.id}>
        <Th>{item.id}</Th>
        <Th>{item.nome}</Th>
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
          </MenuList>
        </Menu>

        <Input
          placeholder="Pesquisar por nome"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <Button
          ml={5}
          colorScheme="blue"
          rightIcon={<FaPlus />}
          //   onClick={() => setIsModalOpen(true)}
        >
          Criar
        </Button>
      </Flex>

      {currentItems.length > 0 ? (
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Nome</Th>

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

export default ListagemServico;
