import React, { useState, useEffect } from "react";
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc, updateDoc, arrayUnion } from '@firebase/firestore';
import { firebaseConfig } from '../DATABASE/firebaseConfig';
import {
    SaquesContainer as SaquesContainerDark,
    FirstDiv as FirstDivDark,
    Info as InfoDark,
    GetMoreClients as GetMoreClientsDark,
    InfoBoxes as InfoBoxesDark,
    InfoBox as InfoBoxDark,
    TableSaques as TableSaquesDark,
    ModalSaque as ModalSaqueDark,
    ModalContent as ModalContentDark,
    ContentHeader as ContentHeaderDark,
    ContentBody as ContentBodyDark,
    ModalButtons as ModalButtonsDark,
    ContentInput as ContentInputDark,
    ButtonModal as ButtonModalDark,
    TipoSaque as TipoSaqueDark,
    TipoSaqueDiv as TipoSaqueDivDark
} from "./styled-components/SAQUES/SaquesComponents";

import {
    SaquesContainer as SaquesContainerLight,
    FirstDiv as FirstDivLight,
    Info as InfoLight,
    GetMoreClients as GetMoreClientsLight,
    InfoBoxes as InfoBoxesLight,
    InfoBox as InfoBoxLight,
    TableSaques as TableSaquesLight,
    ModalSaque as ModalSaqueLight,
    ModalContent as ModalContentLight,
    ContentHeader as ContentHeaderLight,
    ContentBody as ContentBodyLight,
    ModalButtons as ModalButtonsLight,
    ContentInput as ContentInputLight,
    ButtonModal as ButtonModalLight,
    TipoSaque as TipoSaqueLight,
    TipoSaqueDiv as TipoSaqueDivLight
} from "./styled-components/SAQUES/SaquesComponentsLight";
import styled from 'styled-components';
import ReloadButton from "./ReloadButton";
import Tooltip from './Tooltip';



const formatNumber = (number) => {
    return number.toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
};

const parseDateBrazilianFormat = (dateString) => {
    const [day, month, year] = dateString.split('/');
    return new Date(year, month - 1, day); // mês - 1 porque o JavaScript conta os meses a partir de 0
};

function generateRandomString(length = 12) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:",.<>?';
    let result = '';
    const charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charactersLength);
        result += characters[randomIndex];
    }

    return result;
}

const cancelIcon = 'https://firebasestorage.googleapis.com/v0/b/wldata.appspot.com/o/cancel-close-delete-svgrepo-com.png?alt=media&token=b0d9ff03-fef7-4eb4-8bae-f6624f1483f2';

