import React, {useEffect, useState} from "react";
import { Modal, Portal, Text, Button, PaperProvider, Menu, Divider, DataTable } from 'react-native-paper';
import {View, TextInput, ScrollView, StyleSheet} from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
// v9 compat packages are API compatible with v8 code3
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore'
import 'firebase/firestore'
import { QuerySnapshot } from "firebase/firestore";
import ImagePicker from 'react-native-image-picker';

const Inventario = () =>{
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
  
    return (
      <View style={styles.container}>
        <DataTable style={{ backgroundColor: '#CDDDF1' }} >
          <DataTable.Header>
            <DataTable.Title>Producto</DataTable.Title>
            <DataTable.Title>Descripción</DataTable.Title>
            <DataTable.Title numeric>Precio de Venta</DataTable.Title>
            <DataTable.Title numeric>Cantidad</DataTable.Title>
          </DataTable.Header>
  
          {alimentos.map((alimento, index) => (
            <DataTable.Row key={index}>
              <DataTable.Cell>{alimento.producto}</DataTable.Cell>
              <DataTable.Cell>{alimento.descripcion}</DataTable.Cell>
              <DataTable.Cell numeric>{alimento.precioVenta}</DataTable.Cell>
              <DataTable.Cell numeric>{alimento.cantidad}</DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>
      </View>
    );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
    },
  });

export default Inventario 