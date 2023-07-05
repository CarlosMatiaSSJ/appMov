import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, Picker, Image } from 'react-native';
import { Card } from 'react-native-elements';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const QuejasySugerencia = () => {
  const firebaseConfig = {
    apiKey: "AIzaSyDqVK-WWN_J_Lfl8aLVBX-4RM-1E_auMMw",
    authDomain: "poli-waiter.firebaseapp.com",
    projectId: "poli-waiter",
    storageBucket: "poli-waiter.appspot.com",
    messagingSenderId: "17731923429",
    appId: "1:17731923429:web:f2d120b0b38dd6584f130c"
  };

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  } else {
    firebase.app();
  }

  const db = firebase.firestore();

  const [mensaje, setMensaje] = useState('');
  const [opcion, setOpcion] = useState('Queja');

  const guardarEnBaseDeDatos = async () => {
    if (opcion.trim() === '' || mensaje.trim() === '') {
      alert('Error: ¡Todos los campos son requeridos!', 'Todos los campos son requeridos.');
      return;
    }

    try {
      await db.collection('tbSQ').add({
        tipo: opcion,
        mensaje: mensaje,
      });
      alert('¡Éxito, el mensaje se ha enviado correcatmente!', '¡Se ha enviado correctamente!');
    } catch (error) {
      console.error('Error al guardar en la base de datos:', error);
      alert('Error', 'Ocurrió un error al guardar los datos.');
    }
  };

  return (
    <Card style={styles.card}>
      <Card.Title>Quejas y Sugerencias</Card.Title>
      <Card.Divider />

      <View style={styles.containerl}>
        <Image
          source={require('./imgs/QS.png')}
          style={styles.image}
        /> 

        <View style={styles.inputContainer}>
          <Text>Tipo:</Text>
          <Picker
            style={styles.picker}
            selectedValue={opcion}
            onValueChange={(itemValue) => setOpcion(itemValue)}
          >
            <Picker.Item label="Selecciona una Opcion" value=" " />
            <Picker.Item label="Queja" value="Queja" />
            <Picker.Item label="Sugerencia" value="Sugerencia" />
          </Picker>

          <Text>Mensaje:</Text>
          <TextInput
            style={styles.input}
            placeholder="Escriba su mensaje"
            value={mensaje}
            onChangeText={setMensaje}
          />
        </View>
      </View>

      <Button
        title="Guardar"
        onPress={() => guardarEnBaseDeDatos()}
      />
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    width:200,
    height:200,
    backgroundColor: 'blue',
    alignItems: 'center', 
  },
  containerl: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    alignItems: 'center', 
    width:500,
    height:300,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
    marginRight: 10,
  },
  picker: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    paddingHorizontal: 10,
    marginBottom: 20,
  },
});

export default QuejasySugerencia;
