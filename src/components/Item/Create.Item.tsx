import React, { useCallback, useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Input,
  Flex,
  Button,
  FormControl,
  InputLeftElement,
  InputGroup,
  Text,
  Textarea,
  Menu,
  MenuItem,
  MenuButton,
  MenuList,
} from "@chakra-ui/react";
import { FaUser, FaTools, FaChevronDown } from "react-icons/fa";
import { createItem } from "./helpers/api";
import ErrorAlert from "../error/ErrorAlert";
import { fetchCategoriaData } from "../Categoria/helpers/api"

interface NewItemModal {
  isOpenA: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const NewItemModal: React.FC<NewItemModal> = ({
  isOpenA,
  onClose,
  onSuccess,
}) => {
  const [nome, setNome] = useState("");
  const [valor, setValor] = useState<any>();
  const [descricao, setDescricao] = useState("");
  const [quantidade, setQuantidade] = useState<any>();
  const [categoriaId, setCategoriaId] = useState<any>();
  const [isSuccessAlertOpen, setIsSuccessAlertOpen] = useState(false);
  const [isErrorAlertOpen, setIsErrorAlertOpen] = useState(false);

  const [data, setData] = useState<any[]>([]);
  const [categoria, setCategoria] = useState<string>("Escolha uma categoria");

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
    if (!isOpenA) {
      setNome("");
      setValor("");
      setDescricao("");
      setQuantidade(0);
      setCategoria("Escolha uma categoria");
      setCategoriaId(null);
    }
  }, []);

  const handleCreatePerson = async () => {
    try {
      console.log(nome);
      const userToken = localStorage.getItem("USER_TOKEN");
      await createItem({
        data: {
          nome,
          descricao,
          valorUnitario: valor,
          quantidade,
          categoriaId
        },
        userToken,
      });
      onSuccess();
      setIsSuccessAlertOpen(true);
      onClose();
    } catch (error) {
      console.error("Erro ao criar pessoa:", error);
      setIsErrorAlertOpen(true);
    }
  };

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
    <Modal isOpen={isOpenA} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Criar novo Item</ModalHeader>
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
              <Textarea
                placeholder="Descrição"
                name="descricao"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                h="120px"
              />
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
            <Button colorScheme="blue" onClick={handleCreatePerson}>
              Criar Item
            </Button>
          </Flex>
        </ModalBody>
      </ModalContent>
      <ErrorAlert
        isOpen={isErrorAlertOpen}
        onClose={() => setIsErrorAlertOpen(false)}
        alertTitle="Não foi possível fazer o cadastro."
        alertDescription="Reveja as permissões necessárias ou verifique os dados."
      />
    </Modal>
  );
};

export default NewItemModal;
