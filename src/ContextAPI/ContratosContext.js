// ContratosContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useUser } from './UserContext';

const ContratosContext = createContext({
  contratos: [],
  calcularValoresContratos: () => ({
    tokensObtidos: 0,
    saldoTotal: 0,
    lucroTotal: 0,
    saldoContratosVencidos: 0,
    totalInvestido: 0,
    saldoDeRecompra: 0
  })
});

export const ContratosProvider = ({ children }) => {
  const { userProfile } = useUser();
  const [contratos, setContratos] = useState([]);
  const [tokensObtidos, setTokensObtidos] = useState(0);
  const [saldoTotal, setSaldoTotal] = useState(0);
  const [lucroTotal, setLucroTotal] = useState(0);
  const [saldoContratosVencidos, setSaldoContratosVencidos] = useState(0);
  const [totalInvestido, setTotalInvestido] = useState(0);
  const [saldoDeRecompra, setSaldoDeRecompra] = useState(0);

  useEffect(() => {
    if (userProfile && userProfile.CONTRATOS) {
      const today = new Date();
      let totalInvestido = 0;
      let tokensObtidos = 0;
      let saldoTotal = 0;
      let lucroTotal = 0;
      let saldoContratosVencidos = 0;


      const contratosList = userProfile.CONTRATOS;
      setContratos(contratosList);

      contratosList.forEach(contr => {
        if (contr.STATUS) {
          const allowSellDate = parseDateBrazilianFormat(contr.ALLOWSELL);

          if (allowSellDate.toISOString() >= today.toISOString()) {
            tokensObtidos += contr.COINS;
          } else {
            saldoContratosVencidos += contr.TOTALSPENT;
          }
          totalInvestido += contr.TOTALSPENT;

          saldoTotal += (contr.TOTALSPENT + (contr.TOTALSPENT * (contr.LUCRO_OBTIDO / 100)));
          lucroTotal += (parseFloat(contr.TOTALSPENT * (contr.LUCRO_OBTIDO / 100)));
        }
      });
      setTokensObtidos(tokensObtidos);
      setSaldoTotal(saldoTotal);
      setLucroTotal(lucroTotal);
      setSaldoContratosVencidos(saldoContratosVencidos);
      setTotalInvestido(totalInvestido);
      setSaldoDeRecompra(lucroTotal + saldoContratosVencidos);
    } else {
      // Se não houver contratos, defina todos os valores como 0
      setContratos([]);
      setTokensObtidos(0);
      setSaldoTotal(0);
      setLucroTotal(0);
      setSaldoContratosVencidos(0);
      setTotalInvestido(0);
      setSaldoDeRecompra(0);
    }
  }, [userProfile]);

  const calcularValoresContratos = () => ({
    contratos,
    tokensObtidos,
    saldoTotal,
    lucroTotal,
    saldoContratosVencidos,
    totalInvestido,
    saldoDeRecompra
  });

  const value = {
    contratos,
    calcularValoresContratos
  };

  return <ContratosContext.Provider value={value}>{children}</ContratosContext.Provider>;
};

export const useContratos = () => useContext(ContratosContext);

// Função auxiliar para formatar a data
const parseDateBrazilianFormat = (dateString) => {
  const [day, month, year] = dateString.split('/');
  return new Date(`${year}-${month}-${day}`);
};
