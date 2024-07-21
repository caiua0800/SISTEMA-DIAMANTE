import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import LoginPage from './Components/LoginPage';
import Dashboard from './Components/Dashboard';
import { Sidebar } from './Components/Sidebar';
import * as A from './Components/StyledComponents/AppStyles';
import { AuthProvider, useAuth } from './ContextAPI/AuthContext'; // Importar o contexto correto
import { UserProvider } from './ContextAPI/UserContext';
import { ContratosProvider } from './ContextAPI/ContratosContext'; // Importar o provider correto
import Token from './Components/NovoContrato';
import PrivateRoute from './Routes/PrivateRoute';
import UserPage from './Components/UserPage';
import SignUpPage from './Components/SignUp';
import { Saques } from './Components/Saques';

function App() {
  const [open, setOpen] = useState(false);

  return (
    <AuthProvider>
      <UserProvider>
        <ContratosProvider> {/* Usar o provider correto */}
          <Router>
            <A.AppContainer>
              <AuthenticatedLayout open={open} setOpen={setOpen} />
            </A.AppContainer>
          </Router>
        </ContratosProvider>
      </UserProvider>
    </AuthProvider>
  );
}

function AuthenticatedLayout({ open, setOpen }) {
  const { currentUser } = useAuth(); // Obtenha o usuário atual do contexto

  if (currentUser === undefined) {
    return null; // Renderize um fallback, como um carregador, se necessário
  }

  return (
    <>
      {/* Renderize o Sidebar apenas se o usuário estiver autenticado */}
      {currentUser && <Sidebar isOpen={open} />}

      {/* Renderize o botão de abrir/fechar menu apenas se o usuário estiver autenticado */}
      {currentUser && (
        <A.ButtonContainer>
          <button onClick={() => setOpen(!open)}>
            {open ? <A.CloseMenu /> : <A.OpenMenu />}
          </button>
        </A.ButtonContainer>
      )}

      <A.MainContent>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={
            currentUser ? (
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            ) : (
              <Navigate to="/login" />
            )
          } />
          <Route path="/usuario" element={
            currentUser ? (
              <PrivateRoute>
                <UserPage />
              </PrivateRoute>
            ) : (
              <Navigate to="/login" />
            )
          } />
          <Route path="/novocontrato" element={
            currentUser ? (
              <PrivateRoute>
                <Token />
              </PrivateRoute>
            ) : (
              <Navigate to="/login" />
            )
          } />
          <Route path="/saques" element={
            currentUser ? (
              <PrivateRoute>
                <Saques />
              </PrivateRoute>
            ) : (
              <Navigate to="/login" />
            )
          } />
          <Route path="/cadastrar" element={<SignUpPage />} /> {/* Adiciona a nova rota */}
        </Routes>
      </A.MainContent>
    </>
  );
}

export default App;
