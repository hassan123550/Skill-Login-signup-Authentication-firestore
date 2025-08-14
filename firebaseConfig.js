import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDQ_3-JYHR0vo6H-NvciCYcT_qSNLHa8eI",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "skill-67e15",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "1:889282922840:android:aebd38aaee28a51a763d2d"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };






