import React from "react";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  useDisclosure,
  ModalHeader,
} from "@chakra-ui/react";

const SuccessAlert = ({
  isOpen,
  onClose,
  alertTitle,
  alertDescription,
}: any) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg="#C6F6D5">
        <ModalHeader></ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Alert
            status="success"
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
      </ModalContent>
    </Modal>
  );
};

export default SuccessAlert;
