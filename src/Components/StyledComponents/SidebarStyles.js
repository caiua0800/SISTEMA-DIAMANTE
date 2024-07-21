import styled from "styled-components";

export const Container = styled.div`
    position: fixed;
    box-sizing: border-box;
    margin: 10px;
    background: linear-gradient(to bottom, #001d3d, #003566);
    height: 98vh;
    top: 0;
    width: 400px;
    border-radius: 0 10px 0 0;
    z-index: 9999;
    transform: translateX(-200%);
    transition: transform 0.4s ease-in-out;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: space-between;


    &.open {
        transform: translateX(0);
    }

`;

export const LogoBox = styled.div`
    width: 100%;
    height: 15%;
    background-color: #001d3d;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;

    img{
        width: 130px;
        height: 100px;
    }

    span{
        margin: 0;
        font-weight: 800;
        color: rgba(255,255,255,0.7);
        font-size: 20px;
    }
`;


export const Mapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin: 25% 0 0 0;
    box-sizing: border-box;
    padding: 10px;
    height: 60%;

    a{
        text-decoration: none;
    }
`;

export const NavItem = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    box-sizing: border-box;
    padding: 10px;
    color: rgba(0,0,0,0.6);
    background-color: #1e96fc;
    transition: .3s;

    &:hover{
        color: rgba(0,0,0,1);
        transform: scale(1.03);
    }   
`;

export const NavLink = styled.div`
    box-sizing: border-box;
    font-size: 22px;
    font-weight: 600;
`;

export const Footer = styled.div`
    height: 15%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: .3s;
    // padding-left: 30px;
    gap: 20px;
    box-sizing: border-box;
    cursor: pointer;

    span{
        width: 60px;
        height: 60px;
        border-radius: 50%;
        color: transparent;
        box-shadow: 2px 2px 6px rgba(0,0,0,0.7);
        background-color: white;

        img{
            width: 100%;
            height: 100%;
        }
    }

    p{
        margin: 0;
        font-size: 28px;
        font-weight: 800;
        color: rgba(255, 255, 255, 0.6);
    }

    &:hover{
        transform: scale(1.1);
    }
`;

