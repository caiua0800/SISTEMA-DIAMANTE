import React, { useState, useEffect } from "react";
import TabelaDeContratos from "./Tabela";
import TwoBars from "./TwoBars";
import * as D from './StyledComponents/DashboardStyles'
import { useUser } from "../ContextAPI/UserContext";
import { useContratos } from '../ContextAPI/ContratosContext';
import { formatarMoedaBrasil } from '../ASSETS/utils';

export default function Dashboard() {

    const { userProfile, setUserProfile } = useUser();
    const [saldoTotalPlataforma, setSaldoTotalPlataforma] = useState(0);
    const [saldoIndicacaoPlataforma, setSaldoIndicacaoPlataforma] = useState(0);
    const [saldoDisponivelPlataforma, setSaldoDisponivelPlataforma] = useState(0);
    const [valorSacadoPlataforma, setValorSacadoPlataforma] = useState(0);
    const [valorTotalInvestido, setValorTotalInvestido] = useState(0);


    const { contratos, calcularValoresContratos } = useContratos();
    const {
        tokensObtidos,
        saldoTotal,
        lucroTotal,
        saldoContratosVencidos,
        totalInvestido,
        saldoDeRecompra
    } = calcularValoresContratos();

    useEffect(() => {
        if (userProfile) {
            setValorSacadoPlataforma(userProfile.VALORSACADO);

            setSaldoTotalPlataforma(saldoTotal + userProfile.INDICATIONBUDGET - valorSacadoPlataforma);

            setSaldoDisponivelPlataforma(lucroTotal + saldoContratosVencidos+ userProfile.INDICATIONBUDGET - valorSacadoPlataforma);

            setSaldoIndicacaoPlataforma(userProfile.INDICATIONBUDGET);

            setValorTotalInvestido(totalInvestido)
        }

    }, [userProfile, saldoTotal]); 
    
    console.log(saldoDisponivelPlataforma / saldoTotalPlataforma)

    return (
        <D.DashboardContainer>
            <D.ContainerTitle>
                <p>DASHBOARD</p>
            </D.ContainerTitle>

            <D.ContainerContent>

                <D.FirstRow>
                    <D.ContratosAtivos>
                        <h1>CONTRATOS ATIVOS</h1>

                        <span>{contratos.length}</span> {/* Exemplo de uso do número de contratos */}

                        <TwoBars totalSpent={totalInvestido} totalValue={saldoTotalPlataforma} />

                    </D.ContratosAtivos>

                    <D.SaldoCorrente>
                        <D.SaldoNaPlataforma>
                            <h2>SALDO NA PLATAFORMA</h2>
                            <span>{userProfile && formatarMoedaBrasil(saldoTotalPlataforma)}</span>

                            <D.SaldoPlataformaDivs>
                                <div>
                                    <h3>SALDO DE OPERAÇÕES</h3>
                                    <span>{userProfile && formatarMoedaBrasil(saldoTotal)}</span>
                                </div>
                                <div>
                                    <h3>SALDO DE INDICAÇÃO</h3>
                                    <span>{userProfile && formatarMoedaBrasil(userProfile.INDICATIONBUDGET)}</span>
                                </div>
                            </D.SaldoPlataformaDivs>

                        </D.SaldoNaPlataforma>
                    </D.SaldoCorrente>
                </D.FirstRow>

                <D.SecondRow>
                    <h1>DISPONÍVEL PARA SAQUE | {formatarMoedaBrasil(saldoDisponivelPlataforma)}</h1>
                    <D.SaldoDisponivelParaSaque>
                        <D.ProgressBar>
                            <D.ProgressFill percentage={(saldoDisponivelPlataforma / saldoTotalPlataforma) * 100} />
                        </D.ProgressBar>
                        <D.PercentageCount>{((saldoDisponivelPlataforma / saldoTotalPlataforma) * 100).toFixed(2)}%</D.PercentageCount>
                    </D.SaldoDisponivelParaSaque>

                </D.SecondRow>

                <D.IndiqueEGanha>
                    <p>INDIQUE E GANHE 10% DA PRIMEIRA COMPRA DO INDICADO, <span>COPIAR LINK</span></p>
                </D.IndiqueEGanha>

                <D.ThirdRow>
                    <h2>TABELA DE CONTRATOS</h2>
                </D.ThirdRow>

                <D.TabelaContainer>
                    <TabelaDeContratos dados={contratos} />
                </D.TabelaContainer>

            </D.ContainerContent>
        </D.DashboardContainer>
    )
}
