import React, { useState } from "react";
import { editPrestacao } from "./helpers/api";
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
  prestacaoId: number | null;
  onEditSuccess: () => void;
}

const EditModal: React.FC<EditModalProps> = ({
  isOpen,
  onClose,
  prestacaoId,
  onEditSuccess,
}) => {
  const [isErrorAlertOpen, setIsErrorAlertOpen] = useState(false);

  const [descricao, setDescricao] = useState<any>(null);
  const [colaborador, setColaborador] = useState("");
  const [clienteFornecedor, setClienteFornecedor] = useState("");

  const handleEditPerson = async () => {
      try {
        const userToken = localStorage.getItem("USER_TOKEN");
        await editPrestacao({
          prestacaoId,
          userToken,
          data: {
            descricao,
            colaborador,
            clienteFornecedor
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
            <Box mb={2}>Novo Descriçõ</Box>
            <Input
              placeholder="Nova descrição"
              name="descriçõ"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
            />
          </FormControl>
        </ModalBody>
        <ModalBody>
          <FormControl mb={4}>
            <Box mb={2}>Novo Cliente</Box>
            <Input
              placeholder="Novo Cliente"
              name="cliente"
              value={clienteFornecedor}
              onChange={(e) => setClienteFornecedor(e.target.value)}
            />
          </FormControl>
        </ModalBody>
        <ModalBody>
          <FormControl mb={4}>
            <Box mb={2}>Novo Colaborador</Box>
            <Input
              placeholder="Novo Colaborador"
              name="Colaborador"
              value={colaborador}
              onChange={(e) => setColaborador(e.target.value)}
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
