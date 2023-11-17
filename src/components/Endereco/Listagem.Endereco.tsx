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
import { fetchEnderecoData, fetchPessoaData } from "./helpers/api";
import ListPagination from "../ListPagination";
import { paginateData } from "../../helpers/paginate-help";
import { useParams } from "react-router-dom";
import NewEnderecoModal from "./Create.Endereco";
import SuccessAlert from "../error/SuccessAlert";

const ListagemEndereco = () => {
    const params = useParams();
    const pessoaId = Number(params.id);

  const [searchType, setSearchType] = useState("nome");
  const [searchTerm, setSearchTerm] = useState("");

  const [pessoaData, setPessoaData] = useState<any>();
  
  // const [fornecedorToDelete, setFornecedorToDelete] = useState<number | null>(null);
  const [data, setData] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(15);
  const [buttonText, setButtonText] = useState("Buscar");
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isCreateSuccessAlertOpen, setIsCreateSuccessAlertOpen] = useState(false);
  // const [isDeleteSuccessAlertOpen, setIsDeleteSuccessAlertOpen] = useState(false);
  // const [isEditSuccessAlertOpen, setIsEditSuccessAlertOpen] = useState(false);
  // const [fornecedorToEdit, setFornecedorToEdit] = useState<number | null>(null);
  // const [isEditModalOpen, setIsEditModalOpen] = useState(false);

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

  const fetchPessoaDataFromApi = useCallback(async () => {
    try {
      const userToken = localStorage.getItem("USER_TOKEN");
      const fetchedData = await fetchPessoaData({
        pessoaId,
        userToken,
      });
      setPessoaData(fetchedData.data.pessoa[0]);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  }, []);

  const fetchEnderecoDataFromApi = useCallback(async () => {
    try {
      const userToken = localStorage.getItem("USER_TOKEN");
      const fetchedData = await fetchEnderecoData({
        pessoaId,
        userToken,
      });
      console.log("aaaaaaaaaaaaaaaaaaaaaaaa", fetchedData)
      setData(fetchedData);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
  }}, [])

  useEffect(() => {
    fetchPessoaDataFromApi();
    fetchEnderecoDataFromApi();
  }, [fetchPessoaDataFromApi, fetchEnderecoDataFromApi]);

  const { currentItems, totalPages } = paginateData<any>(
    currentPage,
    itemsPerPage,
    data
  );

  const handleCreateModalSuccess = () => {
    setIsCreateSuccessAlertOpen(true);
    fetchEnderecoDataFromApi();
    setIsModalOpen(false);
  };

  const renderItems = () => {
    return currentItems.map((item) => (
      <Tr key={item.id}>
        <Th>{item.id}</Th>
        <Th>{item.rua}</Th>
        <Th>
          <Button
            colorScheme="blue"
            mr={2}
            //onClick={() => handleEditButtonClick(Number(item.id))}
          >
            <FaEdit />
          </Button>
          <Button
            colorScheme="red"
            //onClick={() => handleDeleteButtonClick(Number(item.id))}
          >
            <FaTrashAlt />
          </Button>
        </Th>
      </Tr>
    ));
  };

  return (
    <Box p={5}>
      <Flex mb={5}>
        <Text>{pessoaData?.nome}</Text>
        <Text> {pessoaData?.email} </Text>
        <Text> {pessoaData?.telefone} </Text>
        <Text> {pessoaData?.cadastro} </Text>
        <Text> {pessoaData?.registro} </Text>
        <Text> {pessoaData?.isCliente} </Text>
      </Flex>
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
          onClick={() => setIsModalOpen(true)}
        >
          Criar
        </Button>
        <NewEnderecoModal
          isOpen={isModalOpen}
          pessoaId={pessoaId}
          onClose={() => setIsModalOpen(false)}
          onSuccess={handleCreateModalSuccess}
        />
        <SuccessAlert
          isOpen={isCreateSuccessAlertOpen}
          onClose={() => setIsCreateSuccessAlertOpen(false)}
          alertTitle="Endereço criado com sucesso"
          alertDescription="O novo endereço foi criado com sucesso."
        />
      </Flex>
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
          <Tbody>{renderItems()}</Tbody>
        </Table>
      ) : (
        <Text>Nenhum endereço encontrado.</Text>
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
