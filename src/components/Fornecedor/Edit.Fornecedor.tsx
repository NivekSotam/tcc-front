import React, { useState } from "react";
import { editFornecedor } from "./helpers/api";
import {
  Box,
  Button,
  FormControl,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import ErrorAlert from "../error/ErrorAlert";
import { FaEnvelope, FaIdCard, FaPhone, FaUser } from "react-icons/fa";
import { formatCpfCnpj, getCleanedCpfCnpj } from "../../helpers/format-helpers";

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  fornecedorId: number | null;
  onEditSuccess: () => void;
}

const EditModal: React.FC<EditModalProps> = ({
  isOpen,
  onClose,
  fornecedorId,
  onEditSuccess,
}) => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cadastro, setCadastro] = useState("");
  const [registro, setRegistro] = useState("");
  const [isErrorAlertOpen, setIsErrorAlertOpen] = useState(false);

  const handleEditFornecedor = async () => {
    try {
      const userToken = localStorage.getItem("USER_TOKEN");
      await editFornecedor({
        fornecedorId,
        userToken,
        data: {
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
      console.error("Erro ao editar fornecedor:", error);
      setIsErrorAlertOpen(true);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Editar Fornecedor</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl mb={3}>
            <Box mb={2}>Nome</Box>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <FaUser color="gray.300" />
              </InputLeftElement>
              <Input
                placeholder="Nome"
                name="nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
            </InputGroup>
          </FormControl>
          <FormControl mb={3}>
            <Box mb={2}>Email</Box>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <FaEnvelope color="gray.300" />
              </InputLeftElement>
              <Input
                placeholder="Email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </InputGroup>
          </FormControl>
          <FormControl mb={3}>
            <Box mb={2}>Telefone</Box>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <FaPhone color="gray.300" />
              </InputLeftElement>
              <Input
                placeholder="Telefone"
                name="telefone"
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
              />
            </InputGroup>
          </FormControl>
          <FormControl mb={3}>
            <Box mb={2}>Cadastro</Box>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <FaIdCard color="gray.300" />
              </InputLeftElement>
              <Input
                placeholder="CPF/CNPJ"
                name="cadastro"
                value={formatCpfCnpj(cadastro)}
                onChange={(e) => setCadastro(getCleanedCpfCnpj(e.target.value))}
              />
            </InputGroup>
          </FormControl>
          <FormControl mb={3}>
            <Box mb={2}>Registro</Box>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <FaIdCard color="gray.300" />
              </InputLeftElement>
              <Input
                placeholder="RG/Insc. Municipal"
                name="registro"
                value={registro}
                onChange={(e) => setRegistro(getCleanedCpfCnpj(e.target.value))}
              />
            </InputGroup>
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleEditFornecedor}>
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
