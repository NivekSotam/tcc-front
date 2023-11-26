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
  Checkbox, // Importando o Checkbox
  Text,
} from "@chakra-ui/react";
import { FaDollarSign, FaFolder, FaCalendar } from "react-icons/fa";
import { createServicoPrestacao } from "./helpers/api";
import ErrorAlert from "../error/ErrorAlert";
import { formatCurrency } from "../../helpers/format-helpers";

interface NewModal {
  isOpen: boolean;
  prestacaoId: number;
  onClose: () => void;
  onSuccess: () => void;
}

const NewModal: React.FC<NewModal> = ({
  isOpen,
  prestacaoId,
  onClose,
  onSuccess,
}) => {
  const [valorCobrado, setValorCobrado] = useState<any>();
  const [servicoId, setServicoId] = useState<number>(0);
  const [servico, setServico] = useState<string>("");
  const [dataInicio, setDataInicio] = useState<any>();
  const [dataFim, setDataFim] = useState<any>();
  const [isPago, setIsPago] = useState(false); // Inicializando como false
  const [status, setStatus] = useState<any>(false);

  const [isSuccessAlertOpen, setIsSuccessAlertOpen] = useState(false);
  const [isErrorAlertOpen, setIsErrorAlertOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setValorCobrado(0);
      setServicoId(0);
      setServico("Escolha o serviço a ser prestado");
      setIsPago(false);
      setStatus(false);
    }
  }, [isOpen]);

  const handleCreateServicoPrestacao = async () => {
    try {
      const userToken = localStorage.getItem("USER_TOKEN");
      await createServicoPrestacao({
        data: {
          valorCobrado: formatCurrency(valorCobrado),
          servicoId,
          dataInicio: new Date(dataInicio),
          dataFim: new Date(dataFim),
          isPago,
          status,
        },
        prestacaoId,
        userToken,
      });
      onSuccess();
      setIsSuccessAlertOpen(true);
      onClose();
    } catch (error) {
      console.error("Erro ao incluir serviço:", error);
      setIsErrorAlertOpen(true);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Criar Novo Serviço</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex direction="column">
            <FormControl mb={3}>
              <Text>Valor Cobrado</Text>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <FaDollarSign color="gray.300" />
                </InputLeftElement>
                <Input
                  placeholder="ValorCobrado"
                  name="ValorCobrado"
                  value={valorCobrado}
                  onChange={(e) => setValorCobrado(e.target.value)}
                />
              </InputGroup>
            </FormControl>
            <FormControl mb={3}>
              <Text>Serviço</Text>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <FaFolder color="gray.300" />
                </InputLeftElement>
                <Input
                  placeholder="ServicoId"
                  name="ServicoId"
                  value={servicoId}
                  onChange={(e) => setServicoId(Number(e.target.value))}
                />
              </InputGroup>
            </FormControl>
            <FormControl mb={3}>
              <Text>Data Início</Text>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <FaCalendar color="gray.300" />
                </InputLeftElement>
                <Input
                  placeholder="DataInicio"
                  name="DataInicio"
                  type="date"
                  onChange={(e) => setDataInicio(e.target.value)}
                />
              </InputGroup>
            </FormControl>
            <FormControl mb={3}>
              <Text>Data previsão fim</Text>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <FaCalendar color="gray.300" />
                </InputLeftElement>
                <Input
                  placeholder="DataFim"
                  name="DataFim"
                  type="date"
                  value={dataFim}
                  onChange={(e) => setDataFim(e.target.value)}
                />
              </InputGroup>
            </FormControl>
            <FormControl mb={3}>
              <Text>Pago?</Text>
              <Checkbox isChecked={isPago} onChange={() => setIsPago(!isPago)}>
                Marcar como Pago
              </Checkbox>
            </FormControl>
            <Button colorScheme="blue" onClick={handleCreateServicoPrestacao}>
              Criar Serviço
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

export default NewModal;