export default function Saques({ darkMode }) {
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const static_value_coin = 158.23;
    const [userData, setUserData] = useState(null);
    const [userDisponivelCoins, setUserDisponivelCoins] = useState(0);

    const [valorSaque, setValorSaque] = useState("25,00");
    const [saques, setSaques] = useState([]);
    const [revealedIds, setRevealedIds] = useState({});
    const [lucroTotalObtido, setLucroTotalObtido] = useState(0);
    const [saldoContratosVencidos, setSaldoContratosVencidos] = useState(0);
    const [saldoIndicacao, setSaldoIndicacao] = useState(0);
    const [saquesFeitos, setSaquesFeitos] = useState(0);
    const [fundoEscolhido, setFundoEscolhido] = useState(null);

    const fetchData = async () => {
        try {
            const docRef = doc(db, 'USERS', localStorage.getItem('cpfCLIENTE'));
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setUserData(docSnap.data());
                setSaques(docSnap.data().SAQUES)
            } else {
                console.error("No such document!");
            }
        } catch (error) {
            console.error('Erro ao obter os dados do usuário:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [db]);

    useEffect(() => {
        if (userData && userData.CONTRATOS) {
            let totalCoinsBudget = 0;
            const today = new Date();
            let totalCoins = 0;
            setSaquesFeitos(userData.VALORSACADO)

            let lucroTotalObtidoSoma = 0;
            let saldoContratosVencidosSoma = 0;

            userData.CONTRATOS.forEach((contrato) => {
                if (contrato.STATUS) {
                    const allowSellDate = parseDateBrazilianFormat(contrato.ALLOWSELL);

                    if (allowSellDate <= today) {
                        totalCoins += parseFloat(contrato.COINS || 0);
                        saldoContratosVencidosSoma += (contrato.TOTALSPENT);
                    }

                    lucroTotalObtidoSoma += (contrato.TOTALSPENT * (contrato.LUCRO_OBTIDO / 100))
                }
            });

            setLucroTotalObtido(lucroTotalObtidoSoma);
            setSaldoContratosVencidos(saldoContratosVencidosSoma)
            setSaldoIndicacao(userData.INDICATIONBUDGET);

            totalCoinsBudget = userData.CONTRATOS.reduce((total, contrato) => {
                if (contrato.STATUS) {
                    return total + parseFloat((contrato.COINS || 0).toString().replace('.', ''));
                }
                return total;
            }, 0);

            // Ajuste para garantir que userData.GOTCOINS seja sempre um número
            const gotCoins = parseFloat(userData.GOTCOINS) || 0;

            setUserDisponivelCoins(parseFloat(totalCoins.toString().replace('.', '')) - gotCoins);
        }
    }, [userData]);


    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const formatCurrencyInput = (value) => {
        const numericValue = parseFloat(value.replace(/[^\d]/g, '') / 100);
        return numericValue.toLocaleString('pt-BR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    };

    const handleInputChange = (e) => {

        const formattedValue = formatCurrencyInput(e.target.value);
        setValorSaque(formattedValue);
    };

    function formatCurrency(value) {
        // Remove os pontos da string
        let noDots = value.replace(/\./g, '');

        // Substitui a vírgula pelo ponto
        let formattedValue = parseFloat(noDots.replace(',', '.'));

        return formattedValue;
    }


    const addSaque = async (valor, id) => {
        const db = getFirestore();
        const userRef = doc(db, 'USERS', id);


        if (userData && !userData.VERIFICADO) {
            alert('Envie seus documentos para a análise para poder sacar');
            return;
        }

        if (fundoEscolhido !== 'SALDOINDICACAO' && formatCurrency(valor) > ((saldoContratosVencidos + lucroTotalObtido) - saquesFeitos)) {
            alert('SALDO INSUFICIENTE');
            return;
        }

        if (formatCurrency(valor) < 25) {
            alert('VALOR MÍNIMO PARA SAQUE = U$25,00');
            return;
        }

        if (fundoEscolhido == null) {
            alert(`Escolha um fundo para sacar`);
            return;
        }

        if (fundoEscolhido === 'SALDOINDICACAO' && formatCurrency(valor) > userData.INDICATIONBUDGET) {
            alert('SALDO DE INDICAÇÃO INSUFICIENTE');
            return;
        }

        const newSaque = {
            IDSAQUE: generateRandomString(),
            VALOR: valor,
            DATA: new Date().toLocaleDateString('pt-BR'),
            DATARECEBIMENTO: 'null',
            APROVADO: false,
            DADOSRECEBIMENTO: 'null',
            FUNDO_ESCOLHIDO: fundoEscolhido
        };

        try {
            await updateDoc(userRef, {
                SAQUES: arrayUnion(newSaque)
            });
            setIsModalOpen(false);
            setValorSaque('25,00');
            alert('SAQUE SOLICITADO, AGUARDE A CONFIRMAÇÃO EM ATÉ N DIAS')
            fetchData();
        } catch (error) {
            console.error("Erro ao adicionar saque: ", error);
        }
    };


    const toggleIdVisibility = (index) => {
        setRevealedIds((prevState) => ({
            ...prevState,
            [index]: !prevState[index]
        }));
    };

    const handleReload = () => {
        fetchData();
    }

    const handleFundoChange = (event) => {
        setFundoEscolhido(event.target.value);
    };

    const SaquesContainer = darkMode ? SaquesContainerDark : SaquesContainerLight;
    const FirstDiv = darkMode ? FirstDivDark : FirstDivLight;
    const Info = darkMode ? InfoDark : InfoLight;
    const GetMoreClients = darkMode ? GetMoreClientsDark : GetMoreClientsLight;
    const InfoBoxes = darkMode ? InfoBoxesDark : InfoBoxesLight;
    const InfoBox = darkMode ? InfoBoxDark : InfoBoxLight;
    const ModalSaque = darkMode ? ModalSaqueDark : ModalSaqueLight;
    const ModalContent = darkMode ? ModalContentDark : ModalContentLight;
    const ContentHeader = darkMode ? ContentHeaderDark : ContentHeaderLight;
    const ContentBody = darkMode ? ContentBodyDark : ContentBodyLight;
    const ContentInput = darkMode ? ContentInputDark : ContentInputLight;
    const ModalButtons = darkMode ? ModalButtonsDark : ModalButtonsLight;
    const ButtonModal = darkMode ? ButtonModalDark : ButtonModalLight;
    const TipoSaque = darkMode ? TipoSaqueDark : TipoSaqueLight;
    const TipoSaqueDiv = darkMode ? TipoSaqueDivDark : TipoSaqueDivLight;
    const TableSaques = darkMode ? TableSaquesDark : TableSaquesLight;


    return (
        <SaquesContainer>
            <FirstDiv>
                <span className="spanTitle">Saques</span>
                <button onClick={openModal}><span>+</span> Solicite um novo saque</button>
            </FirstDiv>

            <Info>
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
            </Info>

            <GetMoreClients>
                <span>RECOMPRE TOKENS COM SEU SALDO OU PRODUTOS DA GOLDEN E AUMENTE SEUS LUCROS</span>
                <button> CLICANDO AQUI</button>
            </GetMoreClients>

            <InfoBoxes>
                <InfoBox color="#0096c7">
                    <p>
                        Saldo disponível p/ saque
                    </p>
                    <p>
                        <Tooltip text="ss">
                            U$ {((lucroTotalObtido + saldoContratosVencidos - saquesFeitos) >= 0) ? formatNumber(lucroTotalObtido + saldoContratosVencidos - saquesFeitos) : formatNumber(lucroTotalObtido + saldoContratosVencidos)}

                        </Tooltip>
                    </p>
                </InfoBox>

                <InfoBox color="#3a7d44">
                    <p>
                        Saldo de indicação disp. p/ saque
                    </p>
                    <p>
                        U$ {formatNumber(saldoIndicacao)}
                    </p>
                </InfoBox>

                <InfoBox color="#ff7b00">
                    <p>
                        Valor mínimo para solicitar saque
                    </p>
                    <p>
                        U$ 25,00
                    </p>
                </InfoBox>
            </InfoBoxes>

            <ReloadButton handleReload={handleReload} />


            <TableSaques>
                <table className="table-saques">
                    <thead className="thead-saques">
                        <tr>
                            <th>Cod.</th>
                            <th>Data Solicitação</th>
                            <th>Data Pagamento</th>
                            <th>Valor Solicitado</th>
                            <th>Dados do Recebimento</th>
                            <th>Fundo</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {saques && saques.map((saque, index) => (
                            <tr className="tr-saques" key={index}>
                                <td>
                                    <span
                                        className={revealedIds[index] ? "revealed-id" : "hidden-id"}
                                        onClick={() => toggleIdVisibility(index)}
                                    >
                                        {revealedIds[index] ? saque.IDSAQUE : "******************"}
                                    </span>
                                </td>
                                <td>{saque.DATA}</td>
                                <td>{saque.DATARECEBIMENTO === "null" ? "PENDENTE" : (saque.DADOSRECEBIMENTO === "NEGADO" ? "---------------" : saque.DATARECEBIMENTO)}</td>
                                <td>$ {formatNumber(saque.VALOR)}</td>
                                <td>{saque.DADOSRECEBIMENTO === 'null' ? "PENDENTE" : (saque.DADOSRECEBIMENTO === "NEGADO" ? saque.OBS : saque.DADOSRECEBIMENTO)}</td>
                                <td>{(saque.FUNDO_ESCOLHIDO == 'SALDOINDICACAO' ? 'INDICAÇÃO' : 'RECOMPRA')}</td>
                                <td>{!saque.PENDENTE ? 'PENDENTE' : (saque.APROVADO ? 'ACEITO' : 'NEGADO')}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </TableSaques>

            {isModalOpen && (
                <ModalSaque>
                    <ModalContent>
                        <ContentHeader>
                            <p>NOVO SAQUE</p>
                            <div>
                                <img onClick={closeModal} src={cancelIcon} alt="cancel icon" />
                            </div>
                        </ContentHeader>
                        <ContentBody>
                            <p>SALDO DISPONÍVEL PARA SAQUE: $ {formatNumber((lucroTotalObtido + saldoContratosVencidos + saldoIndicacao - saquesFeitos))}</p>
                            <span>TAXA DE SAQUE DE 4% REF. AO VALOR SOLICITADO</span>
                        </ContentBody>
                        <ContentInput>
                            <span>Valor</span>
                            <input
                                onChange={handleInputChange}
                                value={valorSaque}
                                type="text"
                                placeholder="Digite o valor do saque"
                            />
                            <TipoSaque>
                                <TipoSaqueDiv>
                                    <div>
                                        <input
                                            type="radio"
                                            id="SALDORECOMPRA"
                                            name="tipoSaque"
                                            value="SALDORECOMPRA"
                                            checked={fundoEscolhido === "SALDORECOMPRA"}
                                            onChange={handleFundoChange}
                                        />
                                        <label htmlFor="SALDORECOMPRA">SALDO DE OPERAÇÕES</label>
                                    </div>
                                    <div>
                                        <input
                                            type="radio"
                                            id="SALDOINDICACAO"
                                            name="tipoSaque"
                                            value="SALDOINDICACAO"
                                            checked={fundoEscolhido === "SALDOINDICACAO"}
                                            onChange={handleFundoChange}
                                        />
                                        <label htmlFor="SALDOINDICACAO">SALDO DE INDICAÇÃO</label>
                                    </div>
                                </TipoSaqueDiv>
                            </TipoSaque>
                        </ContentInput>
                        <ModalButtons>
                            <ButtonModal color="rgba(244, 16, 16, 0.7)" colorH="rgba(244, 16, 16, 1)" onClick={closeModal}>CANCELAR</ButtonModal>
                            <ButtonModal onClick={() => { addSaque(valorSaque, localStorage.getItem('cpfCLIENTE')) }} color="rgba(11, 221, 16, 0.7)" colorH="rgba(11, 221, 16, 1)">SOLICITAR</ButtonModal>
                        </ModalButtons>
                    </ModalContent>
                </ModalSaque>
            )}
        </SaquesContainer>
    )
}
