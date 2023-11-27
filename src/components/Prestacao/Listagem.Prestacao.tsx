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
import { fetchPrestacaoData } from "./helpers/api";
import ListPagination from "../ListPagination";
import { paginateData } from "../../helpers/paginate-help";
import SuccessAlert from "../error/SuccessAlert";
import NewPrestacaoModal from "./Create.Prestacao";
import EditModal from "./Edit.Prestacao";
import DeleteModal from "./Delete.Prestacao";

const ListagemPrestacao = () => {
  const [searchType, setSearchType] = useState("nome");
  const [searchTerm, setSearchTerm] = useState("");

  const [nome, setNome] = useState("");

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
  const [prestacaoToEdit, setPrestacaoToEdit] = useState<number | null>(null);
  const [prestacaoToDelete, setPrestacaoToDelete] = useState<number | null>(
    null
  );
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
      const fetchedData = await fetchPrestacaoData({
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

  const handleDeleteButtonClick = (prestacaoId: number) => {
    setPrestacaoToDelete(prestacaoId);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteModalClose = () => {
    setPrestacaoToDelete(null);
    setIsDeleteModalOpen(false);
  };

  const handleDeleteSuccess = () => {
    setIsDeleteSuccessAlertOpen(true);
    fetchDataFromApi();
    setIsDeleteModalOpen(false);
  };

  const handleEditButtonClick = (prestacaoId: number) => {
    setPrestacaoToEdit(prestacaoId);
    setIsEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setPrestacaoToEdit(null);
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
        <Th>{item.funcionario}</Th>
        <Th>{item.cliente}</Th>

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
          <Link href={`/prestacoes/${item.id}`}>
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
        <Button
          ml={5}
          width={"100%"}
          colorScheme="blue"
          rightIcon={<FaPlus />}
          onClick={() => setIsModalOpen(true)}
        >
          Criar
        </Button>
        <NewPrestacaoModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSuccess={handleCreateModalSuccess}
        />
        <SuccessAlert
          isOpen={isCreateSuccessAlertOpen}
          onClose={() => setIsCreateSuccessAlertOpen(false)}
          alertTitle="Prestação criada com sucesso"
          alertDescription="A nova Prestação foi adicionada com sucesso."
        />
        <EditModal
          isOpen={isEditModalOpen}
          onClose={handleEditModalClose}
          prestacaoId={prestacaoToEdit}
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
          prestacaoId={prestacaoToDelete}
          onDeleteSuccess={handleDeleteSuccess}
        />
        <SuccessAlert
          isOpen={isDeleteSuccessAlertOpen}
          onClose={() => setIsDeleteSuccessAlertOpen(false)}
          alertTitle="Categoria excluído com sucesso"
          alertDescription="A categoria foi excluída com sucesso."
        />
      </Flex>

      {currentItems.length > 0 ? (
        <Box boxShadow="base" p="6" rounded="md" bg="white">
          <Table variant="simple">
            <Thead>
              <Tr bg={"#2C3E50"}>
                <Th color="white">ID</Th>
                <Th color="white">Funcionario</Th>
                <Th color="white">Cliente</Th>
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

export default ListagemPrestacao;
