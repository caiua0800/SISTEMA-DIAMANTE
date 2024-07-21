// firebaseService.js
import { getFirestore, doc, writeBatch , getDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { signOut, getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../DATABASE/firebaseConfig'
import { formatDate, gerarStringAleatoria } from '../ASSETS/utils';

export const fetchUserProfile = async (db, cpf) => {
    const docRef = doc(db, 'USERS', cpf);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return docSnap.data();
    } else {
        throw new Error("No such document!");
    }
};

// Função para atualizar dados do usuário
export const updateUserProfile = async (cpf, updatedData) => {
    try {
        // Referência ao documento do usuário com base no CPF
        const userDocRef = doc(db, 'USERS', cpf);
        // Atualiza o documento com os novos dados
        await updateDoc(userDocRef, updatedData);
    } catch (error) {
        console.error('Error updating document: ', error);
    }
};

// Função para fazer upload da foto de perfil
export const uploadProfilePicture = async (file, cpf) => {
    const storage = getStorage();
    const storageRef = ref(storage, `profile_pictures/${cpf}/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    await uploadTask;
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
};



export const handleLogout = async () => {
    try {
        await signOut(auth);
        // Redirecione o usuário para a página de login ou para onde você quiser
        window.location.href = '/login'; // Ou use um roteador para redirecionar
    } catch (error) {
        console.error('Error signing out: ', error);
    }
};

export async function handlePostTokenPurchase(userProfile, email, password, paymentMethod, contratos) {
    try {
        if (userProfile.EMAIL !== email) {
            alert("Email inválido");
            return;
        }
        console.log(contratos)

        // Crie um array de contratos com quantidade maior que 0
        const contratosValidos = contratos.filter(contract => contract.qtd > 0);

        if (contratosValidos.length === 0) {
            throw new Error("Nenhum contrato válido para compra.");
        }

        // Referência ao documento do usuário usando o CPF
        const userDocRef = doc(db, 'USERS', userProfile.CPF);

        // Verifique se o documento existe
        const userDocSnap = await getDoc(userDocRef);

        if (!userDocSnap.exists()) {
            throw new Error("Documento do usuário não encontrado.");
        }

        // Atualize o array 'CONTRATOS' dentro do documento do usuário
        const batch = writeBatch(db);

        contratosValidos.forEach(contract => {
            // Crie um contrato para cada quantidade
            for (let i = 0; i < contract.qtd; i++) {
                const today = new Date();
                const nextYear = new Date();
                nextYear.setFullYear(today.getFullYear() + 1);

                // Defina os valores padrão para campos obrigatórios
                const contrato = {
                    PURCHASEDATE: formatDate(today),
                    ALLOWSELL: formatDate(nextYear),
                    IDCOMPRA: `${new Date().getTime() + i}`, // Gerar um ID único para cada contrato
                    STATUS: false,
                    TOTALSPENT: contract.value || 0, // Defina um valor padrão se contract.value estiver indefinido
                    PAYMENTMETHOD: paymentMethod || '', // Defina um valor padrão se paymentMethod estiver indefinido
                    VISTO: false,
                    LUCRO_OBTIDO: 0, // Definido como 0
                    TIPOCONTRATO: contract.title || 'CONTRATO NÃO ESPECIFICADO' // Defina um valor padrão se contract.title estiver indefinido
                };

                // Verifique se todos os campos são válidos
                if (Object.values(contrato).some(value => value === undefined || value === null)) {
                    throw new Error("Um ou mais campos do contrato estão indefinidos.");
                }

                // Adiciona o contrato ao array 'CONTRATOS' do documento do usuário
                batch.update(userDocRef, {
                    CONTRATOS: arrayUnion(contrato)
                });
            }
        });

        // Commit the batch
        await batch.commit();

        return "Compra confirmada com sucesso!";
    } catch (error) {
        console.error("Erro ao confirmar a compra:", error);
        throw new Error(`Erro ao confirmar a compra: ${error.message}`);
    }
}