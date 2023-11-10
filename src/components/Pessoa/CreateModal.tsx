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
} from "@chakra-ui/react";
import { FaUser, FaEnvelope, FaPhone, FaIdCard } from "react-icons/fa";
import { createPerson } from "./helpers/api";
import {
  formatCpfCnpj,
  removeSpecialChars,
} from "../../helpers/format-helpers";
import ErrorAlert from "../error/ErrorAlert";

interface NewPersonModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const NewPersonModal: React.FC<NewPersonModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [newPersonData, setNewPersonData] = useState({
    nome: "",
    email: "",
    telefone: "",
    cadastro: "",
  });
  const [isSuccessAlertOpen, setIsSuccessAlertOpen] = useState(false);
  const [isErrorAlertOpen, setIsErrorAlertOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setNewPersonData({
        nome: "",
        email: "",
        telefone: "",
        cadastro: "",
      });
    }
  }, [isOpen]);

  const handleCreatePerson = async () => {
    try {
      const userToken = localStorage.getItem("USER_TOKEN");
      const cleanedCadastro = removeSpecialChars(newPersonData.cadastro);

      await createPerson(
        { ...newPersonData, cadastro: cleanedCadastro },
        userToken
        );
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
        <ModalHeader>Criar Nova Pessoa</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex direction="column">
            <FormControl mb={3}>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <FaUser color="gray.300" />
                </InputLeftElement>
                <Input
                  placeholder="Nome"
                  name="nome"
                  value={newPersonData.nome}
                  onChange={(e) =>
                    setNewPersonData({ ...newPersonData, nome: e.target.value })
                  }
                />
              </InputGroup>
            </FormControl>
            <FormControl mb={3}>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <FaEnvelope color="gray.300" />
                </InputLeftElement>
                <Input
                  placeholder="Email"
                  name="email"
                  value={newPersonData.email}
                  onChange={(e) =>
                    setNewPersonData({
                      ...newPersonData,
                      email: e.target.value,
                    })
                  }
                />
              </InputGroup>
            </FormControl>
            <FormControl mb={3}>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <FaPhone color="gray.300" />
                </InputLeftElement>
                <Input
                  placeholder="Telefone"
                  name="telefone"
                  value={newPersonData.telefone}
                  onChange={(e) =>
                    setNewPersonData({
                      ...newPersonData,
                      telefone: e.target.value,
                    })
                  }
                />
              </InputGroup>
            </FormControl>
            <FormControl mb={3}>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <FaIdCard color="gray.300" />
                </InputLeftElement>
                <Input
                  placeholder="Cadastro"
                  name="cadastro"
                  value={formatCpfCnpj(newPersonData.cadastro)}
                  onChange={(e) =>
                    setNewPersonData({
                      ...newPersonData,
                      cadastro: e.target.value,
                    })
                  }
                />
              </InputGroup>
            </FormControl>
            <Button colorScheme="blue" onClick={handleCreatePerson}>
              Criar Pessoa
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

export default NewPersonModal;
