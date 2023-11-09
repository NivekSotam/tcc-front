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
import { fetchCompraData } from "./helpers/api";
import ListPagination from "../ListPagination";
import { paginateData } from "../../helpers/paginate-help";

const ListagemCompra = () => {
  const [searchType, setSearchType] = useState("nome");
  const [searchTerm, setSearchTerm] = useState("");

  const [data, setData] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(15);
  const [buttonText, setButtonText] = useState("Buscar");

  const handleMenuItemClick = (type: string) => {
    setSearchType(type);
    setSearchTerm("");
    setCurrentPage(1);
    setButtonText(type === "nome" ? "Nome" : "Nome");
  };

  const handleSearchTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  useEffect(() => {
    const userToken = localStorage.getItem("USER_TOKEN");
    const fetchDataFromApi = async () => {
      try {
        const fetchedData = await fetchCompraData({
            userToken
        });
        console.log(fetchedData)
        setData(fetchedData);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchDataFromApi();
  }, [searchTerm]);

  const { currentItems, totalPages } = paginateData<any>(
    currentPage,
    itemsPerPage,
    data
  );

  const renderItems = () => {
    return currentItems.map((item) => (
      <Tr key={item.id}>
        <Th>{item.id}</Th>
        <Th>{item.colaborador}</Th>
        <Th>{item.fornecedor}</Th>
        <Th>{item.dataCompra}</Th>
        <Th>R${item.valor}</Th>
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
          placeholder={`Pesquisar por ${searchType}`}
          value={searchTerm}
          onChange={handleSearchTermChange}
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
              <Th>Colaborador</Th>
              <Th>Fornecedor</Th>
              <Th>Data da Compra</Th>
              <Th>Valor</Th>
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

export default ListagemCompra;
