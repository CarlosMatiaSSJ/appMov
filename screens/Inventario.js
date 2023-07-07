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
import { View, TextInput, ScrollView, StyleSheet } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import db from '../database/firebase';
import { QuerySnapshot } from 'firebase/firestore';
import ImagePicker from 'react-native-image-picker';

const Inventario = () => {
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
      <DataTable style={{ backgroundColor: '#CDDDF1' }}>
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
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

export default Inventario;
