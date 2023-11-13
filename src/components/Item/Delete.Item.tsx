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
import { deleteItem } from "./helpers/api";
import ErrorAlert from "../error/ErrorAlert";

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  itemId: number | null;
  onDeleteSuccess: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  isOpen,
  onClose,
  itemId,
  onDeleteSuccess,
}) => {
  const [isErrorAlertOpen, setIsErrorAlertOpen] = useState(false);

  const handleDeleteItem = async () => {
    if (itemId) {
      try {
        const userToken = localStorage.getItem("USER_TOKEN");
        await deleteItem({itemId, userToken});
        onDeleteSuccess();
        onClose();
      } catch (error) {
        console.error("Erro ao excluir item:", error);
        setIsErrorAlertOpen(true);
      }
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Confirmação de Exclusão</ModalHeader>
        <ModalCloseButton />
        <ModalBody>Tem certeza que deseja excluir este item?</ModalBody>
        <ModalFooter>
          <Button colorScheme="red" mr={3} onClick={handleDeleteItem}>
            Confirmar
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancelar
          </Button>
        </ModalFooter>
      </ModalContent>
      <ErrorAlert
        isOpen={isErrorAlertOpen}
        onClose={() => setIsErrorAlertOpen(false)}
        alertTitle="Não foi possível fazer completar a operação."
        alertDescription="Reveja as permissões necessárias ou verifique os dados."
      />
    </Modal>
  );
};

export default DeleteModal;
