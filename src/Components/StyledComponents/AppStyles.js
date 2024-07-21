import styled from "styled-components";

import { BiMenu } from "react-icons/bi";
import { BsFillBackspaceFill } from "react-icons/bs";

export const AppContainer = styled.div`
  display: flex;
  height: 100vh;
  position: relative;
  width: 100vw;
`;

export const MainContent = styled.div`
  flex-grow: 1;
  overflow-y: auto;
`;

export const ButtonContainer = styled.div`
  position: fixed;
  top: 50px;
  right: 40px;
  z-index: 1000; 
`;

export const OpenMenu = styled(BiMenu)`
  font-size: 2rem;
  color: black;
  cursor: pointer;
`;

export const CloseMenu = styled(BsFillBackspaceFill)`
  font-size: 2rem;
  color: black;
  cursor: pointer;
`;
