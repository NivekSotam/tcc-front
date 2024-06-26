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
import { FaEdit, FaTrashAlt, FaAngleDown, FaPlus } from "react-icons/fa";
import { fetchEnderecoData, fetchPessoaData } from "./helpers/api";
import ListPagination from "../ListPagination";
import { paginateData } from "../../helpers/paginate-help";
import { useParams } from "react-router-dom";
import NewEnderecoModal from "./Create.Endereco";
import SuccessAlert from "../error/SuccessAlert";
import EditModal from "./Editar.Endereco";
import DeleteModal from "./Delete.Endereco";

const ListagemEndereco = () => {
  const params = useParams();
  const pessoaId = Number(params.id);
  const [pessoaData, setPessoaData] = useState<any>();
  const [data, setData] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(15);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreateSuccessAlertOpen, setIsCreateSuccessAlertOpen] =
    useState(false);
  const [isEditSuccessAlertOpen, setIsEditSuccessAlertOpen] = useState(false);
  const [endecoToEdit, setEnderecoToEdit] = useState<number | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [enderecoToDelete, setEnderecoToDelete] = useState<number | null>(null);
  const [isDeleteSuccessAlertOpen, setIsDeleteSuccessAlertOpen] =
    useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

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
      setData(fetchedData);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  }, []);

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

  const handleEditButtonClick = (enderecoId: number) => {
    setEnderecoToEdit(enderecoId);
    setIsEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setEnderecoToEdit(null);
    setIsEditModalOpen(false);
  };

  const handleEditSuccess = () => {
    setIsEditSuccessAlertOpen(true);
    fetchEnderecoDataFromApi();
    setIsEditModalOpen(false);
  };

  const handleDeleteButtonClick = (enderecoId: number) => {
    setEnderecoToDelete(enderecoId);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteModalClose = () => {
    setEnderecoToDelete(null);
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
        <Th>{item.id}</Th>
        <Th>{item.cidade}</Th>
        <Th>{item.rua}</Th>
        <Th>{item.numero}</Th>
        <Th>{item.cep}</Th>
        <Th>{item.tipo === "R" ? "Rural" : "Urbano"}</Th>
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
      <Box boxShadow="base" p="6" rounded="md" bg="white">
        <Table variant="simple">
          <Thead bg={"#2C3E50"}>
            <Tr>
              <Th color="white">Nome</Th>
              <Th color="white">Email</Th>
              <Th color="white">Telefone</Th>
              <Th color="white">Cadastro</Th>
              <Th color="white">Registro</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>{pessoaData?.nome}</Td>
              <Td>{pessoaData?.email}</Td>
              <Td>{pessoaData?.telefone}</Td>
              <Td>{pessoaData?.cadastro}</Td>
              <Td>{pessoaData?.registro}</Td>
            </Tr>
          </Tbody>
        </Table>
      </Box>
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
        <EditModal
          isOpen={isEditModalOpen}
          onClose={handleEditModalClose}
          enderecoId={endecoToEdit}
          onEditSuccess={handleEditSuccess}
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
          enderecoId={enderecoToDelete}
          onDeleteSuccess={handleDeleteSuccess}
        />
      </Flex>
      {currentItems.length > 0 ? (
        <Box boxShadow="base" p="6" rounded="md" bg="white">
          <Table variant="simple">
            <Thead>
              <Tr bg={"#2C3E50"}>
                <Th color="white">ID</Th>
                <Th color="white">Cidade</Th>
                <Th color="white">Rua</Th>
                <Th color="white">Número</Th>
                <Th color="white">Cep</Th>
                <Th color="white">Tipo</Th>
                <Th color="white">Ações</Th>
              </Tr>
            </Thead>
            <Tbody>{renderItems()}</Tbody>
          </Table>
        </Box>
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
