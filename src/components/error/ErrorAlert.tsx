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

const ErrorAlert = ({ isOpen, onClose, alertTitle, alertDescription }: any) => {
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
              {alertTitle}
            </AlertTitle>
            <AlertDescription maxWidth="sm">
              {alertDescription}
            </AlertDescription>
          </Alert>
        </ModalBody>
        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ErrorAlert;
