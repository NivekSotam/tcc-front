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
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import ErrorAlert from "../error/ErrorAlert";
import {
    FaCheck,
  FaChevronDown,
  FaEnvelope,
  FaIdCard,
  FaPhone,
  FaUser,
} from "react-icons/fa";
import { editServicoPrestacao } from "./helpers/api";
import { formatCurrency } from "../../helpers/format-helpers";

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
    const [isPago, setIsPago] = useState<any>(false);
    const [status, setStatus] = useState<any>(false);

  const [isErrorAlertOpen, setIsErrorAlertOpen] = useState(false);

  const handleCreateServicoPrestacao = async () => {
    try {
      const userToken = localStorage.getItem("USER_TOKEN");
      await editServicoPrestacao({
        prestacaoId,
        userToken,
        data: {
          isPago: JSON.parse(isPago),
          status: JSON.parse(status)
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
        <ModalHeader>Atualizar Serviço</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex direction="column">
            <FormControl mb={3}>
                <Text>Serviço pago?</Text>
              <InputGroup>
                <Input
                  placeholder="IsPago"
                  name="IsPago"
                  value={isPago}
                  onChange={(e) => setIsPago(e.target.value)}
                />
              </InputGroup>
            </FormControl>
            <FormControl mb={3}>
                <Text>Serviço Pronto?</Text>
              <InputGroup>
                <Input
                  placeholder="status"
                  name="status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                />
              </InputGroup>
            </FormControl>
            <Button colorScheme="blue" onClick={handleCreateServicoPrestacao}>
              Editar Serviço
            </Button>
          </Flex>
        </ModalBody>
      </ModalContent>
      <ErrorAlert
        isOpen={isErrorAlertOpen}
        onClose={() => setIsErrorAlertOpen(false)}
        alertTitle="Não foi possível editar o serviço."
        alertDescription="Reveja as permissões necessárias ou verifique os dados."
      />
    </Modal>
  );
};

export default EditModal;
