import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyC-xseO9MMM25ZJU-1rzevvpSgxQvli9es",
    authDomain: "task-manager-964a0.firebaseapp.com",
    projectId: "task-manager-964a0",
    storageBucket: "task-manager-964a0.firebasestorage.app",
    messagingSenderId: "915161580553",
    appId: "1:915161580553:web:ea903de4c1884dd04a24d8"
  };

const app = initializeApp(firebaseConfig);
const auth= getAuth(app);
const provider= new GoogleAuthProvider();
export {auth,provider};