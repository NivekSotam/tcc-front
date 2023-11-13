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
  Text
} from "@chakra-ui/react";
import { FaUser, FaEnvelope, FaPhone, FaIdCard } from "react-icons/fa";
import { createItem } from "./helpers/api";
import ErrorAlert from "../error/ErrorAlert";

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
  const [valor, setValor] = useState<number>(0);
  const [descricao, setDescricao] = useState("");
  const [quantidade, setQuantidade] = useState<number>(0);
  const [isSuccessAlertOpen, setIsSuccessAlertOpen] = useState(false);
  const [isErrorAlertOpen, setIsErrorAlertOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setNome("");
      setValor(0);
      setDescricao("");
      setQuantidade(0);

    }
  }, [isOpen]);

  const handleCreatePerson = async () => {
    try {
      console.log(nome);
      const userToken = localStorage.getItem("USER_TOKEN");
      await createItem({
        data: {
          nome,
          descricao,
          valorUnitario: valor,
          quantidade
        },
        userToken
        });
      onSuccess();
      setIsSuccessAlertOpen(true);
      onClose();
    } catch (error) {
      console.error("Erro ao criar pessoa:", error);
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
