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
import { fetchVendaData } from "./helpers/api";
import { Venda } from "../../Types/Venda";
import ListPagination from "../ListPagination";
import { paginateData } from "../../helpers/paginate-help";

const ListagemVenda = () => {
  const [searchType, setSearchType] = useState("nome");
  const [searchTerm, setSearchTerm] = useState("");

  const [colaboradorId, setColaboradorId] = useState(2);
  const [clienteFornecedorId, setClienteFornecedorId] = useState(1);
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");

  const [data, setData] = useState<Venda[]>([]);
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
        const fetchedData = await fetchVendaData({
            colaboradorId,
            clienteFornecedorId,
            dataInicio,
            dataFim,
            itemsPerPage,
            currentPage,
            userToken
        });
        setData(fetchedData);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchDataFromApi();
  }, [searchTerm]);

  const { currentItems, totalPages } = paginateData<Venda>(
    currentPage,
    itemsPerPage,
    data
  );

  const renderItems = () => {
    return currentItems.map((item) => (
      <Tr key={item.id}>
        <Th>{item.id}</Th>
        <Th>{item.colaborador}</Th>
        <Th>{item.cliente}</Th>
        <Th>{item.dataVenda}</Th>
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
              <Th>Cliente</Th>
              <Th>Data da Venda</Th>
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

export default ListagemVenda;
