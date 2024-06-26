import React, { useState, useEffect } from "react";
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
  InputLeftElement,
  InputGroup,
} from "@chakra-ui/react";
import { FaUser, FaEnvelope, FaPhone, FaIdCard } from "react-icons/fa";
import { editPerson, UpdatePerson } from "./helpers/api";
import ErrorAlert from "../error/ErrorAlert";

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
  const [nome, setNome] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [telefone, setTelefone] = useState<string>("");
  const [cadastro, setCadastro] = useState<string>("");
  const [registro, setRegistro] = useState<string>("");
  const [isErrorAlertOpen, setIsErrorAlertOpen] = useState(false);

  const handleEditPerson = async () => {
    try {
      const userToken = localStorage.getItem("USER_TOKEN");
      await editPerson({
        personId,
        userToken,
        updatedPersonData: {
          nome,
          email,
          telefone,
          cadastro,
          registro,
        },
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
        <ModalHeader>Editar Pessoa</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl mb={4}>
            <Box mb={2}>Nome</Box>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <FaUser color="gray.300" />
              </InputLeftElement>
              <Input
                placeholder="Novo Nome"
                name="nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
            </InputGroup>
          </FormControl>
          <FormControl mb={4}>
            <Box mb={2}>Email</Box>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <FaEnvelope color="gray.300" />
              </InputLeftElement>
              <Input
                placeholder="Novo Email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </InputGroup>
          </FormControl>
          <FormControl mb={4}>
            <Box mb={2}>Telefone</Box>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <FaPhone color="gray.300" />
              </InputLeftElement>
              <Input
                placeholder="Novo Telefone"
                name="telefone"
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
              />
            </InputGroup>
          </FormControl>
          <FormControl mb={4}>
            <Box mb={2}>Cadastro</Box>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <FaIdCard color="gray.300" />
              </InputLeftElement>
              <Input
                placeholder="Novo Cadastro"
                name="cadastro"
                value={cadastro}
                onChange={(e) => setCadastro(e.target.value)}
              />
            </InputGroup>
          </FormControl>
          <FormControl mb={4}>
            <Box mb={2}>Registro</Box>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <FaIdCard color="gray.300" />
              </InputLeftElement>
              <Input
                placeholder="Novo Registro"
                name="registro"
                value={registro}
                onChange={(e) => setRegistro(e.target.value)}
              />
            </InputGroup>
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
