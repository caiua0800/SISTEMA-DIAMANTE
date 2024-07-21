import React, { createContext, useState, useContext, useEffect } from 'react';
import { db } from '../DATABASE/firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useAuth } from './AuthContext';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    if (currentUser) {
      const fetchUserProfile = async () => {
        try {
          // Modifique para buscar pelo email
          const usersCollectionRef = collection(db, 'USERS');
          const q = query(usersCollectionRef, where('EMAIL', '==', currentUser.email));
          const querySnapshot = await getDocs(q);

          if (!querySnapshot.empty) {
            const userDoc = querySnapshot.docs[0];
            setUserProfile(userDoc.data());
          } else {
            console.log('Usuário não encontrado na base de dados.');
            setUserProfile(null); // Garantir que o estado esteja definido como null se o usuário não for encontrado
          }
        } catch (error) {
          console.error('Erro ao buscar o perfil do usuário:', error);
        }
      };

      fetchUserProfile();
    } else {
      setUserProfile(null);
    }
  }, [currentUser]);

  const value = {
    userProfile,
    setUserProfile, // Adiciona a função setUserProfile ao contexto
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);
