import React from "react";
import { Link } from "react-router-dom";
import * as S from './StyledComponents/SidebarStyles';
import { Icons } from "../ASSETS/Icons";
import { useUser } from "../ContextAPI/UserContext";

export const Sidebar = ({ isOpen }) => {

    const { userProfile, setUserProfile } = useUser();


    return (
        <S.Container className={isOpen ? "open" : "closed"}>
            <S.LogoBox>
                <img src={Icons.DiamondIcon} alt="Diamond Icon" />
                <span>DIAMOND SYSTEM</span>
            </S.LogoBox>
            <S.Mapper>
                <Link to="/">
                    <S.NavItem>
                        <S.NavLink>HOME</S.NavLink>

                    </S.NavItem>
                </Link>

                <Link to="/novocontrato">
                    <S.NavItem>
                        <S.NavLink>NOVO CONTRATO</S.NavLink>
                    </S.NavItem>
                </Link>
                <Link to="/">
                    <S.NavItem>
                        <S.NavLink>SACAR</S.NavLink>
                    </S.NavItem>
                </Link>
                <Link to="/">
                    <S.NavItem>
                        <S.NavLink>NEWS</S.NavLink>
                    </S.NavItem>
                </Link>
                <Link to="/">
                    <S.NavItem>
                        <S.NavLink>VALIDAR DOCS</S.NavLink>
                    </S.NavItem>
                </Link>
            </S.Mapper>


            <S.Footer onClick={() => {window.location.href = '/usuario'}}>
                <span>
                    <img src={(userProfile && userProfile.CONTEMFOTOPERFIL) ? userProfile.PROFILEIMAGE : Icons.DefaultUserImage} />
                </span>
                <p>CAIUÃ MELLO</p>
            </S.Footer>
        </S.Container>
    );
};
