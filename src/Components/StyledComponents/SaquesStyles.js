import styled from "styled-components";

export const SaquesContainer = styled.div`
    width: 100%;
    min-height: 100vh;
    overflow: hidden;
    // background: linear-gradient(to right, #CDE8E5, #EEF7FF, #CDE8E5, #EEF7FF);
    background: linear-gradient(to right, #171718, #171718, #171718);
    box-sizing: border-box;
    padding: 50px 30px 200px 30px;
    display: flex;
    flex-direction: column;
    position: relative;
    @media (max-width: 800px){
        flex-direction: column;
        justify-content: center;
        padding: 60px 10px 100px 10px;
    }
`;

export const ContainerTitle = styled.div`
    width: 100%;
    font-size: 28px;
    font-weight: 600;
    color: #31d0e3;
    transition: .5s;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;

    span{
        font-size: 28px;
    }
    p{
        margin: 0;
    }
    &:hover{
        padding: 0px 0px 0px 10px;
        color: #c0c0c3;
    }
    @media (max-width: 800px){
        flex-direction: column;
        span{
            font-size: 16px;
        }
    }
`;

export const ValoresDisponiveis = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    margin-top: 30px;
    box-sizing: border-box;
    padding: 30px;
    box-shadow: 3px 3px 4px rgba(0,0,0,0.6);

    background: linear-gradient(-65deg, #3288be, #31d0e3);

    div{
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        p{
            margin: 0;
            color: white;
            font-weight: 800;
            font-size: 28px;
            text-shadow: 2px 2px 1px rgba(0,0,0,0.4);
        }

        span{
            color: #b5c806;
            font-weight: 800;
            font-size: 28px;
            text-shadow: 2px 2px 1px rgba(0,0,0,0.4);
            margin: 0;
        }
    }
`;


export const Info = styled.div`
    width: 100%;
    text-align: center;
    margin-top: 50px;
    font-weight: 600;
    font-size: 22px;
    color: white;

    p{
        color: #e4b61a;
    }

    @media (max-width: 800px) {
        font-size: 14px;
        margin-top: 30px;
        text-align: justify;
    }
`;


export const InformacaoSobreSaque = styled.div`
    margin-top: 40px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;

    button{
        height: 40px;
        width: 400px;

        cursor: pointer;
    }

`;

export const SaqueInfoBox = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    box-sizing: border-box;
    width: 400px;

    h2{
        margin: 0;
        color: white;
    }

    input, select{
        width: 100%;
        box-sizing: border-box;
        height: 35px;

        font-size: 18px;
    }

`;