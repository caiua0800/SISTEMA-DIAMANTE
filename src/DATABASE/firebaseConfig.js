import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyBsDIFkrNoQQMY0Xb3Jp-HJDUloSeZ6chQ",
    authDomain: "sistema-diamante.firebaseapp.com",
    projectId: "sistema-diamante",
    storageBucket: "sistema-diamante.appspot.com",
    messagingSenderId: "651170784596",
    appId: "1:651170784596:web:33a7c1f0033ee99bdd94c1"
};
  
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);