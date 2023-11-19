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
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
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
  const [valor, setValor] = useState<any>();
  const [descricao, setDescricao] = useState("");
  const [quantidade, setQuantidade] = useState<number>();
  const [isErrorAlertOpen, setIsErrorAlertOpen] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const [categoriaId, setCategoriaId] = useState<any>();
  const [categoria, setCategoria] = useState<string>("Escolha uma categoria");

  const fetchCategoriaDataFromApi = useCallback(async () => {
    try {
      const userToken = localStorage.getItem("USER_TOKEN");
      const response = await fetchCategoriaData({
        nome: "%",
        userToken,
        itemsPerPage: 1000,
        currentPage: 1,
      });
      setData(response);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  }, []);

  const handleEditItem = async () => {
    try {
      const userToken = localStorage.getItem("USER_TOKEN");
      const selectedCategoria = data.find((cat) => cat.nome === categoria);
      await editItem({
        itemId,
        userToken,
        data: {
          nome,
          descricao,
          valorUnitario: valor,
          quantidade,
          categoriaId: selectedCategoria?.id,
        },
      });
      onEditSuccess();
      onClose();
    } catch (error) {
      console.error("Erro ao editar pessoa:", error);
      setIsErrorAlertOpen(true);
    }
  };

  useEffect(() => {
    fetchCategoriaDataFromApi();
    if (!isOpen) {
      setNome("");
      setValor(0);
      setDescricao("");
      setQuantidade(0);
      setCategoria("Escolha uma categoria");
      setCategoriaId(null);
    }
  }, []);

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
                />
                <NumberInput
                  min={0}
                  step={100.2}
                  name="valor"
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
              <Select
                placeholder="Escolha uma categoria"
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
              >
                {data?.map((categoria) => (
                  <option key={categoria.id} value={categoria.nome}>
                    {categoria.nome}
                  </option>
                ))}
              </Select>
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
