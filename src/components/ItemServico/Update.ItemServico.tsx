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
  Text,
  Checkbox,
} from "@chakra-ui/react";
import {
  FaSign,
} from "react-icons/fa";
import ErrorAlert from "../error/ErrorAlert";
import { addItemToPrestacao, editItemServico } from "./helpers/api";

interface EditItemPrestacaoModal {
  isOpen: boolean;
  prestacaoId: number | null;
  servicoId: number | null;
  itemServicoId: number| null;
  onClose: () => void;
  onSuccess: () => void;
}

const EditItemPrestacaoModal: React.FC<EditItemPrestacaoModal> = ({
  isOpen,
  prestacaoId,
  servicoId,
  itemServicoId,
  onClose,
  onSuccess,
}) => {
  const [quantidade, setQuantidade] = useState("");
  const [itemId, setItemId] = useState("");
  const [retornado, setRetornado] = useState<any>(true);

  const [isSuccessAlertOpen, setIsSuccessAlertOpen] = useState(false);
  const [isErrorAlertOpen, setIsErrorAlertOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) {

    }
  }, [isOpen]);

  const handleAddItemToPrestacao = async () => {
    try {
      const userToken = localStorage.getItem("USER_TOKEN");
      await editItemServico({
        data: {
            itemId,
            quantidade,
            retornado
        },
        prestacaoId,
        servicoId,
        itemServicoId,
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
              <Text>Item</Text>
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
            <FormControl mb={3}>
              <Text>Retornado</Text>
              <InputGroup>
                {/*<InputLeftElement pointerEvents="none">
                  <FaSign color="gray.300" />
                </InputLeftElement>
                <Input
                  placeholder="Retornado"
                  name="Retornado"
                  value={retornado}
                  onChange={(e) => setRetornado(Boolean(e.target.value))}
                /> */}
                <Checkbox
                  onChange={() => {
                    setRetornado(!retornado)
                    console.log(retornado)
                  }}
                />
              </InputGroup>
            </FormControl>
            <Button colorScheme="blue" onClick={handleAddItemToPrestacao}>
              Aplicar Mudanças
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

export default EditItemPrestacaoModal;
