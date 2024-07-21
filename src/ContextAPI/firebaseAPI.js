// import React, { createContext, useContext, useState, useEffect } from 'react';
// import { firebaseApp } from './firebase'; // Certifique-se de ter o Firebase configurado
// import { getFirestore, collection, getDocs } from 'firebase/firestore';

// const FirebaseContext = createContext();

// export const useFirebase = () => useContext(FirebaseContext);

// const FirebaseProvider = ({ children }) => {
//   const [data, setData] = useState(null);
//   const db = getFirestore(firebaseApp);

//   useEffect(() => {
//     const fetchData = async () => {
//       const querySnapshot = await getDocs(collection(db, 'YOUR_COLLECTION_NAME'));
//       const docs = querySnapshot.docs.map(doc => doc.data());
//       setData(docs);
//     };

//     fetchData();
//   }, [db]);

//   return (
//     <FirebaseContext.Provider value={data}>
//       {children}
//     </FirebaseContext.Provider>
//   );
// };

// export default FirebaseProvider;
