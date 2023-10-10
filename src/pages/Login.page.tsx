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
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import LocalStorageHelper from "../helpers/localstorage-helper";
import ErrorAlert from "../components/error/ErrorAlert";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const LoginPage = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [errorStatus, setErrorStatus] = useState<number | null>(null);

  const handleLogin = async (event: any) => {
    event.preventDefault();

    try {
      const response = await axios.post("/colaborador/auth", {
        usuario: email,
        senha: password,
      });

      if (response.status === 200) {
        // Login bem-sucedido
        LocalStorageHelper.setToken(response.data.accessToken);
        navigate("/");
      }
    } catch (error: any) {
      console.error(error);
      if (error.response) {
        setErrorStatus(error.response.status);

        if (error.response.status === 401) {
          onOpen();
        } else if (error.response.status === 500) {
          onOpen();
        }
      } else {
        console.error("Erro na requisição:", error.message);
      }
    }
  };

  let alertTitle = "";
  let alertDescription = "";
  if (errorStatus === 401) {
    alertTitle = "Erro de Autenticação";
    alertDescription = "Usuário e/ou senha inválido(s)";
  } else if (errorStatus === 500) {
    alertTitle = "Erro no Servidor";
    alertDescription =
      "Ocorreu um erro no servidor. Tente novamente mais tarde.";
  }

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
      <ErrorAlert
        isOpen={isOpen}
        onClose={onClose}
        alertTitle={alertTitle}
        alertDescription={alertDescription}
      />
    </Flex>
  );
};

export default LoginPage;
