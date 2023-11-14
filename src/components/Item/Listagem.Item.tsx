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
import { fetchItemData } from "./helpers/api";
import ListPagination from "../ListPagination";
import { paginateData } from "../../helpers/paginate-help";
import NewItemModal from "./Create.Item";
import SuccessAlert from "../error/SuccessAlert";
import DeleteModal from "./Delete.Item";
import EditModal from "./Edit.item";

const ListagemItem = () => {
  const [searchType, setSearchType] = useState("nome");
  const [searchTerm, setSearchTerm] = useState("");

  const [nome, setNome] = useState("");
  const [itemToDelete, setitemToDelete] = useState<number | null>(null);
  const [itemToEdit, setItemToEdit] = useState<number | null>(null);

  const [data, setData] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(15);
  const [buttonText, setButtonText] = useState("Buscar");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isCreateSuccessAlertOpen, setIsCreateSuccessAlertOpen] =
    useState(false);
  const [isDeleteSuccessAlertOpen, setIsDeleteSuccessAlertOpen] =
    useState(false);
  const [isEditSuccessAlertOpen, setIsEditSuccessAlertOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const handleMenuItemClick = (type: string) => {
    setSearchType(type);
    setSearchTerm("");
    setCurrentPage(1);
    setButtonText(type === "nome" ? "Nome" : "Nome");
  };

  const handleSearchTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNome(e.target.value);
    setCurrentPage(1);
  };

  const fetchDataFromApi = useCallback(async () => {
    try {
      const userToken = localStorage.getItem("USER_TOKEN");
      const fetchedData = await fetchItemData({
        nome,
        userToken,
        currentPage,
        itemsPerPage,
      });
      setData(fetchedData);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  }, [nome, itemsPerPage, currentPage]);

  useEffect(() => {
    fetchDataFromApi();
  }, [fetchDataFromApi]);

  const { currentItems, totalPages } = paginateData<any>(
    currentPage,
    itemsPerPage,
    data
  );

  const handleCreateModalSuccess = () => {
    setIsCreateSuccessAlertOpen(true);
    fetchDataFromApi();
    setIsModalOpen(false);
  };

  const handleDeleteButtonClick = (itemId: number) => {
    setitemToDelete(itemId);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteModalClose = () => {
    setitemToDelete(null);
    setIsDeleteModalOpen(false);
  };

  const handleDeleteSuccess = () => {
    setIsDeleteSuccessAlertOpen(true);
    fetchDataFromApi();
    setIsDeleteModalOpen(false);
  };

  const handleEditButtonClick = (itemId: number) => {
    setItemToEdit(itemId);
    setIsEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setItemToEdit(null);
    setIsEditModalOpen(false);
  };

  const handleEditSuccess = () => {
    setIsEditSuccessAlertOpen(true);
    fetchDataFromApi();
    setIsEditModalOpen(false);
  };

  const renderItems = () => {
    return currentItems.map((item) => (
      <Tr key={item.id}>
        <Th>{item.id}</Th>
        <Th>{item.nome}</Th>
        <Th>{item.quantidade}</Th>
        <Th>R${item.valor}</Th>
        <Th>
          <Button
            colorScheme="blue"
            mr={2}
            onClick={() => handleEditButtonClick(Number(item.id))}
          >
            <FaEdit />
          </Button>
          <Button
            colorScheme="red"
            onClick={() => handleDeleteButtonClick(Number(item.id))}
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
          </MenuList>
        </Menu>

        <Input
          placeholder={`Pesquisar por ${searchType}`}
          value={nome}
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
        <NewItemModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSuccess={handleCreateModalSuccess}
        />
        <SuccessAlert
          isOpen={isCreateSuccessAlertOpen}
          onClose={() => setIsCreateSuccessAlertOpen(false)}
          alertTitle="Item criado com sucesso"
          alertDescription="Os detalhes do Item foram atualizados com sucesso."
        />
        <EditModal
          isOpen={isEditModalOpen}
          onClose={handleEditModalClose}
          itemId={itemToEdit}
          onEditSuccess={handleEditSuccess}
        />
        <SuccessAlert
          isOpen={isEditSuccessAlertOpen}
          onClose={() => setIsEditSuccessAlertOpen(false)}
          alertTitle="Categoria editada com sucesso"
          alertDescription="Os detalhes da categoria foram atualizados com sucesso."
        />
        <DeleteModal
          isOpen={isDeleteModalOpen}
          onClose={handleDeleteModalClose}
          itemId={itemToDelete}
          onDeleteSuccess={handleDeleteSuccess}
        />
        <SuccessAlert
          isOpen={isDeleteSuccessAlertOpen}
          onClose={() => setIsDeleteSuccessAlertOpen(false)}
          alertTitle="Item excluído com sucesso"
          alertDescription="O item foi excluído com sucesso."
        />
      </Flex>

      {currentItems.length > 0 ? (
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Item</Th>
              <Th>Quantidade</Th>
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

export default ListagemItem;
