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
  Td,
} from "@chakra-ui/react";
import { FaEdit, FaTrashAlt, FaAngleDown, FaPlus, FaThumbsDown, FaThumbsUp, FaCheck } from "react-icons/fa";
import { fetchPrestacaoData } from "./helpers/api";
import ListPagination from "../ListPagination";
import { paginateData } from "../../helpers/paginate-help";
import { useParams } from "react-router-dom";
import NewModal from "./Create.ServicoPrestacao";
import SuccessAlert from "../error/SuccessAlert";
import EditModal from "./Edit.ServicoPrestacao";

const ListagemServicoPrestacao = () => {
  const params = useParams();
  const prestacaoId = Number(params.id);
  const [data, setData] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(15);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreateSuccessAlertOpen, setIsCreateSuccessAlertOpen] = useState(false);
  const [isEditSuccessAlertOpen, setIsEditSuccessAlertOpen] = useState(false);
  const [prestacaoToEdit, setPrestacaoToEdit] = useState<number | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [prestacaoToDelete, setPrestacaoToDelete] = useState<number | null>(null);
  const [isDeleteSuccessAlertOpen, setIsDeleteSuccessAlertOpen] =
    useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const fetchPrestacaoDataFromApi = useCallback(async () => {
    try {
      const userToken = localStorage.getItem("USER_TOKEN");
      const fetchedData = await fetchPrestacaoData({
        prestacaoId,
        userToken,
      });
      setData(fetchedData);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  }, []);

  useEffect(() => {
    fetchPrestacaoDataFromApi();
  }, [fetchPrestacaoDataFromApi]);

  const { currentItems, totalPages } = paginateData<any>(
    currentPage,
    itemsPerPage,
    data
  );

  const handleCreateModalSuccess = () => {
    setIsCreateSuccessAlertOpen(true);
    fetchPrestacaoDataFromApi();
    setIsModalOpen(false);
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
    fetchPrestacaoDataFromApi();
    setIsEditModalOpen(false);
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
    fetchPrestacaoDataFromApi();
    setIsDeleteModalOpen(false);
  };

  const renderItems = () => {
    return currentItems.map((item) => (
      <Tr key={item.id}>
        <Th>{item.id}</Th>
        <Th>R${item.valorCobrado}</Th>
        <Th>{item.servico}</Th>
        <Th>{item.status === false ? <FaThumbsDown color="red" /> : <FaThumbsUp color="green" />}</Th>
        <Th>{item.isPago === false ? <FaThumbsDown color="red" /> : <FaThumbsUp color="green" />}</Th>
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
        <Button
          marginY={2}
          width={"100%"}
          colorScheme="blue"
          rightIcon={<FaPlus />}
          onClick={() => setIsModalOpen(true)}
        >
          Criar
        </Button>
        <NewModal
          isOpen={isModalOpen}
          prestacaoId={prestacaoId}
          onClose={() => setIsModalOpen(false)}
          onSuccess={handleCreateModalSuccess}
        />
        <SuccessAlert
          isOpen={isCreateSuccessAlertOpen}
          onClose={() => setIsCreateSuccessAlertOpen(false)}
          alertTitle="Serviço criado com sucesso"
          alertDescription="O novo serviço foi criado com sucesso."
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
          alertTitle="Serviço editado com sucesso"
          alertDescription="Os detalhes do serviço foram atualizados com sucesso."
        />

        {/* <DeleteModal
          isOpen={isDeleteModalOpen}
          onClose={handleDeleteModalClose}
          enderecoId={enderecoToDelete}
          onDeleteSuccess={handleDeleteSuccess}W
        /> */}
      </Flex>
      {currentItems.length > 0 ? (
        <Box boxShadow="base" p="6" rounded="md" bg="white">
          <Table variant="simple">
            <Thead>
              <Tr bg={"#2C3E50"}>
                <Th color="white">ID</Th>
                <Th color="white">Valor</Th>
                <Th color="white">Serviço</Th>
                <Th color="white">Feito?</Th>
                <Th color="white">Pago?</Th>
                <Th color="white">Ações</Th>
              </Tr>
            </Thead>
            <Tbody>{renderItems()}</Tbody>
          </Table>
        </Box>
      ) : (
        <Text>Nenhuma prestação encontrada.</Text>
      )}
      <ListPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page: number) => setCurrentPage(page)}
      />
    </Box>
  );
};

export default ListagemServicoPrestacao;
