import React from 'react';
import {
    Tabela,
    TabelaHead,
    TabelaBody,
    TabelaRow,
    TabelaHeader,
    TabelaData,
    Certificado
} from './StyledComponents/TabelaStyles';

import { formatarMoedaBrasil, isDateAfterToday } from '../ASSETS/utils';

const contratoAceitoOuNegado = (dado) => {
    if (dado.VISTO && !dado.STATUS && isDateAfterToday(dado.ALLOWSELL))
        return 0;
    else if (dado.VISTO && dado.STATUS && isDateAfterToday(dado.ALLOWSELL))
        return 1;
    else if (!dado.VISTO && !dado.STATUS && isDateAfterToday(dado.ALLOWSELL))
        return -1;
    else return 2;
}

const retornaResposta = (dado) => {
    var res = contratoAceitoOuNegado(dado);

    if (res === 1)
        return 'VALORIZANDO';
    else if (res === 0)
        return 'NEGADO';
    else if (res == -1)
        return 'PENDENTE';
    else return "CONTRATO FINALIZADO";
}

const modeloCertificado = 'https://firebasestorage.googleapis.com/v0/b/sistema-diamante.appspot.com/o/iconesEImagens%2FmodeloCerificadoDiamante.jpeg?alt=media&token=e9254f99-afad-4f46-8673-3961b6937cf6';

const TabelaDeContratos = ({ dados = [] }) => {
    const handleOpenCertificado = (url) => {
        window.open(url, '_blank');
    };

    return (
        <Tabela>
            <TabelaHead>
                <TabelaRow>
                    <TabelaHeader>Cód.</TabelaHeader>
                    <TabelaHeader>TIPO</TabelaHeader>
                    <TabelaHeader>DATA DA COMPRA</TabelaHeader>
                    <TabelaHeader>DATA DE RECOMPRA</TabelaHeader>
                    <TabelaHeader>VALOR</TabelaHeader>
                    <TabelaHeader>LUCRO OBTIDO</TabelaHeader>
                    <TabelaHeader>VALOR TOTAL</TabelaHeader>
                    <TabelaHeader>STATUS</TabelaHeader>
                    <TabelaHeader>CERTIFICADO</TabelaHeader>
                </TabelaRow>
            </TabelaHead>
            <TabelaBody>
                {dados.length === 0 ? (
                    <TabelaRow>
                        <TabelaData colSpan="9">Ainda não há contratos.</TabelaData>
                    </TabelaRow>
                ) : (
                    dados.map((dado, index) => (
                        <TabelaRow key={index}>
                            <TabelaData>{dado.IDCOMPRA}</TabelaData>
                            <TabelaData>{dado.TIPOCONTRATO}</TabelaData>
                            <TabelaData>{dado.PURCHASEDATE}</TabelaData>
                            <TabelaData>{dado.ALLOWSELL}</TabelaData>
                            <TabelaData>{formatarMoedaBrasil(dado.TOTALSPENT)}</TabelaData>
                            <TabelaData>{(dado.LUCRO_OBTIDO || 0)}%</TabelaData>
                            <TabelaData>{formatarMoedaBrasil(dado.TOTALSPENT + (dado.TOTALSPENT * (dado.LUCRO_OBTIDO/100)))}</TabelaData>
                            <TabelaData>{retornaResposta(dado)}</TabelaData>
                            <TabelaData>
                                <Certificado>
                                    <button onClick={() => handleOpenCertificado(modeloCertificado)}>VER</button>
                                </Certificado>
                            </TabelaData>
                        </TabelaRow>
                    ))
                )}
            </TabelaBody>
        </Tabela>
    );
}

export default TabelaDeContratos;
