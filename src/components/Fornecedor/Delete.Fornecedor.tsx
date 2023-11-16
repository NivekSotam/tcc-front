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
import { deleteFornecedor } from "./helpers/api";
import ErrorAlert from "../error/ErrorAlert";

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  fornecedorId: number | null;
  onDeleteSuccess: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  isOpen,
  onClose,
  fornecedorId,
  onDeleteSuccess,
}) => {
  const [isErrorAlertOpen, setIsErrorAlertOpen] = useState(false);

  const handleDeleteFornecedor = async () => {
    if (fornecedorId) {
      try {
        const userToken = localStorage.getItem("USER_TOKEN");
        await deleteFornecedor({fornecedorId, userToken});
        onDeleteSuccess();
        onClose();
      } catch (error) {
        console.error("Erro ao excluir categoria:", error);
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
        <ModalBody>Tem certeza que deseja excluir este fornecedor?</ModalBody>
        <ModalFooter>
          <Button colorScheme="red" mr={3} onClick={handleDeleteFornecedor}>
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
