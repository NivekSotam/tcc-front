import React from "react";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  defineStyle,
  createMultiStyleConfigHelpers,
} from "@chakra-ui/react";

const ErrorAlertLogin = ({ isOpen, onClose }: any) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg="#FED7D7">
        <ModalHeader></ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Alert
            status="error"
            variant="subtle"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            height="200px"
          >
            <AlertIcon boxSize="40px" mr={0} />
            <AlertTitle mt={4} mb={1} fontSize="lg">
              Erro de Autenticação
            </AlertTitle>
            <AlertDescription maxWidth="sm">
              Usuário e/ou senha inválido(s)
            </AlertDescription>
          </Alert>
        </ModalBody>
        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ErrorAlertLogin;
