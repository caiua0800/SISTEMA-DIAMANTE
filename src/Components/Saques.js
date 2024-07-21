import React, {useState, useEffect} from "react";
import * as S from './StyledComponents/SaquesStyles';

import { useUser } from "../ContextAPI/UserContext";
import { useContratos } from '../ContextAPI/ContratosContext';
import { formatarMoedaBrasil } from '../ASSETS/utils';


export const Saques = () => {


    const { userProfile, setUserProfile } = useUser();

    const { contratos, calcularValoresContratos } = useContratos();
    const {
        tokensObtidos,
        saldoTotal,
        lucroTotal,
        saldoContratosVencidos,
        totalInvestido,
        saldoDeRecompra
    } = calcularValoresContratos();

    const [saldoTotalPlataforma, setSaldoTotalPlataforma] = useState(0);
    const [saldoIndicacaoPlataforma, setSaldoIndicacaoPlataforma] = useState(0);
    const [saldoDisponivelPlataforma, setSaldoDisponivelPlataforma] = useState(0);
    const [valorSacadoPlataforma, setValorSacadoPlataforma] = useState(0);
    const [valorTotalInvestido, setValorTotalInvestido] = useState(0);

    useEffect(() => {
        if (userProfile) {
            setValorSacadoPlataforma(userProfile.VALORSACADO);

            setSaldoTotalPlataforma(saldoTotal + userProfile.INDICATIONBUDGET - valorSacadoPlataforma);

            setSaldoDisponivelPlataforma(lucroTotal + saldoContratosVencidos+ userProfile.INDICATIONBUDGET - valorSacadoPlataforma);

            setSaldoIndicacaoPlataforma(userProfile.INDICATIONBUDGET);

            setValorTotalInvestido(totalInvestido)
        }

    }, [userProfile, saldoTotal]); 

    return (
        <S.SaquesContainer>
            <S.ContainerTitle>SAQUES</S.ContainerTitle>

            <S.ValoresDisponiveis>
                <div>
                    <p>SALDO DE OPERAÇÕES DISPONÍVEL</p>
                    <span>{formatarMoedaBrasil(saldoDisponivelPlataforma - saldoIndicacaoPlataforma)}</span>
                </div>

                <div>
                    <p>SALDO DE INDICAÇÃO DISPONÍVEL</p>
                    <span>{formatarMoedaBrasil(saldoIndicacaoPlataforma)}</span>
                </div>
            </S.ValoresDisponiveis>

            <S.Info>
                <p>
                    As solicitações de saques são feitas no aniversário de
                    3 meses da primeira valorização de cada compra, nessa
                    data se abrirá uma janela de solicitação saque por
                    48 horas onde o USUÁRIO definirá se efetua a
                    solicitação de saque ou não.
                </p>

                <p>
                    Os pagamentos das solicitações feitas serão efetuados no
                    dia 1 de cada mês, caso não forem dias úteis será efetuado
                    nos próximos dias úteis subsequentes.
                </p>
            </S.Info>

            <S.InformacaoSobreSaque>
                <S.SaqueInfoBox>
                    <h2>VALOR DO SAQUE</h2>
                    <input type="number" />
                </S.SaqueInfoBox>
                <S.SaqueInfoBox>
                    <h2>FUNDO</h2>
                    <select>
                        <option>SALDO DE OPERAÇÕES</option>
                        <option>SALDO DE INDICAÇÃO</option>
                    </select>
                </S.SaqueInfoBox>

                <button>REALIZAR SOLICITAÇÃO</button>
            </S.InformacaoSobreSaque>

        </S.SaquesContainer>
    )
}