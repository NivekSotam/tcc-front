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
import NewPersonModal from "./CreateModal";
import EditModal from "./EditModal";

const ListagemPessoa = () => {
  const [searchType, setSearchType] = useState("nome");
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState<Pessoa[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(15);
  const [buttonText, setButtonText] = useState("Buscar");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [personToDelete, setPersonToDelete] = useState<string | null>(null);
  const [personToEdit, setPersonToEdit] = useState<string | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateSuccessAlertOpen, setIsCreateSuccessAlertOpen] =
    useState(false);
  const [isEditSuccessAlertOpen, setIsEditSuccessAlertOpen] = useState(false);
  const [isDeleteSuccessAlertOpen, setIsDeleteSuccessAlertOpen] =
    useState(false);

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
    setIsCreateSuccessAlertOpen(true);
    fetchDataFromApi();
    setIsModalOpen(false);
  };

  const handleDeleteButtonClick = (personId: string) => {
    setPersonToDelete(personId);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteModalClose = () => {
    setPersonToDelete(null);
    setIsDeleteModalOpen(false);
  };

  const handleDeleteSuccess = () => {
    setIsDeleteSuccessAlertOpen(true);
    fetchDataFromApi();
    setIsDeleteModalOpen(false); // Fechar o modal de exclusão após o sucesso
  };

  const handleEditButtonClick = (personId: string) => {
    setPersonToEdit(personId);
    setIsEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setPersonToEdit(null);
    setIsEditModalOpen(false);
  };

  const handleEditSuccess = () => {
    setIsEditSuccessAlertOpen(true);
    fetchDataFromApi();
    setIsEditModalOpen(false); // Fechar o modal de edição após o sucesso
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
            onClick={() => handleEditButtonClick(String(item.id))}
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
          onClose={handleDeleteModalClose}
          personId={personToDelete}
          onDeleteSuccess={handleDeleteSuccess}
        />
        <EditModal
          isOpen={isEditModalOpen}
          onClose={handleEditModalClose}
          personId={personToEdit}
          onEditSuccess={handleEditSuccess}
        />
        <SuccessAlert
          isOpen={isCreateSuccessAlertOpen}
          onClose={() => setIsCreateSuccessAlertOpen(false)}
          alertTitle="Usuário criado com sucesso"
          alertDescription="A nova pessoa foi adicionada com sucesso."
        />

        <SuccessAlert
          isOpen={isEditSuccessAlertOpen}
          onClose={() => setIsEditSuccessAlertOpen(false)}
          alertTitle="Usuário editado com sucesso"
          alertDescription="Os detalhes da pessoa foram atualizados com sucesso."
        />

        <SuccessAlert
          isOpen={isDeleteSuccessAlertOpen}
          onClose={() => setIsDeleteSuccessAlertOpen(false)}
          alertTitle="Usuário excluído com sucesso"
          alertDescription="A pessoa foi excluída com sucesso."
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
