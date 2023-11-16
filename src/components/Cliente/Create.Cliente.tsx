import React, { useEffect, useState } from "react";
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
  FormControl,
  InputLeftElement,
  InputGroup,
  Box,
} from "@chakra-ui/react";
import { FaEnvelope, FaIdCard, FaPhone, FaUser } from "react-icons/fa";
import { createCliente} from "./helpers/api";
import ErrorAlert from "../error/ErrorAlert";
import { formatCpfCnpj } from "../../helpers/format-helpers";

interface NewClienteModal {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const NewClienteModal: React.FC<NewClienteModal> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [telefone, setTelefone] = useState("");
    const [cadastro, setCadastro] = useState("");
    const [registro, setRegistro] = useState<string>();
    const [isCliente, setIsCliente] = useState<boolean>(true);

  const [isSuccessAlertOpen, setIsSuccessAlertOpen] = useState(false);
  const [isErrorAlertOpen, setIsErrorAlertOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setNome("");
    }
  }, [isOpen]);

  const handleCreatePerson = async () => {
    try {
      console.log(nome);
      const userToken = localStorage.getItem("USER_TOKEN");
      await createCliente({
        data: {
          nome,
          email,
          telefone,
          cadastro,
          registro,
          isCliente
        },
        userToken
        });
      onSuccess();
      setIsSuccessAlertOpen(true);
      onClose();
    } catch (error) {
      console.error("Erro ao criar pessoa:", error);
      setIsErrorAlertOpen(true);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>Criar Novo Cliente</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <Flex direction="column">
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
                onChange={(e) =>
                  setNome(e.target.value)
                }
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
                onChange={(e) =>
                  setEmail(e.target.value)
                }
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
                onChange={(e) =>
                  setTelefone(e.target.value)
                }
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
                onChange={(e) =>
                  setCadastro(e.target.value)
                }
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
                onChange={(e) =>
                  setRegistro(e.target.value)
                }
              />
            </InputGroup>
          </FormControl>
          <Button colorScheme="blue" onClick={handleCreatePerson}>
            Criar Cliente
          </Button>
        </Flex>
      </ModalBody>
    </ModalContent>
    <ErrorAlert
      isOpen={isErrorAlertOpen}
      onClose={() => setIsErrorAlertOpen(false)}
      alertTitle="Não foi possível fazer o cadastro."
      alertDescription="Reveja as permissões necessárias ou verifique os dados."
    />
  </Modal>
  );
};

export default NewClienteModal;
