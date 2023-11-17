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
import { createServico } from "./helpers/api";
import ErrorAlert from "../error/ErrorAlert";

interface NewServicoModal {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const NewServicoModal: React.FC<NewServicoModal> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [nome, setNome] = useState("");
  const [isSuccessAlertOpen, setIsSuccessAlertOpen] = useState(false);
  const [isErrorAlertOpen, setIsErrorAlertOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setNome("");
    }
  }, [isOpen]);

  const handleCreatePerson = async () => {
    try {

      const userToken = localStorage.getItem("USER_TOKEN");
      await createServico ({
        data: {
          nome
        },
        userToken
        });
      onSuccess();
      setIsSuccessAlertOpen(true);
      onClose();
    } catch (error) {
      console.error("Erro ao criar servico:", error);
      setIsErrorAlertOpen(true);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Criar Novo Servico</ModalHeader>
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
                  value={nome}
                  onChange={(e) =>
                    setNome(e.target.value)
                  }
                />
              </InputGroup>
            </FormControl>
            <Button colorScheme="blue" onClick={handleCreatePerson}>
              Criar Servico
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

export default NewServicoModal;
