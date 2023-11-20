import React, { useState } from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import ErrorAlert from "../error/ErrorAlert";
import {
  FaChevronDown,
  FaEnvelope,
  FaIdCard,
  FaPhone,
  FaUser,
} from "react-icons/fa";
import { editEndereco } from "./helpers/api";

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  enderecoId: number | null;
  onEditSuccess: () => void;
}

const EditModal: React.FC<EditModalProps> = ({
  isOpen,
  onClose,
  enderecoId,
  onEditSuccess,
}) => {
  const [rua, setRua] = useState("");
  const [numero, setNumero] = useState("");
  const [bairro, setBairro] = useState("");
  const [cep, setCep] = useState("");
  const [tipo, setTipo] = useState("R");
  const [complemento, setComplemento] = useState("");
  const [cidade, setCidade] = useState("");

  const [isErrorAlertOpen, setIsErrorAlertOpen] = useState(false);

  const handleEditEndereco = async () => {
    try {
      const userToken = localStorage.getItem("USER_TOKEN");
      await editEndereco({
        enderecoId,
        userToken,
        data: {
          rua,
          numero,
          bairro,
          cep,
          tipo,
          complemento,
          cidade,
        },
      });
      onEditSuccess();
      onClose();
    } catch (error) {
      console.error("Erro ao editar endereco:", error);
      setIsErrorAlertOpen(true);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Editar Endereço</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex direction="column">
            <FormControl mb={3}>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <FaUser color="gray.300" />
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
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <FaUser color="gray.300" />
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
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <FaUser color="gray.300" />
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
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <FaUser color="gray.300" />
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
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <FaUser color="gray.300" />
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
            <Button colorScheme="blue" onClick={handleEditEndereco}>
              Editar Endereço
            </Button>
          </Flex>
        </ModalBody>
      </ModalContent>

      <ErrorAlert
        isOpen={isErrorAlertOpen}
        onClose={() => setIsErrorAlertOpen(false)}
        alertTitle="Não foi possível editar o endereço."
        alertDescription="Reveja as permissões necessárias ou verifique os dados."
      />
    </Modal>
  );
};

export default EditModal;
