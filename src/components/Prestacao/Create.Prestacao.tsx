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
import { FaUser } from "react-icons/fa";
import { createPrestacao } from "./helpers/api";
import ErrorAlert from "../error/ErrorAlert";

interface NewPrestacaoModal {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const NewPrestacaoModal: React.FC<NewPrestacaoModal> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [descricao, setDescricao] = useState<any>(null);
  const [colaborador, setColaborador] = useState("");
  const [clienteFornecedor, setClienteFornecedor] = useState("");
  const [isSuccessAlertOpen, setIsSuccessAlertOpen] = useState(false);
  const [isErrorAlertOpen, setIsErrorAlertOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setDescricao(null);
      setClienteFornecedor("");
      setColaborador("");
    }
  }, [isOpen]);

  const handleCreatePrestacao = async () => {
    try {
      const userToken = localStorage.getItem("USER_TOKEN");
      await createPrestacao({
        data: {
          descricao,
          colaborador,
          clienteFornecedor,
        },
        userToken,
      });
      onSuccess();
      setIsSuccessAlertOpen(true);
      onClose();
    } catch (error) {
      console.error("Erro ao criar Prestacao:", error);
      setIsErrorAlertOpen(true);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Criar Nova Prestacao</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex direction="column">
            {/* <FormControl mb={3}>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <FaUser color="gray.300" />
                </InputLeftElement>
                <Input
                  placeholder="Descricao"
                  name="descricao"
                  value={descricao}
                  onChange={(e) =>
                    setDescricao(e.target.value)
                  }
                />
              </InputGroup>
            </FormControl> */}
            <FormControl mb={3}>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <FaUser color="gray.300" />
                </InputLeftElement>
                <Input
                  placeholder="Colaborador"
                  name="colaborador"
                  value={colaborador}
                  onChange={(e) => setColaborador(e.target.value)}
                />
              </InputGroup>
            </FormControl>
            <FormControl mb={3}>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <FaUser color="gray.300" />
                </InputLeftElement>
                <Input
                  placeholder="ClienteFornecedor"
                  name="clienteFornecedor"
                  value={clienteFornecedor}
                  onChange={(e) => setClienteFornecedor(e.target.value)}
                />
              </InputGroup>
            </FormControl>
            <Button colorScheme="blue" onClick={handleCreatePrestacao}>
              Criar Prestacao
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

export default NewPrestacaoModal;
