import React from "react";
import { ChakraProvider, theme } from "@chakra-ui/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./pages/Login";
import LoginPage from "./pages/Login.page";
import Pessoas from "./pages/Pessoas";
import Servico from "./pages/Servico";

export const App = () => (
  <ChakraProvider theme={theme}>
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
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
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  </ChakraProvider>
);
