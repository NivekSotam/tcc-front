import React from "react";
import { ChakraProvider, theme } from "@chakra-ui/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PrivateRoute from "./components/PrivateRoute";
import LoginPage from "./pages/Login.page";
import Pessoas from "./pages/Pessoas";
import Servico from "./pages/Servico";
import Vendas from "./pages/Vendas";
import Compra from "./pages/Compra";
import Itens from "./pages/Itens";
import Categorias from "./pages/Categorias";
import Clientes from "./pages/Clientes";
import Fornecedores from "./pages/Fornecedor";
import Endereco from "./pages/Endereco";
import Prestacao from "./pages/Prestacao";
import ServicoPrestacao from "./pages/ServicoPrestacao";
import ItensCategoria from "./pages/itensCategoria";
import ItemServico from "./pages/ItemServico";

export const App = () => (
  <ChakraProvider theme={theme}>
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Prestacao />
            </PrivateRoute>
          }
        />
        <Route
          path="/pessoas"
          element={
            <PrivateRoute>
              <Pessoas />
            </PrivateRoute>
          }
        />
        <Route
          path="/servico"
          element={
            <PrivateRoute>
              <Servico />
            </PrivateRoute>
          }
        />
        <Route
          path="/vendas"
          element={
            <PrivateRoute>
              <Vendas />
            </PrivateRoute>
          }
        />
        <Route
          path="/compras"
          element={
            <PrivateRoute>
              <Compra />
            </PrivateRoute>
          }
        />
        <Route
          path="/itens"
          element={
            <PrivateRoute>
              <Itens />
            </PrivateRoute>
          }
        />
        <Route
          path="/itensCategoria"
          element={
            <PrivateRoute>
              <ItensCategoria />
            </PrivateRoute>
          }
        />
        <Route
          path="/categorias"
          element={
            <PrivateRoute>
              <Categorias />
            </PrivateRoute>
          }
        />
        <Route
          path="/clientes"
          element={
            <PrivateRoute>
              <Clientes />
            </PrivateRoute>
          }
        />
        <Route
          path="/clientes/:id"
          element={
            <PrivateRoute>
              <Endereco />
            </PrivateRoute>
          }
        />
        <Route
          path="/fornecedores"
          element={
            <PrivateRoute>
              <Fornecedores />
            </PrivateRoute>
          }
        />
        <Route
          path="/fornecedores/:id"
          element={
            <PrivateRoute>
              <Endereco />
            </PrivateRoute>
          }
        />
        <Route
          path="/prestacoes"
          element={
            <PrivateRoute>
              <Prestacao />
            </PrivateRoute>
          }
        />
        <Route
          path="/prestacoes/:id"
          element={
            <PrivateRoute>
              <ServicoPrestacao />
            </PrivateRoute>
          }
        />
        <Route
          path="/prestacoes/:id/:servicoId"
          element={
            <PrivateRoute>
              <ItemServico />
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  </ChakraProvider>
);
