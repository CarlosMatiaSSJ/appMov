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
const [carrito, setCarrito] = useState([]);

useEffect(() => {
  db.collection('alimentos')
    .get()
    .then((querySnapshot) => {
      const alimentosData = [];
      querySnapshot.forEach((doc) => {
        const alimento = doc.data();
        alimentosData.push(alimento);
      });
      setAlimentos(alimentosData);
    })
    .catch((error) => {
      console.log('Error al obtener los alimentos:', error);
    });
}, []);

const agregarAlimentoAlCarrito = (alimento) => {
  const { producto, descripcion, precioVenta } = alimento;
  const nuevoItem = {
    producto,
    descripcion,
    precioVenta,
  };
  setCarrito([...carrito, nuevoItem]);
  alert('Producto Agregado al carrito')
};

return (
  <ScrollView>
    <View>
      {alimentos.map((alimento, index) => (
        <Card
          key={index}
          style={{ marginTop: 10, marginBottom: 10, backgroundColor: '#D0DDEF' }}
          mode="contained"
          theme={{ colors: { primary: '#180009C' } }}
        >
          <Card.Content>
            <Text variant="titleLarge">{alimento.producto}</Text>
            <Text variant="bodyMedium">{alimento.descripcion}</Text>
          </Card.Content>
          <Card.Cover source={{ uri: alimento.imageUrl }} />
          <Card.Actions>
            <Button
              theme={{ colors: { primary: '#18009C' } }}
              onPress={() =>
                props.navigation.navigate('Alimento', { alimentoDescripcion: alimento.descripcion })
              }
            >
              Ver
            </Button>
            <Button
              theme={{ colors: { primary: '#18009C' } }}
              onPress={() => agregarAlimentoAlCarrito(alimento)}
            >
              Agregar al carrito
            </Button>
          </Card.Actions>
        </Card>
      ))}
    </View>
    {carrito.length > 0 && (
      <Button onPress={() => console.log(carrito)}>Ver carrito</Button>
    )}
  </ScrollView>
);
}
export default Menu