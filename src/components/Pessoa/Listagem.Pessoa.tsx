// ListagemPessoa.tsx
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
import { FaEdit, FaTrashAlt, FaAngleDown, FaPlus } from "react-icons/fa";
import { fetchData } from "./helpers/api";
import { Pessoa } from "../../Types/Pessoa";
import ListPagination from "../ListPagination";
import SuccessAlert from "../error/SuccessAlert";
import { paginateData } from "../../helpers/paginate-help";
import DeleteModal from "./DeleteModal";
import EditModal from "./EditModal";
import NewPersonModal from "./CreateModal";

const ListagemPessoa = () => {
  const [searchType, setSearchType] = useState("nome");
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState<Pessoa[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(15);
  const [buttonText, setButtonText] = useState("Buscar");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isSuccessAlertOpen, setIsSuccessAlertOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [personToDelete, setPersonToDelete] = useState<string | null>(null);
  const [personToEdit, setPersonToEdit] = useState<Pessoa | null>(null);

  const handleMenuItemClick = (type: string) => {
    setSearchType(type);
    setSearchTerm("");
    setButtonText(
      type === "nome" ? "Nome" : type === "email" ? "Email" : "Cadastro"
    );
  };

  const fetchDataFromApi = useCallback(async () => {
    try {
      const userToken = localStorage.getItem("USER_TOKEN");
      const response = await fetchData(searchType, searchTerm, userToken);
      setData(response.result);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  }, [searchType, searchTerm]);

  useEffect(() => {
    fetchDataFromApi();
  }, [fetchDataFromApi]);

  const { currentItems, totalPages } = paginateData<Pessoa>(
    currentPage,
    itemsPerPage,
    data
  );

  const handleSearchTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleCreatePersonSuccess = () => {
    fetchDataFromApi();
  };

  const handleDeleteButtonClick = (personId: string) => {
    setPersonToDelete(personId);
    setIsDeleteModalOpen(true);
  };

  const handleEditButtonClick = (person: Pessoa) => {
    setPersonToEdit(person);
    setIsEditModalOpen(true);
  };

  const handleEditSuccess = () => {
    fetchDataFromApi();
    setIsSuccessAlertOpen(true);
    setIsEditModalOpen(false);
  };

  const renderItems = () => {
    return currentItems.map((item) => (
      <Tr key={item.id}>
        <Th>{item.id}</Th>
        <Th>{item.nome}</Th>
        <Th>{item.email}</Th>
        <Th>{item.telefone}</Th>
        <Th>{item.cadastro}</Th>
        <Th>
          <Button
            colorScheme="blue"
            mr={2}
            onClick={() => handleEditButtonClick(item)}
          >
            <FaEdit />
          </Button>
          <Button
            colorScheme="red"
            onClick={() => handleDeleteButtonClick(String(item.id))}
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
        <NewPersonModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSuccess={handleCreatePersonSuccess}
        />
        <DeleteModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          personId={personToDelete}
          onDeleteSuccess={() => {
            setIsDeleteModalOpen(false);
            setPersonToDelete(null);
          }}
        />
        <EditModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          person={personToEdit}
          onSuccess={handleEditSuccess}
        />
        <SuccessAlert
          isOpen={isSuccessAlertOpen}
          onClose={() => setIsSuccessAlertOpen(false)}
          alertTitle="Usuário criado com sucesso"
          alertDescription="A nova pessoa foi adicionada com sucesso."
        />
      </Flex>

      {currentItems.length > 0 ? (
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
