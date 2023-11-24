import React, { useEffect, useState } from "react";
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
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
} from "@chakra-ui/react";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaIdCard,
  FaChevronDown,
  FaSign,
} from "react-icons/fa";
import ErrorAlert from "../error/ErrorAlert";
import { addItemToPrestacao } from "./helpers/api";

interface NewItemPrestacaoModal {
  isOpen: boolean;
  prestacaoId: number;
  servicoId: number;
  onClose: () => void;
  onSuccess: () => void;
}

const NewItemPrestacaoModal: React.FC<NewItemPrestacaoModal> = ({
  isOpen,
  prestacaoId,
  servicoId,
  onClose,
  onSuccess,
}) => {
  const [quantidade, setQuantidade] = useState("");
  const [itemId, setItemId] = useState("");

  const [isSuccessAlertOpen, setIsSuccessAlertOpen] = useState(false);
  const [isErrorAlertOpen, setIsErrorAlertOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) {

    }
  }, [isOpen]);

  const handleAddItemToPrestacao = async () => {
    try {
      const userToken = localStorage.getItem("USER_TOKEN");
      await addItemToPrestacao({
        data: {
            itemId,
            quantidade,
            retornado: false
        },
        prestacaoId,
        servicoId,
        userToken,
      });
      onSuccess();
      setIsSuccessAlertOpen(true);
      onClose();
    } catch (error) {
      console.error("Erro ao criar endereco:", error);
      setIsErrorAlertOpen(true);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Criar Novo Endereço</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex direction="column">
            <FormControl mb={3}>
              <Text>Rua</Text>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <FaSign color="gray.300" />
                </InputLeftElement>
                <Input
                  placeholder="ItemId"
                  name="ItemId"
                  value={itemId}
                  onChange={(e) => setItemId(e.target.value)}
                />
              </InputGroup>
            </FormControl>
            <FormControl mb={3}>
              <Text>Quantidade</Text>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <FaSign color="gray.300" />
                </InputLeftElement>
                <Input
                  placeholder="Quantidade"
                  name="Quantidade"
                  value={quantidade}
                  onChange={(e) => setQuantidade(e.target.value)}
                />
              </InputGroup>
            </FormControl>
            <Button colorScheme="blue" onClick={handleAddItemToPrestacao}>
              Criar Endereço
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

export default NewItemPrestacaoModal;
