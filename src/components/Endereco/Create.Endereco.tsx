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
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
} from "@chakra-ui/react";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaIdCard,
  FaChevronDown,
  FaSign,
} from "react-icons/fa";
import { createEndereco } from "./helpers/api";
import ErrorAlert from "../error/ErrorAlert";

interface NewEnderecoModal {
  isOpen: boolean;
  pessoaId: number;
  onClose: () => void;
  onSuccess: () => void;
}

const NewEnderecoModal: React.FC<NewEnderecoModal> = ({
  isOpen,
  pessoaId,
  onClose,
  onSuccess,
}) => {
  const [rua, setRua] = useState("");
  const [numero, setNumero] = useState("");
  const [bairro, setBairro] = useState("");
  const [cep, setCep] = useState("");
  const [tipo, setTipo] = useState("R");
  const [complemento, setComplemento] = useState("");
  const [cidade, setCidade] = useState("");

  const [isSuccessAlertOpen, setIsSuccessAlertOpen] = useState(false);
  const [isErrorAlertOpen, setIsErrorAlertOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setRua("");
      setNumero("");
      setBairro("");
      setCep("");
      setTipo("R");
      setComplemento("");
      setCidade("");
    }
  }, [isOpen]);

  const handleCreateEndereco = async () => {
    try {
      const userToken = localStorage.getItem("USER_TOKEN");
      await createEndereco({
        data: {
          rua,
          numero,
          bairro,
          cep,
          tipo,
          complemento,
          cidade,
        },
        pessoaId,
        userToken,
      });
      onSuccess();
      setIsSuccessAlertOpen(true);
      onClose();
    } catch (error) {
      console.error("Erro ao criar endereco:", error);
      setIsErrorAlertOpen(true);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Criar Novo Endereço</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex direction="column">
            <FormControl mb={3}>
              <Text>Rua</Text>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <FaSign color="gray.300" />
                </InputLeftElement>
                <Input
                  placeholder="Rua"
                  name="Rua"
                  value={rua}
                  onChange={(e) => setRua(e.target.value)}
                />
              </InputGroup>
            </FormControl>
            <FormControl mb={3}>
              <Text>Numero</Text>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <FaSign color="gray.300" />
                </InputLeftElement>
                <Input
                  placeholder="Numero"
                  name="Numero"
                  value={numero}
                  onChange={(e) => setNumero(e.target.value)}
                />
              </InputGroup>
            </FormControl>
            <FormControl mb={3}>
              <Text>Bairro</Text>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <FaSign color="gray.300" />
                </InputLeftElement>
                <Input
                  placeholder="Bairro"
                  name="Bairro"
                  value={bairro}
                  onChange={(e) => setBairro(e.target.value)}
                />
              </InputGroup>
            </FormControl>

            <FormControl mb={3}>
              <Text>CEP</Text>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <FaSign color="gray.300" />
                </InputLeftElement>
                <Input
                  placeholder="Cep"
                  name="Cep"
                  value={cep}
                  onChange={(e) => setCep(e.target.value)}
                />
              </InputGroup>
            </FormControl>
            <FormControl mb={3}>
              <Text>Cidade</Text>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <FaSign color="gray.300" />
                </InputLeftElement>
                <Input
                  placeholder="Cidade"
                  name="Cidade"
                  value={cidade}
                  onChange={(e) => setCidade(e.target.value)}
                />
              </InputGroup>
            </FormControl>
            <FormControl mb={3}>
              <Menu>
                <MenuButton as={Button} rightIcon={<FaChevronDown />}>
                  {tipo === "R" ? "Rural" : "Urbano"}
                </MenuButton>
                <MenuList>
                  <MenuItem onClick={() => setTipo("R")}>Rural</MenuItem>
                  <MenuItem onClick={() => setTipo("U")}>Urbano</MenuItem>
                </MenuList>
              </Menu>
            </FormControl>
            <Button colorScheme="blue" onClick={handleCreateEndereco}>
              Criar Endereço
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

export default NewEnderecoModal;
