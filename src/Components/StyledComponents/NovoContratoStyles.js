import styled from "styled-components";

export const TokenContainer = styled.div`
    width: 100%;
    min-height: 100vh;
    padding: 20px 30px 100px 30px;
    box-sizing: border-box;
    background: linear-gradient(to right, #171718, #171718, #171718);
    overflow: hidden;
    position: relative;
    @media (max-width: 1382px) {
        padding-top: 60px;
        padding-right: 20px;
        padding-left: 20px;
    }
`;

export const FirstDiv = styled.div`
    margin-top: 130px;
    width: 100%;
    display: flex;
    justify-content: center;
    box-sizing: border-box;
    align-items: center;
    gap: 100px;
    height: 180px;
    color: #ffd60a;
    background: linear-gradient(to right, #0E46A3, #1E0342, #0E46A3);
    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.5);
    filter: drop-shadow(1px 1px 20px rgba(255, 255, 255, 0.3));
    transition: 0.3s;

    h4 {
        font-size: 32px;
    }

    @media (max-width: 1382px) {
        box-shadow: 0px 1px 3px rgba(0, 0, 0, 0);
        background: transparent;
        flex-direction: column;
        gap: 5px;

        h4 {
            color: #31d0e3;
            margin: 0;
            font-size: 32px;
        }
    }
`;

export const BuyTokenArea = styled.div`
    margin-top: 20px;
    width: 100%;
    display: flex;
    justify-content: center;
    gap: 10px;

    @media (max-width: 1382px) {
        margin-top: 20px;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 10px;
        flex-direction: row;
        flex-wrap: wrap;
    }
`;

export const ContractBox = styled.div`
    width: 100%;
    height:max-content;
    background: linear-gradient(-45deg, #3d4763, #31d0e3);
    box-sizing: border-box;
    padding: 10px;    
    box-shadow: 2px 2px 4px rgba(0,0,0,0.7);
`;

export const ContractTitle = styled.div`
    width: 100%;
    text-align: center;
    font-size: 18px;
    font-weight: 800;
    border-bottom: 2px solid #a2d6f9;
    color: #a2d6f9;
`;

export const ContractInfo = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    align-items: center;
    transition: transform 0.3s ease; /* Adiciona uma transição suave ao efeito de transformação */

    &:hover p {
        transform: scale(1.2);
        color: white;
    }

    &:hover span {
        color: white;
        transform: scale(1.1);
    }

    p {
        margin: 0;
        font-weight: 600;
        color: #a2d6f9;
        transition: transform 0.3s ease; /* Adiciona uma transição suave ao efeito de transformação */

        span {
            color: #31d0e3;
            text-shadow: 1px 1px 1px rgba(0,0,0,0.2);
            margin: 0;
            transition: transform 0.3s ease; /* Adiciona uma transição suave ao efeito de transformação */
        }
    }
`;

export const QttBox = styled.div`
    width: 100%;
    display: flex;
    gap: 5px;
    justify-content: center;
    margin-top: 20px;
    box-sizing: border-box;

    input{
        height: 40px;
        box-sizing: border-box;
        width: 60px;
        padding-left: 15px;
        text-align: center;
        font-size: 22px;
    }

    button{
        height: 40px;
        box-sizing: border-box;
        width: 40px;
        cursor: pointer;
    }
`;


export const ValorDaCompra = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 20px;

    h3{
        font-weight: 100;
        margin: 0;
        font-size: 28px;
        color: white;
    }

    p{
        margin: 0;
        color: #1e96fc;
        font-size: 32px;
    }
`;  

export const PayForm = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 20px;
    box-sizing: border-box;

    h3 {
        font-weight: 100;
        margin: 0;
        font-size: 28px;
        color: white;
    }
    
    select {
        padding: 0 20px;
        box-sizing: border-box;
        height: 40px;
        color: white;
        font-size: 18px;
        font-weight: 800;
        background-color: transparent;

    }

    select option {
        background-color: transparent;
        box-sizing: border-box;
        color: black; 
    }
`;

export const ButtonArea = styled.div`
    width: 100%;
    margin-top: 20px;
    display: flex;
    justify-content: center;
`;

export const TokenButton = styled.button`
    transition: 0.3s;
    width: 100%;
    height: 40px;
    border: 2px solid #001d3d;
    background-color: #00509d;
    font-size: 18px;
    color: #ffd60a;
    font-weight: 600;
    cursor: pointer;
    &:hover {
        color: white;
        border: 2px solid black;
        background-color: #001d3d;
        font-size: 18px;
        font-weight: 600;
    }
`;

export const Modal = styled.div`
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 0;
    z-index: 1999;
    left: 0;
    background-color: rgba(0, 0, 0, 0.418);
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const ModalContent = styled.div`
    background-color: rgb(241, 249, 250);
    max-width: 90%;
    max-height: 90%;
    box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.514);
    border-radius: 20px;
    padding: 40px 50px;
    width: 100%;
    overflow-y: auto;
    display: flex;
    justify-content: start;
    align-items: center;
    flex-direction: column;
    position: relative;
    box-sizing: border-box;

    h3 {
        margin-bottom: 20px;
    }
`;

export const InputField = styled.input`
    width: 100%;
    border: 1px solid rgba(0, 0, 0, 0.11);
    border-radius: 8px;
    text-align: center;
    height: 40px;
    font-size: 18px;
    box-sizing: border-box;
`;

export const AgreeCheckbox = styled.div`
    margin-top: 10px;
    margin-bottom: 10px;
    display: flex;
    gap: 5px;
`;

export const ModalButtons = styled.div`
    display: flex;
    gap: 10px;
`;

export const Button = styled.button`
    margin-top: 10px;
    width: 300px;
    border: 2px solid transparent;
    background-color: rgb(15, 216, 15);
    border-radius: 20px;
    font-weight: 600;
    transition: 0.3s;
    color: aliceblue;
    height: 40px;

    cursor: pointer;
    &:hover {
        margin-top: 10px;
        color: black;
        width: 300px;
        border: 2px solid black;
        background-color: rgb(0, 255, 0);
        border-radius: 20px;
        box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.185);
    }


    .confirmar{
        background-color: rgb(15, 216, 15);
    }
    .cancelar{
        background-color: red;
    }
`;

export const ConfirmationBoxInput = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    align-items: center;

    label {
        font-size: 24px;
        font-weight: 600;
        color: rgba(0, 0, 0, 0.644);
    }

    input {
        width: 100%;
        border: 1px solid rgba(0, 0, 0, 0.11);
        border-radius: 8px;
        text-align: center;
        height: 40px;
        font-size: 18px;
        box-sizing: border-box;
    }
`;
