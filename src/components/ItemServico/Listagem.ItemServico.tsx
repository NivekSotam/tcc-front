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
import { FaEdit, FaTrashAlt, FaAngleDown, FaPlus, FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { fetchPrestacaoData } from "./helpers/api";
import ListPagination from "../ListPagination";
import { paginateData } from "../../helpers/paginate-help";
import { useParams } from "react-router-dom";
import NewItemPrestacaoModal from "./Create.ItemServico";
import SuccessAlert from "../error/SuccessAlert";
import EditItemPrestacaoModal from "./Update.ItemServico";
import DeleteModal from "./Delete.ItemServico";

const ListagemItemServico = () => {
  const params = useParams();
  
  const prestacaoId = Number(params.id)
  const servicoId = Number(params.servicoId);


  const [pessoaData, setPessoaData] = useState<any>();
  const [data, setData] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(15);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreateSuccessAlertOpen, setIsCreateSuccessAlertOpen] =
    useState(false);
  const [isEditSuccessAlertOpen, setIsEditSuccessAlertOpen] = useState(false);
  const [servicoToEdit, setServicoToEdit] = useState<number | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [itemToDelete, setItemToDelete] = useState<number | null>(null);
  const [isDeleteSuccessAlertOpen, setIsDeleteSuccessAlertOpen] =
    useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const fetchEnderecoDataFromApi = useCallback(async () => {
    try {
      const userToken = localStorage.getItem("USER_TOKEN");
      const fetchedData = await fetchPrestacaoData({
        servicoId,
        prestacaoId,
        userToken,
      });
     setData(fetchedData);
     console.log(data)
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  }, []);

  useEffect(() => {
    fetchEnderecoDataFromApi();
  }, [fetchEnderecoDataFromApi]);

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

  const handleEditButtonClick = (itemServicoId: number) => {
    setServicoToEdit(itemServicoId);
    setIsEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setServicoToEdit(null);
    setIsEditModalOpen(false);
  };

  const handleEditSuccess = () => {
    setIsEditSuccessAlertOpen(true);
    fetchEnderecoDataFromApi();
    setIsEditModalOpen(false);
  };

  const handleDeleteButtonClick = (itemServicoId: number) => {
    setItemToDelete(itemServicoId);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteModalClose = () => {
    setItemToDelete(null);
    setIsDeleteModalOpen(false);
  };

  const handleDeleteSuccess = () => {
    setIsDeleteSuccessAlertOpen(true);
    fetchEnderecoDataFromApi();
    setIsDeleteModalOpen(false);
  };

  const renderItems = () => {
    return currentItems.map((item) => (
      <Tr key={item.id}>
        <Th>{item?.id}</Th>
        <Th>{item?.nome}</Th>
        <Th>{item?.quantidade}</Th>
        <Th>{item?.retornado === false ? <FaThumbsDown color="red" /> : <FaThumbsUp color="green" />}</Th>
        <Th>
          <Button
            colorScheme="blue"
            isDisabled = {item.retornado}
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
        <Button
          marginY={2}
          width={"100%"}
          colorScheme="blue"
          rightIcon={<FaPlus />}
          onClick={() => setIsModalOpen(true)}
        >
          Criar
        </Button>
        <NewItemPrestacaoModal
          isOpen={isModalOpen}
          servicoId={servicoId}
          prestacaoId={prestacaoId}
          onClose={() => setIsModalOpen(false)}
          onSuccess={handleCreateModalSuccess}
        />
        <SuccessAlert
          isOpen={isCreateSuccessAlertOpen}
          onClose={() => setIsCreateSuccessAlertOpen(false)}
          alertTitle="Item adicionado com sucesso"
          alertDescription="O item foi adicionado com sucesso."
        />
         <EditItemPrestacaoModal
          isOpen={isEditModalOpen}
          onClose={handleEditModalClose}
          itemServicoId={servicoToEdit}
          servicoId={servicoId}
          prestacaoId={prestacaoId}
          onSuccess={handleEditSuccess}
        />
        <SuccessAlert
          isOpen={isEditSuccessAlertOpen}
          onClose={() => setIsEditSuccessAlertOpen(false)}
          alertTitle="Endereco editada com sucesso"
          alertDescription="Os detalhes da categoria foram atualizados com sucesso."
        />
        <SuccessAlert
          isOpen={isDeleteSuccessAlertOpen}
          onClose={() => setIsDeleteSuccessAlertOpen(false)}
          alertTitle="Endereço excluído com sucesso"
          alertDescription="O Endereço foi excluído com sucesso."
        />

        <DeleteModal
          isOpen={isDeleteModalOpen}
          onClose={handleDeleteModalClose}
          itemServicoId={itemToDelete}
          servicoId={servicoId}
          prestacaoId={prestacaoId}
          onDeleteSuccess={handleDeleteSuccess}
        />
      </Flex>
      {currentItems.length > 0 ? (
        <Box boxShadow="base" p="6" rounded="md" bg="white">
          <Table variant="simple">
            <Thead>
              <Tr bg={"#2C3E50"}>
                <Th color="white">ID</Th>
                <Th color="white">Item</Th>
                <Th color="white">Quantidade</Th>
                <Th color="white">Retornado</Th>
                <Th color="white">Ações</Th>
              </Tr>
            </Thead>
            <Tbody>{renderItems()}</Tbody>
          </Table>
        </Box>
      ) : (
        <Text>Nenhum Item encontrado.</Text>
      )}
      <ListPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page: number) => setCurrentPage(page)}
      />
    </Box>
  );
};

export default ListagemItemServico;
