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
  Link,
} from "@chakra-ui/react";
import {
  FaEdit,
  FaTrashAlt,
  FaAngleDown,
  FaPlus,
  FaSort,
  FaEye,
} from "react-icons/fa";
import { fetchCliforData } from "./helpers/api";
import ListPagination from "../ListPagination";
import { paginateData } from "../../helpers/paginate-help";
import NewClienteModal from "./Create.Cliente";
import SuccessAlert from "../error/SuccessAlert";
import EditModal from "./Edit.Cliente";
import { formatCpfCnpj } from "../../helpers/format-helpers";
import DeleteModal from "./Delete.Cliente";

const ListagemCliente = () => {
  const [searchType, setSearchType] = useState("nome");
  const [searchTerm, setSearchTerm] = useState("");

  const [nome, setNome] = useState("");
  const [data, setData] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(15);
  const [buttonText, setButtonText] = useState("Buscar");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [clienteToDelete, setClienteToDelete] = useState<number | null>(null);
  const [isCreateSuccessAlertOpen, setIsCreateSuccessAlertOpen] =
    useState(false);
  const [isDeleteSuccessAlertOpen, setIsDeleteSuccessAlertOpen] =
    useState(false);
  const [isEditSuccessAlertOpen, setIsEditSuccessAlertOpen] = useState(false);
  const [clienteToEdit, setClienteToEdit] = useState<number | null>(null);
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
      const fetchedData = await fetchCliforData({
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

  const handleDeleteButtonClick = (clienteId: number) => {
    setClienteToDelete(clienteId);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteModalClose = () => {
    setClienteToDelete(null);
    setIsDeleteModalOpen(false);
  };

  const handleDeleteSuccess = () => {
    setIsDeleteSuccessAlertOpen(true);
    fetchDataFromApi();
    setIsDeleteModalOpen(false);
  };

  const handleEditButtonClick = (clienteId: number) => {
    setClienteToEdit(clienteId);
    setIsEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setClienteToEdit(null);
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
        <Th>{formatCpfCnpj(item.cadastro)}</Th>
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
            mr={2}
            onClick={() => handleDeleteButtonClick(Number(item.id))}
          >
            <FaTrashAlt />
          </Button>
          <Link href={`/clientes/${item.id}`}>
            <Button colorScheme="blue" mr={2}>
              <FaEye />
            </Button>
          </Link>
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
        <NewClienteModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSuccess={handleCreateModalSuccess}
        />
        <SuccessAlert
          isOpen={isCreateSuccessAlertOpen}
          onClose={() => setIsCreateSuccessAlertOpen(false)}
          alertTitle="Cliente criado com sucesso"
          alertDescription="A novo cliente foi adicionada com sucesso."
        />
        <EditModal
          isOpen={isEditModalOpen}
          onClose={handleEditModalClose}
          clienteId={clienteToEdit}
          onEditSuccess={handleEditSuccess}
        />
        <SuccessAlert
          isOpen={isEditSuccessAlertOpen}
          onClose={() => setIsEditSuccessAlertOpen(false)}
          alertTitle="Cliente editado com sucesso"
          alertDescription="Os detalhes do cliente foram atualizados com sucesso."
        />
        <DeleteModal
          isOpen={isDeleteModalOpen}
          onClose={handleDeleteModalClose}
          clienteId={clienteToDelete}
          onDeleteSuccess={handleDeleteSuccess}
        />
        <SuccessAlert
          isOpen={isDeleteSuccessAlertOpen}
          onClose={() => setIsDeleteSuccessAlertOpen(false)}
          alertTitle="Cliente excluído com sucesso"
          alertDescription="O cliente foi excluído com sucesso."
        />
      </Flex>

      {currentItems.length > 0 ? (
        <Box boxShadow="base" p="6" rounded="md" bg="white">
          <Table variant="simple">
            <Thead>
              <Tr bg={"#2C3E50"}>
                <Th color="white">ID</Th>
                <Th color="white">Nome</Th>
                <Th color="white">Cadastro</Th>
                <Th color="white">Ações</Th>
              </Tr>
            </Thead>
            <Tbody>{renderItems()}</Tbody>
          </Table>
        </Box>
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

export default ListagemCliente;
