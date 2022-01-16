import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyASxLt7oWUglpCv5_jnEPgHCgl7UN_zkhs',
	authDomain: 'clone-c977f.firebaseapp.com',
	projectId: 'clone-c977f',
	storageBucket: 'clone-c977f.appspot.com',
	messagingSenderId: '966285647055',
	appId: '1:966285647055:web:6322c8949efca81a1dabba'
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();

export default db;
