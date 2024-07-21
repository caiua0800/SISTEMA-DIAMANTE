import React, { useState } from "react";
import styled from "styled-components";
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

import { db, auth } from "../DATABASE/firebaseConfig";

export default function SignUpPage() {
    const [cpf, setCpf] = useState('');
    const [phone, setPhone] = useState('+55 ');
    const [profilePicture, setProfilePicture] = useState(null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [name, setName] = useState("");
    const [adress, setAdress] = useState("");
    const [neighborhood, setNeighborhood] = useState("");
    const [cep, setCep] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [load, setLoad] = useState(false);

    const formatCpf = (value) => {
        value = value.replace(/\D/g, '');
        value = value.replace(/(\d{3})(\d)/, '$1.$2');
        value = value.replace(/(\d{3})(\d)/, '$1.$2');
        value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
        return value;
    };

    const handleCpfChange = (event) => {
        const value = event.target.value;
        setCpf(formatCpf(value));
    };

    const formatPhone = (value) => {
        value = value.replace(/\D/g, '');
        value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
        value = value.replace(/(\d{5})(\d{4})$/, '$1-$2');
        return value;
    };

    const handlePhoneChange = (event) => {
        let value = event.target.value.replace('+55 ', '');
        if (value.length <= 14) {
            value = formatPhone(value);
            setPhone('+55 ' + value);
        }
    };

    const handlePhoneFocus = () => {
        if (phone === '') {
            setPhone('+55 ');
        }
    };

    function getTodayDate() {
        const today = new Date();
        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0'); // Meses são baseados em zero
        const year = today.getFullYear();

        return `${day}/${month}/${year}`;
    }

    const handleSignUp = async () => {
        setLoad(true);

        if (email !== '' && password !== '' && password2 !== '' && name !== '' &&
            phone !== '' && adress !== "" && neighborhood !== "" && cep !== "" && city !== ""
            && state !== "") {
            if (password !== password2) {
                alert("As senhas não coincidem!");
                setLoad(false);
                return;
            }

            try {
                // Cria o usuário no Firebase Authentication
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;
                console.log('Usuário criado com sucesso!', user);

                const firestore = getFirestore();
                const userRef = doc(firestore, 'USERS', cpf.replace(/\D/g, ''));
                await setDoc(userRef, {
                    NAME: name.toUpperCase(),
                    EMAIL: email,
                    CPF: cpf.replace(/\D/g, ''),
                    PROFILE_PICTURE_URL: 'downloadURL',
                    ADRESS: adress.toUpperCase(),
                    NEIGHBORHOOD: neighborhood.toUpperCase(),
                    POSTALCODE: cep,
                    CITY: city.toUpperCase(),
                    STATE: state.toUpperCase(),
                    CONTACT: phone,
                    INDICATIONBUDGET: 0,
                    VALORSACADO: 0,
                    DATACRIACAO: getTodayDate(),
                    CONTEMFOTOPERFIL: 0
                });
                console.log('Documento criado com sucesso com o ID:', cpf);

                alert('Usuário cadastrado com sucesso!');
                setLoad(false);
                
            } catch (error) {
                console.error('Erro ao cadastrar usuário:', error.message);
                alert('Erro ao cadastrar usuário: ' + error.message);
                setLoad(false);
            }
        } else {
            setLoad(false);
            alert("Preencha todos os campos");
        }
    };

    const handleGetBack = () => {
        window.location.href = '/'
    }

    return (
        <>
    
            <SignUpContainer>
                <GetBack onClick={handleGetBack}>
                    <button>
                        VOLTAR
                    </button>
                </GetBack>
                <ContainerContent>
                    <SingUpBox>
                        <h1>FAÇA SEU CADASTRO E SEJA UM INVESTIDOR EM NOSSA PLATAFORMA</h1>

                        {/* <PerfilPictureArea>
                        <Picture>
                            {profilePicture ? <img src={profilePicture} alt="Perfil" /> : <Placeholder />}
                            <input type="file" accept="image/*" onChange={handleProfilePictureChange} />
                        </Picture>
                        Foto de Perfil
                    </PerfilPictureArea> */}

                        <Form>
                            <FormGroup>
                                <h2>Nome Completo</h2>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </FormGroup>
                            <FormGroup>
                                <h2>CPF</h2>
                                <input
                                    type="text"
                                    value={cpf}
                                    onChange={handleCpfChange}
                                    maxLength="14" // Máximo de caracteres no formato 000.000.000-00
                                />
                            </FormGroup>
                            <FormGroup>
                                <h2>EMAIL</h2>
                                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            </FormGroup>
                            <FormGroup>
                                <h2>CONTATO (WHATSAPP)</h2>
                                <input
                                    type="text"
                                    value={phone}
                                    onChange={handlePhoneChange}
                                    onFocus={handlePhoneFocus}
                                    maxLength="19" // Máximo de caracteres no formato +55 (99) 99999-9999
                                />
                            </FormGroup>

                            <FormGroup>
                                <h2>ENDEREÇO</h2>
                                <input
                                    type="text"
                                    value={adress}
                                    onChange={(e) => setAdress(e.target.value)}
                                />
                            </FormGroup>

                            <FormGroup>
                                <h2>BAIRRO</h2>
                                <input
                                    type="text"
                                    value={neighborhood}
                                    onChange={(e) => setNeighborhood(e.target.value)}
                                />
                            </FormGroup>

                            <FormGroup>
                                <h2>CEP</h2>
                                <input
                                    type="text"
                                    value={cep}
                                    onChange={(e) => setCep(e.target.value)}
                                    maxLength="8" // Máximo de caracteres no formato 00000-000
                                />
                            </FormGroup>

                            <FormGroup>
                                <h2>CIDADE</h2>
                                <input
                                    type="text"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                />
                            </FormGroup>

                            <FormGroup>
                                <h2>ESTADO</h2>
                                <input
                                    type="text"
                                    value={state}
                                    onChange={(e) => setState(e.target.value)}
                                />
                            </FormGroup>

                            <FormGroupPass>
                                <h2>Crie Sua Senha</h2>
                                <div>
                                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Digite A Senha" />
                                    <input value={password2} onChange={(e) => setPassword2(e.target.value)} type="password" placeholder="Repita A Senha" />
                                </div>
                            </FormGroupPass>
                        </Form>
                        <button onClick={handleSignUp}>FINALIZAR CADASTRO</button>
                    </SingUpBox>
                </ContainerContent>
            </SignUpContainer>
        </>
    );
}

const GetBack = styled.div`
    width: 100%;
    justify-content: start;
    padding: 20px;
    box-sizing: border-box;

    button{
        cursor: pointer;
        padding: 0px 10px;
        color: white;
        background-color: black;
    }
`;

const SignUpContainer = styled.div`
    width: 100%;
    background-color: #202020;
    height: max-content;
    display: flex;
    justify-content: center;
    box-sizing: border-box;
    align-items: center;
    flex-direction: column;
`;

const ContainerContent = styled.div`
    width: 100%;
    height: max-content;
    box-sizing: border-box;
    padding: 20px 40px;
    text-align: center;

    button{
        width: 100%;
        height: 40px;
        border: 0;
        background-color: #10db22;
        border-radius: 12px;
        transition: 0.5s;
        color: white;
        cursor: pointer;
        margin-top: 10px;
    }

    button:hover{
        background-color: #0a9900;
    }
`;

const SingUpBox = styled.div`
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    background-color: #ffffff;
    border-radius: 12px;
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);

    h1{
        color: black;
        font-size: 20px;
        margin-bottom: 10px;
    }

    h2{
        color: black;
        font-size: 16px;
        margin-bottom: 5px;
    }
`;

const Form = styled.div`
    width: 100%;
    margin: 0 auto;
    max-width: 400px;
    box-sizing: border-box;
`;

const FormGroup = styled.div`
    width: 100%;
    margin-bottom: 15px;
    box-sizing: border-box;

    input {
        width: 100%;
        padding: 10px;
        border-radius: 6px;
        border: 1px solid #ccc;
        box-sizing: border-box;
    }
`;

const FormGroupPass = styled.div`
    width: 100%;
    margin-bottom: 15px;
    box-sizing: border-box;

    div{
        width: 100%;
        display: flex;
        justify-content: space-between;
        box-sizing: border-box;

        input {
            width: 48%;
            padding: 10px;
            border-radius: 6px;
            border: 1px solid #ccc;
            box-sizing: border-box;
        }
    }
`;

const PerfilPictureArea = styled.div`
    width: 100%;
    text-align: center;
    margin-bottom: 20px;
`;

const Picture = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    height: 150px;
    border: 2px dashed #ccc;
    border-radius: 8px;
    background-color: #f4f4f4;

    img{
        max-width: 100%;
        max-height: 100%;
        border-radius: 8px;
    }

    input[type="file"]{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
        cursor: pointer;
    }
`;

const Placeholder = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    color: #999;
    font-size: 18px;
`;
