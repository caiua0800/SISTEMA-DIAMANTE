import React from 'react';
import styled from 'styled-components';

// Styled-components
const ContractContainer = styled.div`
  width: 80%;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #000;
  background-color: #fff;
  font-family: 'Times New Roman', Times, serif;
  font-size: 12pt;
  line-height: 1.5;
  color: #000;
  text-align: justify;
`;

const Title = styled.h2`
  text-align: center;
  text-decoration: underline;
  margin-bottom: 20px;
`;

const Clause = styled.p`
  margin: 10px 0;
`;

const formatNumber = (number) => {
  return parseFloat(number).toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

const ContractComponent = ({ userData, contracts, paymentMethod }) => {
  return (
    <ContractContainer>
      <Title>CONTRATO DE COMPRA</Title>
      <Clause>
        <strong>IDENTIFICAÇÃO DAS PARTES CONTRATANTES</strong><br />
        Pelo presente instrumento particular de um lado, {userData.NAME} inscrito no CPF sob o nº {userData.CPF}, residente e domiciliado à {userData.ADRESS}, doravante denominado COMPRADOR, e de outro lado, a empresa [Nome da Empresa], com sede à [Endereço da Empresa], inscrita no CNPJ sob o nº [CNPJ da Empresa], doravante denominada VENDEDORA, têm entre si justo e contratado o seguinte:
      </Clause>
      {contracts.map((contract, index) => (
        <Clause key={index}>
          <strong>OBJETO DO CONTRATO</strong><br />
          O presente contrato tem como objeto a compra de {contract.qtd} contratos no valor de {formatNumber(contract.value)} cada, totalizando {formatNumber(contract.qtd * contract.value)}.
        </Clause>
      ))}
      <Clause>
        <strong>PAGAMENTO</strong><br />
        O COMPRADOR se compromete a pagar o valor total de {formatNumber(contracts.reduce((total, contract) => total + (contract.qtd * contract.value), 0))} através de {paymentMethod}.
      </Clause>
      <Clause>
        <strong>DISPOSIÇÕES FINAIS</strong><br />
        E, por estarem assim justos e contratados, assinam o presente contrato em duas vias de igual teor e forma, para que produzam os efeitos legais.
      </Clause>
    </ContractContainer>
  );
};

export default ContractComponent;
