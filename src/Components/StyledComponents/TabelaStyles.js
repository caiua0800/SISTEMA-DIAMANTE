import styled from 'styled-components';

export const Tabela = styled.table`
    width: 100%;
    border-collapse: collapse;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    margin-top: 20px;
`;

export const TabelaHead = styled.thead`
    // background-color: #1982C4;
`;

export const TabelaBody = styled.tbody`
    color: rgba(255, 255, 255, 0.7);
`;

export const TabelaRow = styled.tr`
    &:nth-child(even) {
        background-color: rgba(0,0,0,0.4);
        color: white;
    }

    &:hover {
        background-color: rgba(0,0,0,0.2);
    }
`;

export const TabelaHeader = styled.th`
    padding: 12px 15px;
    text-align: left;
    color: white;
    font-weight: bold;
    border-bottom: 1px solid #ddd;


`;

export const TabelaData = styled.td`
    padding: 12px 15px;
    text-align: left;
    border-bottom: 1px solid #ddd;

`;

export const Certificado = styled.div`
    width: 100%;
    box-sizing: border-box;
    padding: 2px;
    button{
        width: 100%;
        height: 100%;
        cursor: pointer;
        height: 30px;
    }
`;