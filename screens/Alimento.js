import React, {useEffect, useState} from "react";
import { useRoute } from '@react-navigation/native';
import { Modal, Portal, Text, Button, PaperProvider, Divider, Avatar, Card} from 'react-native-paper';
import {View, TextInput, ScrollView, StyleSheet} from 'react-native';
import { ListItem } from 'react-native-elements';
// v9 compat packages are API compatible with v8 code3
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore'
import 'firebase/firestore'
import { QuerySnapshot } from "firebase/firestore";

const Alimento = () =>{
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

const route = useRoute();
const { alimentoDescripcion } = route.params;

const [alimentos, setAlimentos] = useState([]);

useEffect(() => {  
  // Realizar consulta a la colección "alimentos"
  db.collection('alimentos')
    .where('descripcion', '==', alimentoDescripcion)
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
            <Card style={{ marginTop: 10, marginBottom: 10, backgroundColor:'#D0DDEF'  }} mode="contained">
    <Card.Content>
      <Text variant="titleLarge">{alimento.producto}</Text>
      <Text variant="bodyMedium">{alimento.descripcion}</Text>
    </Card.Content>
    <Card.Cover style={{ height: 500 }} source={{ uri: alimento.imageUrl }} />
    <TextInput
                style={styles.input }
                placeholder="Notas adicionales"
               
              />
    
    <Card.Actions>
      <Button theme={{ colors: { primary: '#18009C' } }} mode="contained">Agregar al carrito</Button>
    </Card.Actions>
  </Card>    
      ))}
        </View>
        </ScrollView>
    );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  button: {
    marginTop: 10,
    marginBottom: 10,
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    marginHorizontal: 40,
  },
  modalContent: {
    alignItems: 'center',
  },
  input: {
    marginTop: 20,
    width: '100%',
    height: '10%',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
    backgroundColor: 'white',
  },
  image: {
    width: 200,
    height: 200,
    marginVertical: 10,
  },
  });

export default Alimento