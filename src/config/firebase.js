import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAwOQCgyW_9vQ-EVL6h0FlS_cMr1PEpwqw",
  authDomain: "stock-app-f4536.firebaseapp.com",
  projectId: "stock-app-f4536",
  storageBucket: "stock-app-f4536.appspot.com",
  messagingSenderId: "721144633074",
  appId: "1:721144633074:web:001af0204c86eec5b4e26b"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);