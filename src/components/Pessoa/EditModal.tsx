import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  Input,
  Box,
} from "@chakra-ui/react";
import { Pessoa } from "../../Types/Pessoa";
import { editPerson } from "./helpers/api";

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  person: Pessoa | null;
  onSuccess: () => void;
}

const EditModal: React.FC<EditModalProps> = ({
  isOpen,
  onClose,
  person,
  onSuccess,
}) => {
  const [editedPerson, setEditedPerson] = useState<Pessoa | null>(person);

  const handleEditPerson = async () => {
    if (editedPerson) {
      try {
        const userToken = localStorage.getItem("USER_TOKEN");
        await editPerson(editedPerson, userToken);
        onSuccess();
        onClose();
      } catch (error) {
        console.error("Erro ao editar pessoa:", error);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (editedPerson) {
      setEditedPerson({
        ...editedPerson,
        [name]: value,
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Editar Pessoa</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl mb={4}>
            <Box mb={2}>Nome</Box>
            <Input
              placeholder="Nome"
              name="nome"
              value={editedPerson?.nome || ""}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl mb={4}>
            <Box mb={2}>Email</Box>
            <Input
              placeholder="Email"
              name="email"
              value={editedPerson?.email || ""}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl mb={4}>
            <Box mb={2}>Telefone</Box>
            <Input
              placeholder="Telefone"
              name="telefone"
              value={editedPerson?.telefone || ""}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl mb={4}>
            <Box mb={2}>Cadastro</Box>
            <Input
              placeholder="Cadastro"
              name="cadastro"
              value={editedPerson?.cadastro || ""}
              onChange={handleInputChange}
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleEditPerson}>
            Confirmar
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancelar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditModal;
