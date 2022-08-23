import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, FacebookAuthProvider} from "firebase/auth";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH,
    projectId: "gotocourse-d9cef",
    storageBucket: "gotocourse-d9cef.appspot.com",
    messagingSenderId: "21582427414",
    appId: "REACT_APP_FIREBASE_ID",
    measurementId: "G-FMDCXEDNCN"
};

const app = initializeApp(firebaseConfig);

export const authentication = getAuth(app)
export const provider = new GoogleAuthProvider()
export const facebookProvider = new FacebookAuthProvider();