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
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import { FaUser, FaTools, FaChevronDown } from "react-icons/fa";
import { createItem } from "./helpers/api";
import ErrorAlert from "../error/ErrorAlert";
import { fetchCategoriaData } from "../Categoria/helpers/api";

interface NewItemModal {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const NewItemModal: React.FC<NewItemModal> = ({
  isOpen,
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
      console.log(response);
      console.log("bbbb", data);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  }, []);

  useEffect(() => {
    fetchCategoriaDataFromApi();
    if (!isOpen) {
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
          categoriaId,
        },
        userToken,
      });
      onSuccess();
      setIsSuccessAlertOpen(true);
      onClose();
    } catch (error) {
      console.error("Erro ao criar item:", error);
      setIsErrorAlertOpen(true);
    }
  };

  const renderMenuCategoria = () => {
    return (
      <MenuList>
        {data?.map((categoria) => (
          <MenuItem
            onClick={() => {
              setCategoriaId(categoria?.id);
              setCategoria(categoria?.nome);
            }}
          >
            {categoria?.nome}
          </MenuItem>
        ))}
      </MenuList>
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
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
                  // children="R$"
                />

                <NumberInput
                  min={0}
                  step={100.2}
                  name=" valor"
                  value={valor}
                  onChange={(value) => setValor(Number(value))}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </InputGroup>
            </FormControl>
            <FormControl mb={3}>
              <Text>Quantidade:</Text>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  {/* <FaTools color="gray.300" /> */}
                </InputLeftElement>
                <NumberInput
                  min={0}
                  step={100}
                  name="quantidade"
                  value={quantidade}
                  onChange={(value) => setQuantidade(Number(value))}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </InputGroup>
            </FormControl>

            <FormControl mb={3}>
              <Text>Categoria:</Text>
              <Menu>
                <MenuButton as={Button} rightIcon={<FaChevronDown />}>
                  {categoria}
                </MenuButton>
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
