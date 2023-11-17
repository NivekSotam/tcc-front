import React, { useState } from "react";
import { editServico } from "./helpers/api";
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
import ErrorAlert from "../error/ErrorAlert";

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  servicoId: number | null;
  onEditSuccess: () => void;
}

const EditModal: React.FC<EditModalProps> = ({
  isOpen,
  onClose,
  servicoId,
  onEditSuccess,
}) => {
  const [nome, setNome] = useState<string>("");
  const [isErrorAlertOpen, setIsErrorAlertOpen] = useState(false);

  const handleEditPerson = async () => {
      try {
        const userToken = localStorage.getItem("USER_TOKEN");
        await editServico({
          servicoId,
          userToken,
          data: {
            nome,
          }
        });
        onEditSuccess();
        onClose();
      } catch (error) {
        console.error("Erro ao editar servico:", error);
        setIsErrorAlertOpen(true);
      }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Editar Servico</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl mb={4}>
            <Box mb={2}>Novo Nome</Box>
            <Input
              placeholder="Novo Nome"
              name="nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
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
