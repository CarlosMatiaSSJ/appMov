import React, {useEffect, useState} from "react";
import { Modal, Portal, Text, Button, PaperProvider, Divider, Avatar, Card} from 'react-native-paper';
import {View, TextInput, ScrollView, StyleSheet} from 'react-native';
import { ListItem } from 'react-native-elements';
// v9 compat packages are API compatible with v8 code3
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore'
import 'firebase/firestore'
import { QuerySnapshot } from "firebase/firestore";


const Menu = (props) =>{
//Firebase config
  const firebaseConfig = {
    apiKey: "AIzaSyDqVK-WWN_J_Lfl8aLVBX-4RM-1E_auMMw",
    authDomain: "poli-waiter.firebaseapp.com",
    projectId: "poli-waiter",
    storageBucket: "poli-waiter.appspot.com",
    messagingSenderId: "17731923429",
    appId: "1:17731923429:web:f2d120b0b38dd6584f130c"
    };
    
firebase.initializeApp(firebaseConfig);
//Instancia de FireStore
const db = firebase.firestore();
const [alimentos, setAlimentos] = useState([]);

useEffect(() => {
     
  
  // Realizar consulta a la colección "alimentos"
  db.collection('alimentos')
    .get()
    .then((querySnapshot) => {
      // Crear un array para almacenar los alimentos
      const alimentosData = [];
      // Recorrer los documentos de la consulta
      querySnapshot.forEach((doc) => {
        // Obtener los datos de cada documento
        const alimento = doc.data();
        // Agregar el alimento al array
        alimentosData.push(alimento);
      });
      // Actualizar el estado con los alimentos recuperados
      setAlimentos(alimentosData);
    })
    .catch((error) => {
      // Manejar el error
      console.log('Error al obtener los alimentos:', error);
    });
}, []);

    return(
        <ScrollView>
        <View>
        {alimentos.map((alimento, index) => (
            <Card style={{ marginTop: 10, marginBottom: 10, backgroundColor:'#D0DDEF' }} mode="contained" theme={{colors : {primary: '#180009C'}}}>
    <Card.Content>
      <Text variant="titleLarge">{alimento.producto}</Text>
      <Text variant="bodyMedium">{alimento.descripcion}</Text>
    </Card.Content>
    <Card.Cover source={{ uri: alimento.imageUrl }} />
    <Card.Actions>
      <Button theme={{ colors: { primary: '#18009C' } }} onPress={() => props.navigation.navigate('Alimento', {alimentoDescripcion: alimento.descripcion})}>Ver</Button>
      <Button theme={{ colors: { primary: '#18009C' } }}>Agregar al carrito</Button>
    </Card.Actions>
  </Card>    
        ))}
        </View>
        </ScrollView>

       


    
  
    );
}
export default Menu