// DeleteModal.tsx
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
} from "@chakra-ui/react";
import { deletePerson } from "./helpers/api";

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  personId: string | null;
  onDeleteSuccess: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  isOpen,
  onClose,
  personId,
  onDeleteSuccess,
}) => {
  const handleDeletePerson = async () => {
    if (personId) {
      try {
        const userToken = localStorage.getItem("USER_TOKEN");
        await deletePerson(personId, userToken);
        onDeleteSuccess();
        onClose();
      } catch (error) {
        console.error("Erro ao excluir pessoa:", error);
      }
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Confirmação de Exclusão</ModalHeader>
        <ModalCloseButton />
        <ModalBody>Tem certeza que deseja excluir esta pessoa?</ModalBody>
        <ModalFooter>
          <Button colorScheme="red" mr={3} onClick={handleDeletePerson}>
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

export default DeleteModal;
