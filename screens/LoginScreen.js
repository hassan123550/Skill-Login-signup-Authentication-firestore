import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Alert } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';  

const loginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required email'),
  password: Yup.string().required('Required Password'),
});

const LoginScreen = ({ navigation }) => {
  const handleLogin = async (values) => {
    try {
      await signInWithEmailAndPassword(auth, values.email.trim(), values.password);
      Alert.alert('Login successful');
      navigation.replace('Home');
    } catch (error) {
      Alert.alert('Login Error', error.message);
    }
  };


  return (
    <ImageBackground source={{ uri: 'https://e0.pxfuel.com/wallpapers/14/851/desktop-wallpaper-dark-blue-gradient-android.jpg' }} style={styles.imageback}>
      <Text style={styles.title}>Login</Text>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={loginSchema}
        onSubmit={handleLogin}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <>
            <TextInput placeholder="Email" style={styles.input}
              onChangeText={handleChange('email')} onBlur={handleBlur('email')} value={values.email} />
            {touched.email && errors.email && <Text style={styles.erroremail}>{errors.email}</Text>}

            <TextInput placeholder="Password" secureTextEntry style={styles.input}
              onChangeText={handleChange('password')} onBlur={handleBlur('password')} value={values.password} />
            {touched.password && errors.password && <Text style={styles.errorpass}>{errors.password}</Text>}

            <TouchableOpacity onPress={handleSubmit} style={styles.button}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
              <Text style={{ textAlign: 'center', marginTop: 10, color: '#fff' }}>Don't have an account? Sign up</Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>
    </ImageBackground>
  );
};


const styles = StyleSheet.create({
    imageback: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        alignItems: 'center',
    },
    title: {
        fontSize: 40,
        marginBottom: 20,
        textAlign: 'center',
        color: '#fff',
        fontWeight:'bold'
    },
    input: {
        borderWidth:1,
        borderColor:'#fff',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
        margin: 15,
        width: '90%',
        color:'#fff'
    },

    erroremail: {
        marginTop: -10,
        marginLeft: -205,
        fontSize: 12,
        color: 'red',
    },
    errorpass: {
        marginTop: -10,
        marginLeft: -180,
        fontSize: 12,
        color: 'red',
    },
    button: {
        backgroundColor: 'skyblue',
        padding: 12,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20,
        width: '60%'
    },
    buttonText: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 16,
    },
});


export default LoginScreen;