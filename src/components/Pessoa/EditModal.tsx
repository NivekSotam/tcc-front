import React, { useState, useEffect } from "react";
import { getPersonById, editPerson } from "./helpers/api";
import {
  Box,
  Button,
  FormControl,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { Pessoa } from "../../Types/Pessoa";

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  personId: string | null;
  onEditSuccess: () => void;
}

const EditModal: React.FC<EditModalProps> = ({
  isOpen,
  onClose,
  personId,
  onEditSuccess,
}) => {
  const [editedPerson, setEditedPerson] = useState<Pessoa | null>(null);

  useEffect(() => {
    const fetchPersonDetails = async () => {
      if (personId) {
        try {
          const userToken = localStorage.getItem("USER_TOKEN");
          const response = await getPersonById(personId, userToken);
          setEditedPerson(response.data.pessoa[0]);
        } catch (error) {
          console.error("Erro ao buscar detalhes da pessoa:", error);
        }
      }
    };

    fetchPersonDetails();
  }, [isOpen, personId]);

  const handleEditPerson = async () => {
    if (editedPerson) {
      try {
        const userToken = localStorage.getItem("USER_TOKEN");
        console.log("Dados a serem enviados:", editedPerson);
        await editPerson({
          personId,
          updatedPersonData: editedPerson,
          userToken,
        });
        onEditSuccess();
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
