import React, { useEffect, useState } from 'react';
import {
  Modal,
  Portal,
  Text,
  Button,
  PaperProvider,
  Menu,
  Divider,
  DataTable,
} from 'react-native-paper';
import { View, ScrollView, StyleSheet } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/firestore';
import { QuerySnapshot } from 'firebase/firestore';
import ImagePicker from 'react-native-image-picker';

const Inventario = () => {
  //Firebase config
  const firebaseConfig = {
    apiKey: 'AIzaSyDqVK-WWN_J_Lfl8aLVBX-4RM-1E_auMMw',
    authDomain: 'poli-waiter.firebaseapp.com',
    projectId: 'poli-waiter',
    storageBucket: 'poli-waiter.appspot.com',
    messagingSenderId: '17731923429',
    appId: '1:17731923429:web:f2d120b0b38dd6584f130c',
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
      <ScrollView>
        <DataTable style={styles.dataTable}>
          <DataTable.Header>
            <DataTable.Title style={styles.tableHeader}>
              Producto
            </DataTable.Title>
            <DataTable.Title style={styles.tableHeader}>
              Descripción
            </DataTable.Title>
            <DataTable.Title numeric style={styles.tableHeader}>
              PrecioVenta
            </DataTable.Title>
            <DataTable.Title numeric style={styles.tableHeader}>
              Cantidad
            </DataTable.Title>
          </DataTable.Header>

          {alimentos.map((alimento, index) => (
            <DataTable.Row key={index} style={styles.tableRow}>
              <DataTable.Cell>{alimento.producto}</DataTable.Cell>
              <DataTable.Cell>
                <Text style={styles.cellText}>{alimento.descripcion}</Text>
              </DataTable.Cell>
              <DataTable.Cell numeric>${alimento.precioVenta}</DataTable.Cell>
              <DataTable.Cell numeric>{alimento.cantidad}</DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F0F3F9',
  },
  dataTable: {
    borderRadius: 10,
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
    flexWrap: 'wrap',
  },
  tableHeader: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#333333',
    flexWrap: 'wrap',
  },
  tableRow: {
    backgroundColor: '#FFFFFF',
  },
  cellText: {
    flexWrap: 'wrap',
  },
});

export default Inventario;
