import React, { useState, useEffect, useCallback } from "react";
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
} from "react-icons/fa";
import { fetchPessoaData } from "./helpers/api";
import ListPagination from "../ListPagination";
import { paginateData } from "../../helpers/paginate-help";
import { useParams } from "react-router-dom";

const ListagemEndereco = () => {
    const params = useParams();
    const pessoaId = Number(params.id);

  const [searchType, setSearchType] = useState("nome");
  const [searchTerm, setSearchTerm] = useState("");

  const [pessoaData, setPessoaData] = useState<any>();
  
  const [fornecedorToDelete, setFornecedorToDelete] = useState<number | null>(null);
  const [data, setData] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(15);
  const [buttonText, setButtonText] = useState("Buscar");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isCreateSuccessAlertOpen, setIsCreateSuccessAlertOpen] = useState(false);
  const [isDeleteSuccessAlertOpen, setIsDeleteSuccessAlertOpen] = useState(false);
  const [isEditSuccessAlertOpen, setIsEditSuccessAlertOpen] = useState(false);
  const [fornecedorToEdit, setFornecedorToEdit] = useState<number | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleMenuItemClick = (type: string) => {
    setSearchType(type);
    setSearchTerm("");
    setCurrentPage(1);
    setButtonText(type === "nome" ? "Nome" : "Nome");
  };

  const handleSearchTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //setNome(e.target.value);
    setCurrentPage(1);
  };

  const fetchDataFromApi = useCallback(async () => {
    try {
      const userToken = localStorage.getItem("USER_TOKEN");
      const fetchedData = await fetchPessoaData({
        pessoaId,
        userToken,
      });
      console.log(fetchedData.data.pessoa[0].nome)
      setPessoaData(fetchedData.data.pessoa[0]);
      console.log("aaaaaa", pessoaData)
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  }, []);

  useEffect(() => {
    fetchDataFromApi();
  }, [fetchDataFromApi]);

  const { currentItems, totalPages } = paginateData<any>(
    currentPage,
    itemsPerPage,
    data
  );

  return (
    <Box p={5}>
      <Flex mb={5}>
        <Text>{pessoaData?.nome}</Text>
      </Flex>
        {/* <Text>a {nome}</Text> */}
      {currentItems.length > 0 ? (
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Nome</Th>
              <Th>Cadastro</Th>
              <Th>Ações</Th>
            </Tr>
          </Thead>
          <Tbody></Tbody>
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

export default ListagemEndereco;
