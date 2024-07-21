import styled from 'styled-components';

export const DashboardContainer = styled.div`
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

export const ContainerContent = styled.div`
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-top: 20px;
    @media (max-width: 800px){
        flex-direction: column;
        gap: 20px;
    }
`;

export const FirstRow = styled.div`
    margin-top: 30px;
    width: 100%;   
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    gap: 20px;

    @media (max-width: 800px){
        flex-direction: column;
    }
`;

export const FirstRowBox = styled.div`
    width: 100%;
    height: 350px;
    // border: 1px solid rgba(0,0,0,0.3);
    border-radius: 20px;
    box-shadow: 3px 3px 3px rgba(0,0,0,0.5);
    box-sizing: border-box;
    justify-content: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px 20px;
    position: relative;
    h1{
        font-size: 22px;
        margin: 0;
        color: rgba(0,0,0,0.7);
    }


`;

export const ContratosAtivos = styled(FirstRowBox)`

    background: linear-gradient(-60deg, #3d4763, #3288be, #31d0e3);

    span{
        margin-top: 20px;
        font-size: 72px;
        font-weight: 800;
        transition: .3s;
        cursor: pointer;
        
        &:hover{
            color: #EEF5FF;
            text-shadow: 2px 2px 1px rgba(0,0,0,0.3);
        }
    }
`;

export const SaldoCorrente = styled(FirstRowBox)`
    // background: linear-gradient(to right, #8AC926, #8AC926);
    background: linear-gradient(-60deg, #3d4763, #3288be, #31d0e3);

`;

export const SaldoNaPlataforma = styled.div`
    whith: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    h2{
        margin: 0;
        color: rgba(0,0,0,0.7);
    }

    span{
        margin-top: 10px;
        color: white;
        font-size: 38px;
        text-shadow: 2px 2px 1px rgba(0,0,0,0.4);
        font-weight: 800;
    }
    
`;

export const SaldoPlataformaDivs = styled.div`

    width: 100%;
    display: flex;
    gap: 20px;
    margin-top: 30px;
    justify-content: space-between;

    div{
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;

        h3{
            width: max-content;
            margin: 0;
            font-size: 18px;
            font-weight: 600;
            color: #31d0e3;
            text-shadow: 2px 2px 1px rgba(0, 0, 0,0.4);
        }

        span{
            margin: 0;
            font-size: 18px;
            font-weight: 600;
            text-shadow: 2px 2px 1px rgba(0,0,0,0.4);
            color: white;
        }
    }

    @media (max-width: 500px){
        flex-direction: column;
    }
`;


export const ProgressBar = styled.div`
    position: absolute;
    bottom: 10px;
    left: 20px; 
    right: 20px;
    height: 10px;
    background-color: #ffff; 
    overflow: hidden;
`;

export const ProgressFill = styled.div`
    width: ${props => props.percentage}%;
    height: 100%;
    background-color: rgba(99, 253, 15, 0.8);
    transition: width 4s ease;
`;

export const PercentageCount = styled.div`
    position: absolute;
    bottom: 30px;
    left: 50px;
    color: white;
    cursor: pointer;
    width: 60px;
    text-align: center;
    border-radius: 20px;
    font-weight: 600;
    background-color: rgba(99, 253, 15, 0.8);
    @media (max-width: 800px){
        width: 40px;
        font-size: 12px;
    }
`;

export const SecondRow = styled.div`
    width: 100%;
    height: max-content;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: 40px;
    margin-top: 40px;

    @media (max-width: 800px) {
        flex-direction: column;
    }

    h1 {
        text-align: center;
        margin: 0;
        color: #31d0e3;
    }
`;

export const SaldoDisponivelParaSaque = styled.div`
    position: relative;
`;

export const IndiqueEGanha = styled.div`
    width: 100%;
    padding: 20px;
    box-shadow: 2px 3px 6px rgba(0,0,0,0.67);
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;


    p{
        color: #3288be;
        margin: 0;
    }
    span{
        color: #31d0e3;
        cursor: pointer;
    }
`;


export const ThirdRow = styled.div`
    margin-top: 40px;
    text-align: center;
    h2{
        margin: 0;
        font-size: 28px;
        color: #c0c0c3;
        text-shadow: 2px 2px 1px rgba(0,0,0,0.6);
    }
`;

export const TabelaContainer = styled.div`
    width: 100%;
    box-sizing: border-box;
    padding: 20px 30px;
    overflow-y: scroll;
    max-height: 400px;

`;