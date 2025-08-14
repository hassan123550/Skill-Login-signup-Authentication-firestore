import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, ScrollView, Alert } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig';  

const signupSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6, 'Minimum 6 characters').required('Password is required'),
  confirmPassword: Yup.string().oneOf([Yup.ref('password')], 'Pass* do not match').required('Confirm Password'),
});

const SignupScreen = ({ navigation }) => {
  const handleSignup = async (values) => {
    const { name, email, password } = values;

    try {
    
      const userCredential = await createUserWithEmailAndPassword(auth, email.trim(), password);

      await setDoc(doc(db, "users", userCredential.user.uid), {
        uid: userCredential.user.uid,
        name,
        email: email.trim()
      });

      Alert.alert('Success', 'Account created successfully!');
      navigation.navigate('Login');

    } catch (error) {
      Alert.alert('Signup Error', error.message);
    }
  };

  return (
    <ImageBackground source={{ uri: 'https://img.freepik.com/premium-photo/blue-future-technology-book-cover-background-25_769134-404.jpg?semt=ais_hybrid&w=740' }} style={styles.imgback}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Signup</Text>
        <Formik
          initialValues={{ name: '', email: '', password: '', confirmPassword: '' }}
          validationSchema={signupSchema}
          onSubmit={handleSignup}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <>
              <TextInput placeholder="Name" style={styles.input}
                onChangeText={handleChange('name')} onBlur={handleBlur('name')} value={values.name} />
              {touched.name && errors.name && <Text style={styles.error}>{errors.name}</Text>}

              <TextInput placeholder="Email" style={styles.input}
                onChangeText={handleChange('email')} onBlur={handleBlur('email')} value={values.email} />
              {touched.email && errors.email && <Text style={styles.error}>{errors.email}</Text>}

              <TextInput placeholder="Password" secureTextEntry style={styles.input}
                onChangeText={handleChange('password')} onBlur={handleBlur('password')} value={values.password} />
              {touched.password && errors.password && <Text style={styles.errorpass}>{errors.password}</Text>}

              <TextInput placeholder="Confirm Password" secureTextEntry style={styles.input}
                onChangeText={handleChange('confirmPassword')} onBlur={handleBlur('confirmPassword')} value={values.confirmPassword} />
              {touched.confirmPassword && errors.confirmPassword && <Text style={styles.errorconf}>{errors.confirmPassword}</Text>}

              <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                <Text style={styles.buttonText}>Sign Up</Text>
              </TouchableOpacity>
            </>
          )}
        </Formik>
      </ScrollView>
    </ImageBackground>
  );
};



const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
    alignItems: 'center'
  },
  imgback:{
      flex:1,
  },
  title: {
    fontSize: 40,
    marginBottom: 20,
    textAlign: 'center',
    color:'#fff',
    fontWeight:'bold',
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    margin: 15,
    width:'90%',
    borderColor:'#fff',
    color:'#fff',
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginTop: -10,
    marginLeft:-190,
  },
  errorpass:{
   color: 'red',
    fontSize: 12,
    marginTop: -10,
    marginLeft:-170,
  },
  errorconf:{
   color: 'red',
    fontSize: 12,
    marginTop: -10,
    marginLeft:-185,
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
    fontSize:16,
  },
});


export default SignupScreen;

















