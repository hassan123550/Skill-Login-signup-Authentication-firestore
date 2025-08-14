import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ActivityIndicator,
  TouchableOpacity,
  BackHandler
} from 'react-native';
import { onAuthStateChanged, signOut, deleteUser } from 'firebase/auth';
import { doc, getDoc, deleteDoc } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig';

const HomeScreen = ({ navigation }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const ref = doc(db, 'users', user.uid);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          setUserData(snap.data());
        }
        setLoading(false);
      } else {
        navigation.replace('Login');
      }
    });

   
    const backAction = () => {
      navigation.replace('Login');
      return true;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);


    return () => {
      backHandler.remove();
      unsubscribeAuth();
    };
  }, []);

  const logout = async () => {
    await signOut(auth);
    navigation.replace('Login');
  };

  const deleteUserAccount = async () => {
    try {
      const uid = auth.currentUser.uid;
      await deleteDoc(doc(db, 'users', uid));
      await deleteUser(auth.currentUser);
      alert('Account & data deleted!');
      navigation.replace('Signup');
    } catch (error) {
      console.error('Delete Error:', error.message);
      alert('err' + error.message);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="skyblue" />
        <Text style={{ color: '#fff', marginTop: 10 }}>Loading...</Text>
      </View>
    );
  }

  return (
    <ImageBackground source={{ uri: 'https://i.sstatic.net/uD9js.png' }} style={styles.imgback}>
      <View style={styles.container}>
        <Text style={styles.title}>Welcome: {userData?.name}</Text>
        <Text style={styles.email}>Email: {userData?.email}</Text>

        <TouchableOpacity style={styles.button} onPress={logout}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, { backgroundColor: 'crimson' }]} onPress={deleteUserAccount}>
          <Text style={styles.buttonText}>Delete My Account</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  imgback: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    color: '#fff',
  },
  email: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'skyblue',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
    width: '70%',
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default HomeScreen;



