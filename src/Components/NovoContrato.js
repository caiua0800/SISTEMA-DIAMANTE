import React, { useState, useEffect } from "react";
import * as N from './StyledComponents/NovoContratoStyles';
import { useUser } from "../ContextAPI/UserContext";
import { useContratos } from '../ContextAPI/ContratosContext';
import { handlePostTokenPurchase } from '../ContextAPI/firebaseService';
import { formatarMoedaBrasil } from "../ASSETS/utils";
import ContractComponent from "./ContractComponent";

export default function NovoContrato({ darkMode }) {
    const { userProfile } = useUser();
    const { calcularValoresContratos } = useContratos();
    const {
        tokensObtidos,
        saldoTotal,
        lucroTotal,
        saldoContratosVencidos,
        totalInvestido,
        saldoDeRecompra
    } = calcularValoresContratos();

    const [quantidades, setQuantidades] = useState([0, 0, 0]);
    const [paymentMethod, setPaymentMethod] = useState("PIX");
    const [showModal, setShowModal] = useState(false);
    const [emailConfirmacao, setEmailConfirmacao] = useState("");
    const [senhaConfirmacao, setSenhaConfirmacao] = useState("");
    const [load, setLoad] = useState(false);
    const [hasAgreed, setHasAgreed] = useState(false);

    const valores = [1000, 5000, 10000];
    const [valorCompra, setValorCompra] = useState(0);

    useEffect(() => {
        const total = quantidades.reduce((acc, quantidade, index) => acc + quantidade * valores[index], 0);
        setValorCompra(total);
    }, [quantidades]);

    const formatNumber = (number) => {
        return parseFloat(number).toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
    };

    const handlePaymentMethodChange = (e) => {
        setPaymentMethod(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmailConfirmacao(e.target.value);
    };

    const handleSenhaChange = (e) => {
        setSenhaConfirmacao(e.target.value);
    };

    const handleIncrement = (index) => {
        setQuantidades((prevQuantidades) => {
            const newQuantidades = [...prevQuantidades];
            newQuantidades[index] += 1;
            return newQuantidades;
        });
    };

    const handleDecrement = (index) => {
        setQuantidades((prevQuantidades) => {
            const newQuantidades = [...prevQuantidades];
            if (newQuantidades[index] > 0) {
                newQuantidades[index] -= 1;
            }
            return newQuantidades;
        });
    };
    
    const handlePostTokenPurchaseWrapper = async () => {
        try {
            setLoad(true);
    
            // Cria uma lista de contratos com quantidade maior que 0 e inclui o título
            const contratos = [
                { title: "CONTRATO 1", qtd: quantidades[0], value: valores[0] },
                { title: "CONTRATO 2", qtd: quantidades[1], value: valores[1] },
                { title: "CONTRATO 3", qtd: quantidades[2], value: valores[2] }
            ].filter(contract => contract.qtd > 0);
    
            const message = await handlePostTokenPurchase(
                userProfile,
                emailConfirmacao,
                senhaConfirmacao,
                paymentMethod,
                contratos
            );
            alert(message);
            setShowModal(false);
        } catch (error) {
            alert(error.message);
        } finally {
            setLoad(false);
        }
    };

    const handleCancel = () => {
        setShowModal(false);
    };

    const handleAgreeChange = (e) => {
        setHasAgreed(e.target.checked);
    };

    const handleConfirmPurchase = () => {
        if (quantidades.every(quantidade => quantidade === 0)) {
            alert("Por favor, selecione pelo menos um contrato.");
        } else {
            setShowModal(true);
        }
    };

    const contractData = [
        { title: "CONTRATO 1", qtd: quantidades[0], value: valores[0], term: "1 ano", payout: "Mensal", finalProfit: "30%" },
        { title: "CONTRATO 2", qtd: quantidades[1], value: valores[1], term: "1 ano", payout: "A cada 15 dias", finalProfit: "30%" },
        { title: "CONTRATO 3", qtd: quantidades[2], value: valores[2], term: "1 ano", payout: "Semanal", finalProfit: "30%" }
    ];

    return (
        <N.TokenContainer>
            <N.FirstDiv>
                <h4>Saldo de Indicação</h4>
                <h4 className="value-different">U$ {userProfile && formatNumber(userProfile.INDICATIONBUDGET)}</h4>
            </N.FirstDiv>

            <N.BuyTokenArea>
                {contractData.map((contract, index) => (
                    <N.ContractBox key={index}>
                        <N.ContractTitle>{contract.title}</N.ContractTitle>
                        <N.ContractInfo>
                            <p>Recompra: <span>{contract.term}</span></p>
                            <p>Valor: <span>{formatarMoedaBrasil(contract.value)}</span></p>
                            <p>Lucro Final: <span>{contract.finalProfit}</span></p>
                            <p>Tipo Saque: <span>{contract.payout}</span></p>
                        </N.ContractInfo>
                        <N.QttBox>
                            <button onClick={() => handleDecrement(index)}>-</button>
                            <input type="number" value={contract.qtd} readOnly />
                            <button onClick={() => handleIncrement(index)}>+</button>
                        </N.QttBox>
                    </N.ContractBox>
                ))}
            </N.BuyTokenArea>
            <N.ValorDaCompra>
                <h3>VALOR DA COMPRA: </h3>
                <p>{formatarMoedaBrasil(valorCompra)}</p>
            </N.ValorDaCompra>

            <N.PayForm>
                <h3>MÉTODO DE PAGAMENTO: </h3>
                <select value={paymentMethod} onChange={handlePaymentMethodChange}>
                    <option value="PIX">PIX</option>
                    <option value="DEPÓSITO BANCÁRIO">DEPÓSITO BANCÁRIO</option>
                    <option value="SALDO DE INDICAÇÃO">SALDO DE INDICAÇÃO</option>
                </select>
            </N.PayForm>

            <N.ButtonArea>
                <N.TokenButton onClick={handleConfirmPurchase}>
                    Confirmar Compra
                </N.TokenButton>
            </N.ButtonArea>

            {showModal && (
                <N.Modal>
                    <N.ModalContent>
                        <ContractComponent userData={userProfile} contracts={contractData.filter(contract => contract.qtd > 0)} paymentMethod={paymentMethod} />

                        <h3>Confirme a Compra</h3>
                        <N.InputField
                            type="email"
                            value={emailConfirmacao}
                            onChange={handleEmailChange}
                            placeholder="Digite o e-mail para confirmar"
                        />
                        <N.InputField
                            type="password"
                            value={senhaConfirmacao}
                            onChange={handleSenhaChange}
                            placeholder="Digite a senha para confirmar"
                        />
                        <N.AgreeCheckbox>
                            <input
                                type="checkbox"
                                checked={hasAgreed}
                                onChange={handleAgreeChange}
                            />
                            <label>Concordo com os termos e condições</label>
                        </N.AgreeCheckbox>
                        <N.ModalButtons>
                            <N.Button onClick={handleCancel} className="cancelar">Cancelar</N.Button>
                            <N.Button onClick={handlePostTokenPurchaseWrapper} disabled={!hasAgreed}>
                                Confirmar
                            </N.Button>
                        </N.ModalButtons>
                    </N.ModalContent>
                </N.Modal>
            )}
        </N.TokenContainer>
    );
}
