import React, { useState } from "react";
import { editItem } from "./helpers/api";
import {
  Box,
  Button,
  Flex,
  FormControl,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text
} from "@chakra-ui/react";
import ErrorAlert from "../error/ErrorAlert";
import { FaUser } from "react-icons/fa";

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
            quantidade
          }
        });
        onEditSuccess();
        onClose();
      } catch (error) {
        console.error("Erro ao editar pessoa:", error);
        setIsErrorAlertOpen(true);
      }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Criar Nova Categoria</ModalHeader>
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
                  onChange={(e) =>
                    setNome(e.target.value)
                  }
                />
            </InputGroup>
            </FormControl>
            <FormControl mb={3}>
                <Text>Descrição:</Text>
              <InputGroup>
                <Input
                  placeholder="Descrição"
                  name="descricao"
                  value={descricao}
                  onChange={(e) =>
                    setDescricao(e.target.value)
                  }
                />
            </InputGroup>
            </FormControl>
            <FormControl mb={3}>
                <Text>Valor:</Text>
              <InputGroup>
                <Input
                  placeholder="Valor"
                  name="valor"
                  value={valor}
                  onChange={(e) =>
                    setValor(Number(e.target.value))
                  }
                />
            </InputGroup>
            </FormControl>
            <FormControl mb={3}>
            <Text>Quantidade:</Text>
              <InputGroup>
                <Input
                  placeholder="Quantidade"
                  name="quantidade"
                  value={quantidade}
                  onChange={(e) =>
                    setQuantidade(Number(e.target.value))
                  }
                />
              </InputGroup>
            </FormControl>
            <Button colorScheme="blue" onClick={handleEditItem}>
              Criar Item
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