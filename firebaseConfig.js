import { initializeApp } from '@react-native-firebase/app';
import { getAuth } from '@react-native-firebase/auth';
import { getDatabase } from '@react-native-firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyCNCAzKOlOD_eeLj0qMgn192UL2SNh2Mtc",
    authDomain: "projeto-app-compras.firebaseapp.com",
    projectId: "projeto-app-compras",
    storageBucket: "projeto-app-compras.appspot.com",
    messagingSenderId: "114296526687",
    appId: "1:114296526687:web:4a83c3fbb37756395448ea",
    measurementId: "G-6VZNQN59RR"
  };

const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp);
const database = getDatabase(firebaseApp);

export { auth, database };