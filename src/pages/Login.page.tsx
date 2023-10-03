import React, { useState } from "react";
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  Link,
  Avatar,
  FormControl,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import LocalStorageHelper from "../helpers/localstorage-helper";
import ErrorAlertLogin from "../components/error/ErrorAlertLogin";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const LoginPage = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleLogin = async (event: any) => {
    event.preventDefault();

    try {
      const response = await axios.post("/colaborador/auth", {
        usuario: email,
        senha: password,
      });
      if (response.status === 200) {
        // console.log(response);
        LocalStorageHelper.setToken(response.data.token);
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      onOpen();
    }
  };

  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      backgroundColor="gray.200"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      >
        <Avatar bg="#2C3E50" />
        <Heading color="#2C3E50">Bem vindo!</Heading>
        <Box minW={{ base: "90%", md: "468px" }}>
          <form onSubmit={handleLogin}>
            <Stack
              spacing={4}
              p="1rem"
              backgroundColor="whiteAlpha.900"
              boxShadow="md"
            >
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CFaUserAlt color="#2C3E50" />}
                  />
                  <Input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Usuário"
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    children={<CFaLock color="#2C3E50" />}
                  />
                  <Input
                    type={false ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Senha"
                  />
                </InputGroup>
              </FormControl>

              <Button
                borderRadius={0}
                type="submit"
                variant="solid"
                backgroundColor="#2C3E50"
                width="full"
                color={"white"}
              >
                Login
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
      <Box>
        Algum Problema?{" "}
        <Link color="#2C3E50" href="#">
          Clique Aqui
        </Link>
      </Box>
      {/* <Button onClick={onOpen}>Open Modal</Button> */}
      <ErrorAlertLogin isOpen={isOpen} onClose={onClose} />
    </Flex>
  );
};

export default LoginPage;
