import React, { useCallback, useEffect, useState } from "react";
import { editItem } from "./helpers/api";
import {
  Box,
  Button,
  Flex,
  FormControl,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
} from "@chakra-ui/react";
import ErrorAlert from "../error/ErrorAlert";
import { FaUser, FaTools, FaChevronDown } from "react-icons/fa";
import { fetchCategoriaData } from "../Categoria/helpers/api";

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  itemId: number | null;
  onEditSuccess: () => void;
}

const EditModal: React.FC<EditModalProps> = ({
  isOpen,
  onClose,
  itemId,
  onEditSuccess,
}) => {
  const [nome, setNome] = useState<string>("");
  const [valor, setValor] = useState<number>();
  const [descricao, setDescricao] = useState("");
  const [quantidade, setQuantidade] = useState<number>();
  const [isErrorAlertOpen, setIsErrorAlertOpen] = useState(false);

  const [categoriaId, setCategoriaId] = useState<any>();
  const [data, setData] = useState<any[]>([]);
  const [categoria, setCategoria] = useState<string>("Escolha uma categoria");


  const handleEditItem = async () => {
    try {
      const userToken = localStorage.getItem("USER_TOKEN");
      await editItem({
        itemId,
        userToken,
        data: {
          nome,
          valor,
          descricao,
          quantidade,
        },
      });
      onEditSuccess();
      onClose();
    } catch (error) {
      console.error("Erro ao editar pessoa:", error);
      setIsErrorAlertOpen(true);
    }
  };

  const fetchCategoriaDataFromApi = useCallback(async () => {
    try {
      const userToken = localStorage.getItem("USER_TOKEN");
      const response = await fetchCategoriaData({
        nome: "%",
        userToken,
        itemsPerPage: 50,
        currentPage: 1,
      });
      setData(response);
      console.log(response)
      console.log("bbbb", data)
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  }, []);

  useEffect(() => {
    fetchCategoriaDataFromApi();
    if (!isOpen) {
      setCategoria("Escolha uma categoria");
      setCategoriaId(null);
    }
  }, []);

  const renderMenuCategoria = () => {
    return (
      <MenuList>
        {
          data?.map((categoria) => (
            <MenuItem onClick={() => {
              setCategoriaId(categoria?.id)
              setCategoria(categoria?.nome)
            }}>{categoria?.nome}</MenuItem>
          ))
        }
      </MenuList>
    )
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Editar Item</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex direction="column">
            <FormControl mb={3}>
              <Text>Nome:</Text>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <FaUser color="gray.300" />
                </InputLeftElement>
                <Input
                  placeholder="Nome"
                  name="nome"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                />
              </InputGroup>
            </FormControl>
            <FormControl mb={3}>
              <Text>Descrição:</Text>
              <InputGroup>
                <Textarea
                  placeholder="Descrição"
                  name="descricao"
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                  h="120px"
                />
              </InputGroup>
            </FormControl>
            <FormControl mb={3}>
              <Text>Valor:</Text>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  color="#2C3E50"
                  fontSize="1.2em"
                  children="$"
                />
                <Input
                  placeholder="Valor"
                  name="valor"
                  value={valor}
                  onChange={(e) => setValor(Number(e.target.value))}
                />
              </InputGroup>
            </FormControl>
            <FormControl mb={3}>
              <Text>Quantidade:</Text>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <FaTools color="gray.300" />
                </InputLeftElement>
                <Input
                  placeholder="Quantidade"
                  name="quantidade"
                  value={quantidade}
                  onChange={(e) => setQuantidade(Number(e.target.value))}
                />
              </InputGroup>
            </FormControl>
            <FormControl mb={3}>
              <Text>Categoria:</Text>
              <Menu>
                <MenuButton
                  as={Button}
                  rightIcon={<FaChevronDown />}
                >{categoria}</MenuButton>
                {renderMenuCategoria()}
              </Menu>
            </FormControl>
            <Button colorScheme="blue" onClick={handleEditItem}>
              Confirmar
            </Button>
          </Flex>
        </ModalBody>
      </ModalContent>
      <ErrorAlert
        isOpen={isErrorAlertOpen}
        onClose={() => setIsErrorAlertOpen(false)}
        alertTitle="Não foi possível completar a operação."
        alertDescription="Reveja as permissões necessárias ou verifique os dados."
      />
    </Modal>
  );
};

export default EditModal;
