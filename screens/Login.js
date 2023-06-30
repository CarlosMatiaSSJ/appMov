import React, { useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { TextInput, Button, PaperProvider, Menu } from 'react-native-paper';

//import firestore from '@react-native-firebase/firestore';
// v9 compat packages are API compatible with v8 code

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore'
import 'firebase/firestore'

const LoginScreen = (props) => {
const [username, setUsername] = useState('');
const [password, setPassword] = useState('');

//Config Firestore
const firebaseConfig = {
apiKey: "AIzaSyDqVK-WWN_J_Lfl8aLVBX-4RM-1E_auMMw",
authDomain: "poli-waiter.firebaseapp.com",
projectId: "poli-waiter",
storageBucket: "poli-waiter.appspot.com",
messagingSenderId: "17731923429",
appId: "1:17731923429:web:f2d120b0b38dd6584f130c"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();


const handleRegister = async () => {
  try {
    const { user } = await firebase.auth().createUserWithEmailAndPassword(username, password);
    await db.collection('usuarios').doc(user.uid).set({
      username: username,
    });    
    props.navigation.navigate("Lista");
  } catch (error) {
    // Manejar el error de registro aquí
    console.log(error);
    alert('Ingresa un correo electrónico válido');
  }
};

const handleLogin = async () => {
  try {
    await firebase.auth().signInWithEmailAndPassword(username, password);
    // Inicio de sesión exitoso, redirigir a la siguiente pantalla
    alert('Inicio de sesión exitoso')
    props.navigation.navigate('Lista');
  } catch (error) {
    // Manejar el error de inicio de sesión aquí
    console.log(error);
    alert('Usuario o contraseña incorrectossss');
  }
};







return (
  <PaperProvider>
    
    <View style={styles.container}>
    <View style={styles.logoContainer}>
          <Image source={require('../imgs/logoAzul.png')} style={styles.logo} />
    </View>

    <TextInput style={{ backgroundColor: '#CDDDF1' }} label="Correo Electrónico" value={username} onChangeText={text=> setUsername(text)}
        />
        <TextInput style={{ backgroundColor: '#CDDDF1', marginBottom: 10 }}  color="" label="Contraseña" secureTextEntry value={password} onChangeText={text=>
            setPassword(text)}
            />
            <Button style={{ marginTop: 10, marginBottom: 10 }} theme={{ colors: { primary: '#18009C' } }} mode="contained" onPress={()=> handleLogin()}>
                Iniciar sesión
            </Button>
            <Button style={{ marginBottom: 10 }} theme={{ colors: { primary: '#18009C' } }} mode="outlined" onPress={()=> handleRegister()}>
                Registrarse
            </Button>
    </View>
  </PaperProvider>

);
};

const styles = StyleSheet.create({
container: {
flex: 1,
padding: 16,
justifyContent: 'center',
},
logoContainer: {
  alignItems: 'center',
  marginBottom: 30,
},
logo: {
  width: 150,
  height: 150,
},
});

export default LoginScreen;
