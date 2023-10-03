import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Card,
  CardBody,
  Center,
  Alert,
  AlertIcon,
  AlertTitle,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Stack,
  VStack,
  useColorMode,
  CircularProgress,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const { colorMode } = useColorMode();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await userLogin({ email, password });
      setIsLoading(false);
      // navigate("/");
      console.log(response);
    } catch (error) {
      setError("Email ou Senha Inválidos!");
      setIsLoading(false);
      setEmail("");
      setPassword("");
    }
  };

  const userLogin = async ({ email, password }: any) => {
    try {
      const response = await axios.post("/colaborador/auth", {
        usuario: email,
        senha: password,
      });

      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      throw new Error("Login failed");
    }
  };

  return (
    <Box>
      <Flex justify="center" align="center" height="80vh">
        <Center>
          <Stack spacing="4">
            <VStack spacing="6">
              <Heading fontWeight="500" fontSize="30px" letterSpacing="-0.5px">
                Login
              </Heading>
            </VStack>

            <Card
              bg="#f6f8fa"
              variant="outline"
              borderColor="#d8dee4"
              w="308px"
              size="lg"
              borderRadius={8}
              boxShadow="lg"
            >
              <CardBody>
                <form onSubmit={handleSubmit}>
                  {error && (
                    <Alert status="error" variant="solid">
                      <AlertIcon />
                      <AlertTitle>{error}</AlertTitle>
                    </Alert>
                  )}

                  <Stack spacing="4">
                    <FormControl isRequired>
                      <FormLabel
                        size="sm"
                        color={colorMode === "dark" ? "black" : "black"}
                      >
                        Email
                      </FormLabel>
                      <Input
                        type="text"
                        bg="white"
                        borderColor="#d8dee4"
                        size="sm"
                        borderRadius="6px"
                        color={colorMode === "dark" ? "black" : "black"}
                        value={email}
                        // onChangeText={email => setEmail(email)}
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                      />
                    </FormControl>
                    <FormControl isRequired>
                      <HStack justify="space-between">
                        <FormLabel
                          size="sm"
                          color={colorMode === "dark" ? "black" : "black"}
                        >
                          Senha
                        </FormLabel>
                      </HStack>
                      <Input
                        type="password"
                        bg="white"
                        borderColor="#d8dee4"
                        size="sm"
                        borderRadius="6px"
                        color={colorMode === "dark" ? "black" : "black"}
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                        }}
                      />
                    </FormControl>

                    <Button
                      type="submit"
                      bg="#2da44e"
                      color="white"
                      size="sm"
                      _hover={{ bg: "#2c974b" }}
                      _active={{ bg: "#298e46" }}
                    >
                      {isLoading ? (
                        <CircularProgress
                          isIndeterminate
                          size="24px"
                          color="teal"
                        />
                      ) : (
                        "Sign In"
                      )}
                    </Button>
                  </Stack>
                </form>
              </CardBody>
            </Card>
          </Stack>
        </Center>
      </Flex>
    </Box>
  );
}

export default Login;
