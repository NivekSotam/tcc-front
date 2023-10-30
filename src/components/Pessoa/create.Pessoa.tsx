import React, { useState } from "react";
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
} from "@chakra-ui/react";
import { createPerson } from "./helpers/api";

interface NewPersonModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const NewPersonModal: React.FC<NewPersonModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [newPersonData, setNewPersonData] = useState({
    nome: "",
    email: "",
    telefone: "",
    cadastro: "",
  });
  const [isSuccessAlertOpen, setIsSuccessAlertOpen] = useState(false);

  const handleCreatePerson = async () => {
    try {
      const userToken = localStorage.getItem("USER_TOKEN");
      await createPerson(newPersonData, userToken);
      onSuccess();
      setIsSuccessAlertOpen(true);
      onClose();
    } catch (error) {
      console.error("Erro ao criar pessoa:", error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Criar Nova Pessoa</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex direction="column">
            <Input
              placeholder="Nome"
              name="nome"
              value={newPersonData.nome}
              onChange={(e) =>
                setNewPersonData({ ...newPersonData, nome: e.target.value })
              }
              mb={3}
            />
            <Input
              placeholder="Email"
              name="email"
              value={newPersonData.email}
              onChange={(e) =>
                setNewPersonData({ ...newPersonData, email: e.target.value })
              }
              mb={3}
            />
            <Input
              placeholder="Telefone"
              name="telefone"
              value={newPersonData.telefone}
              onChange={(e) =>
                setNewPersonData({ ...newPersonData, telefone: e.target.value })
              }
              mb={3}
            />
            <Input
              placeholder="Cadastro"
              name="cadastro"
              value={newPersonData.cadastro}
              onChange={(e) =>
                setNewPersonData({ ...newPersonData, cadastro: e.target.value })
              }
              mb={3}
            />
            <Button colorScheme="blue" onClick={handleCreatePerson}>
              Criar Pessoa
            </Button>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default NewPersonModal;
