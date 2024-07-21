import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import styled from "styled-components";
import { Icons } from "../ASSETS/Icons";
import { useAuth } from '../ContextAPI/AuthContext';
import { db } from '../DATABASE/firebaseConfig'; // Importe sua instância do Firebase
import { doc, getDoc } from "firebase/firestore";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showError, setShowError] = useState(false);

  const { login, currentUser, setUserProfile } = useAuth(); // Adicione setUserProfile
  const navigate = useNavigate();

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);

      // Após o login, busque o documento do usuário
      const userDocRef = doc(db, 'USERS', currentUser.uid); // Supondo que o ID do usuário é o UID
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        setUserProfile(userDoc.data()); // Armazene os dados do usuário no contexto
        navigate("/"); // Redirecione para a página principal
      } else {
        console.log("Usuário não encontrado na base de dados.");
      }
    } catch (error) {
      setErrorMessage("USUÁRIO OU SENHA INCORRETOS, TENTE NOVAMENTE");
      setShowError(true);
    }
  };

  useEffect(() => {
    if (currentUser) {
      navigate("/"); // Redireciona para a página principal se o usuário já estiver autenticado
    }
  }, [currentUser, navigate]);

  return (
    <Container>
      {showError && <Overlay />}
      <LoginBox>
        <Logo src={Icons.DiamondIcon} alt="Logo" />
        <Title>Bem Vindo de Volta!</Title>
        <LoginForm onSubmit={handleLogin}>
          <Input
            type="text"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
          />
          <SubmitButton type="submit">Login</SubmitButton>
        </LoginForm>
        {showError && (
          <ErrorPopup>
            <ErrorMessage>{errorMessage}</ErrorMessage>
            <ErrorBar />
          </ErrorPopup>
        )}
        <SignUpLink to="/cadastrar">
          Não possui uma conta? <SignUpText>Cadastre-se Já</SignUpText>
        </SignUpLink>
      </LoginBox>
    </Container>
  );
};


const Container = styled.div`
  background-color: #202020;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: ${({ show }) => (show ? "block" : "none")};
  pointer-events: ${({ show }) => (show ? "auto" : "none")};
`;

const LoginBox = styled.div`
  position: relative;
  background-color: #333333;
  border-radius: 10px;
  padding: 40px;
  text-align: center;
`;

const Logo = styled.img`
  width: 100px;
  transform: scale(2);
`;

const Title = styled.h2`
  color: #ffffff;
  font-size: 24px;
  margin-bottom: 20px;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  background-color: #444444;
  border: none;
  border-radius: 5px;
  padding: 10px;
  color: #ffffff;
  font-size: 16px;
  margin-bottom: 10px;

  &::placeholder {
    color: #bbbbbb;
  }
`;

const SubmitButton = styled.button`
  background-color: #6e6eff;
  border: none;
  border-radius: 5px;
  padding: 10px;
  color: #ffffff;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #4b4bff;
  }
`;

const SignUpLink = styled(Link)`
  color: #ffffff;
  font-size: 14px;
  text-decoration: underline;
  cursor: pointer;
  margin-top: 20px;
  display: block;
`;

const SignUpText = styled.span`
  text-decoration: none;
`;

const ErrorPopup = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #202020;
  padding: 20px;
  display: flex;
  width: 500px;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  z-index: 9999;

  @media (max-width: 800px){
    width: 300px;
  }
`;

const ErrorMessage = styled.p`
  color: white;
  font-size: 16px;
  margin-bottom: 10px;
`;

const ErrorBar = styled.div`
  width: 100%;
  height: 5px;
  background-color: #2382EF;
  animation: errorBarAnimation 2s linear forwards;
  border-radius: 5px;
  margin-top: 10px;

  @keyframes errorBarAnimation {
    0% {
      width: 100%;
    }
    100% {
      width: 0;
    }
  }
`;

export default LoginPage;
