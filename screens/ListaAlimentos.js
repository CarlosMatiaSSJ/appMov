import React, { useEffect, useState } from "react";
import { Modal, Portal, Text, Button, Provider, Divider, Menu } from 'react-native-paper';
import { View, TextInput, ScrollView, StyleSheet, Image } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import * as ImagePicker from 'expo-image-picker';

const ListaAlimentos = (props) => {
   //Firebase config
   const firebaseConfig = {
    apiKey: "AIzaSyDqVK-WWN_J_Lfl8aLVBX-4RM-1E_auMMw",
    authDomain: "poli-waiter.firebaseapp.com",
    projectId: "poli-waiter",
    storageBucket: "poli-waiter.appspot.com",
    messagingSenderId: "17731923429",
    appId: "1:17731923429:web:f2d120b0b38dd6584f130c"
    };
  
  // Inicializar Firebase
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  const db = firebase.firestore();
  const storage = firebase.storage();

  // Estado para almacenar los datos del formulario
  const [state, setState] = useState({
    producto: '',
    descripcion: '',
    precioVenta: '',
    cantidad: ''
  });

  const handleChangeText = (name, value) => {
    setState({ ...state, [name]: value });
  };

  const [selectedImage, setSelectedImage] = useState(null);

  // Función para abrir el selector de imágenes
  const selectImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Permiso de acceso a la galería de fotos denegado');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync();

    if (!result.cancelled) {
      // La imagen fue seleccionada exitosamente
      const imageUri = result.uri;
      setSelectedImage(imageUri);
    }
  };

  // Función para guardar la imagen en Firestore
  const saveImageToFirestore = async (imageUri) => {
    try {
      const response = await fetch(imageUri);
      const blob = await response.blob();

      // Generar un nombre único para la imagen
      const imageName = `${Date.now()}.jpg`;

      // Referencia al storage de Firebase donde se guardará la imagen
      const storageRef = storage.ref().child(`images/${imageName}`);

      // Subir la imagen al storage
      await storageRef.put(blob);

      // Obtener la URL de descarga de la imagen
      const imageUrl = await storageRef.getDownloadURL();

      return imageUrl;
    } catch (error) {
      console.error('Error al guardar la imagen:', error);
      throw error;
    }
  };

  // Función para guardar los datos en Firestore
  const saveData = async () => {
    try {
      // Verificar si ya existe un alimento con la misma descripción
      const alimentosRef = db.collection('alimentos');
      const querySnapshot = await alimentosRef.where('descripcion', '==', state.descripcion).get();

      if (!querySnapshot.empty) {
        // Si se encuentra un alimento con la misma descripción, mostrar un mensaje de error
        alert('La descripción del producto ya existe. Por favor, ingresa una descripción diferente.');
        return;
      }

      // Si no se encuentra un alimento con la misma descripción, guardar los datos
      const imageUrl = selectedImage ? await saveImageToFirestore(selectedImage) : null;

      await alimentosRef.add({
        producto: state.producto,
        descripcion: state.descripcion,
        precioVenta: state.precioVenta,
        cantidad: state.cantidad,
        imageUrl: imageUrl
      });

      alert('Producto agregado exitosamente!');
      hideModal();
      setSelectedImage(null);
      props.navigation.navigate("Lista");
    } catch (error) {
      console.error('Error al guardar los datos:', error);
      alert('Ocurrió un error al guardar los datos. Por favor, inténtalo nuevamente.');
    }
  };

  // Estado para almacenar la lista de alimentos
  const [alimentos, setAlimentos] = useState([]);

  useEffect(() => {
    // Obtener la lista de alimentos desde Firestore
    const unsubscribe = db.collection('alimentos').onSnapshot((querySnapshot) => {
      const alimentos = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setAlimentos(alimentos);
    });

    return () => unsubscribe();
  }, []);

  // Estado para manejar la visibilidad del modal
  const [visible, setVisible] = useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  return (
    <Provider>
      <View style={styles.container}>
      <View
        style={{
          paddingTop: 0,
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        <Menu
          theme={{ colors: { primary: '#18009C' } }} 
          anchor={<Button onPress={() => props.navigation.navigate('Menu')}>Mostrar Menú</Button>}>
          
        </Menu>
      </View>
      <View
        style={{
          paddingTop: 0,
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        <Menu
          theme={{ colors: { primary: '#18009C' } }} 
          anchor={<Button onPress={() => props.navigation.navigate('Inventario')}>Mostrar Inventario</Button>}>
          
        </Menu>
      </View>
        <Button theme={{ colors: { primary: '#18009C' } }}  style={styles.button} mode="contained" onPress={showModal}>
          Crear Alimento
        </Button>

        <ScrollView>
          {alimentos.map((alimento) => (
            <ListItem key={alimento.id} bottomDivider onPress={() => props.navigation.navigate('Detalle', { alimentoId: alimento.id })}>
              <Avatar size={32} rounded title="PW" containerStyle={{ backgroundColor: "red" }} />
              <ListItem.Content>
                <ListItem.Title>{alimento.producto}</ListItem.Title>
                <ListItem.Subtitle>{alimento.descripcion}</ListItem.Subtitle>
              </ListItem.Content>
              <ListItem.Chevron />
            </ListItem>
          ))}
        </ScrollView>

        <Portal>
          <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.modalContainer}>
            <View style={styles.modalContent}>
              <TextInput
                style={styles.input}
                placeholder="Producto"
                onChangeText={(value) => handleChangeText('producto', value)}
              />
              <TextInput
                style={styles.input}
                placeholder="Descripción"
                onChangeText={(value) => handleChangeText('descripcion', value)}
              />
              <TextInput
                style={styles.input}
                placeholder="Precio de Venta"
                onChangeText={(value) => handleChangeText('precioVenta', value)}
                keyboardType="decimal-pad"
              />
              <TextInput
                style={styles.input}
                placeholder="Cantidad"
                onChangeText={(value) => handleChangeText('cantidad', value)}
                keyboardType="numeric"
              />
              <Button theme={{ colors: { primary: '#18009C' } }} mode="outlined" title="Seleccionar Imagen" onPress={selectImage}>
                Seleccionar Imagen
              </Button>
              {selectedImage && <Image source={{ uri: selectedImage }} style={styles.image} />}
              <Button style={{ marginTop: 10, marginBottom: 10 }} theme={{ colors: { primary: '#18009C' } }} mode="contained" onPress={saveData}>
                Guardar
              </Button>
            </View>
          </Modal>
        </Portal>
      </View>
    </Provider>
  );
};

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
    width: '100%',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  image: {
    width: 200,
    height: 200,
    marginVertical: 10,
  },
});

export default ListaAlimentos;
