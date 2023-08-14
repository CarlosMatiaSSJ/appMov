import React, { useEffect, useState } from 'react';
import { Text, Button, Menu } from 'react-native-paper';
import {
  View,
  Modal,
  TextInput,
  StyleSheet,
  Image,
  Pressable,
  VirtualizedList,
  TouchableOpacity,
} from 'react-native';
import firebase from 'firebase/compat/app';
import { Icon } from 'react-native-elements';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import * as ImagePicker from 'expo-image-picker';

const ListaAlimentos = (props) => {
  const firebaseConfig = {
    apiKey: 'AIzaSyDqVK-WWN_J_Lfl8aLVBX-4RM-1E_auMMw',
    authDomain: 'poli-waiter.firebaseapp.com',
    projectId: 'poli-waiter',
    storageBucket: 'poli-waiter.appspot.com',
    messagingSenderId: '17731923429',
    appId: '1:17731923429:web:f2d120b0b38dd6584f130c',
  };

  // Inicializar Firebase
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  const db = firebase.firestore();
  const storage = firebase.storage();

  //Se obtienen los datos del formulario
  const [state, setState] = useState({
    producto: '',
    descripcion: '',
    precioVenta: '',
    cantidad: '',
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
      const querySnapshot = await alimentosRef
        .where('descripcion', '==', state.descripcion)
        .get();

      if (!querySnapshot.empty) {
        // Si se encuentra un alimento con la misma descripción, mostrar un mensaje de error
        alert(
          'La descripción del producto ya existe. Por favor, ingresa una descripción diferente.'
        );
        return;
      }

      // Si no se encuentra un alimento con la misma descripción, guardar los datos
      const imageUrl = selectedImage
        ? await saveImageToFirestore(selectedImage)
        : null;

      await alimentosRef.add({
        producto: state.producto,
        descripcion: state.descripcion,
        precioVenta: state.precioVenta,
        cantidad: state.cantidad,
        imageUrl: imageUrl,
      });

      alert('Producto agregado exitosamente!');
      hideModal();
      setSelectedImage(null);
      props.navigation.navigate('Lista');
    } catch (error) {
      console.error('Error al guardar los datos:', error);
      alert(
        'Ocurrió un error al guardar los datos. Por favor, inténtalo nuevamente.'
      );
    }
  };
  const [alimentos, setAlimentos] = useState([]);

  useEffect(() => {
    db.collection('alimentos').onSnapshot((QuerySnapshot) => {
      const alimentos = [];
      QuerySnapshot.docs.forEach((doc) => {
        const { producto, descripcion, precioVenta, cantidad } = doc.data();
        alimentos.push({
          id: doc.id,
          producto,
          descripcion,
          precioVenta,
          cantidad,
        });
      });

      setAlimentos(alimentos);
    });
  }, []);

  //Valores modal
  const [menuVisible, setMenuVisible] = React.useState(false);
  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = { backgroundColor: 'white', padding: 20 };

  //Valores menú

  const openMenu = () => setMenuVisible(true);

  const closeMenu = () => setMenuVisible(false);

  //VirtualizedList
  const getItem = (_data, index) => ({
    id: _data[index].id,
    title: _data[index].producto,
    description: _data[index].descripcion,
    quantity: `Cantidad ${_data[index].cantidad}`,
  });

  const Item = ({ item }) => (
    <TouchableOpacity
      onPress={() =>
        props.navigation.navigate('Detalle', {
          alimentoId: item.id,
        })
      }
    >
      <View style={styles.item}>
        <View style={styles.item.iconContainer}>
          <Icon name='chevron-right' type='material' color='#000' size={24} />
        </View>
        <Text style={styles.item.title}>{item.title}</Text>
        <Text style={styles.item.description}>{item.description}</Text>
        <View style={styles.item.quantity}>
          <Text style={styles.item.quantity.text}>{item.quantity}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.principalView}>
      <Modal
        animationType='fade'
        transparent={true}
        visible={visible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setVisible(!visible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setVisible(!visible)}
            >
              <Text style={styles.buttonClose.Text}>X</Text>
            </Pressable>
            <TextInput
              placeholder='Producto'
              onChangeText={(value) => handleChangeText('producto', value)}
              style={styles.textInput}
            />
            <TextInput
              placeholder='Descripción'
              onChangeText={(value) => handleChangeText('descripcion', value)}
              style={styles.textInput}
            />
            <TextInput
              placeholder='Precio de Venta'
              onChangeText={(value) => handleChangeText('precioVenta', value)}
              keyboardType='decimal-pad'
              style={styles.textInput}
            />
            <TextInput
              placeholder='Cantidad'
              onChangeText={(value) => handleChangeText('cantidad', value)}
              keyboardType='numeric'
              style={styles.textInput}
            />
            <View>
              {selectedImage && (
                <Image
                  source={{ uri: selectedImage }}
                  style={{ width: 200, height: 200 }}
                />
              )}
              <Button
                style={{ backgroundColor: '#bdd1de', marginTop: 10 }}
                theme={{ colors: { primary: 'black' } }}
                mode='contained-tonal'
                title='Seleccionar Imagen'
                onPress={selectImage}
              >
                Subir imagen
              </Button>
            </View>

            <View>
              <Button
                style={{
                  backgroundColor: '#8ab3cf',
                  marginTop: 10,
                  marginBottom: 10,
                }}
                theme={{ colors: { primary: 'black' } }}
                mode='contained-tonal'
                onPress={() => saveData()} // Agrega los paréntesis para llamar a la función
              >
                Guardar
              </Button>
            </View>
          </View>
        </View>
      </Modal>

      <Button
        style={{ marginTop: 10, marginBottom: 10 }}
        theme={{ colors: { primary: '#809BAD' } }}
        mode='contained'
        onPress={showModal}
      >
        Crear Alimento
      </Button>
      <VirtualizedList
        data={alimentos}
        renderItem={({ item }) => <Item item={item} />}
        keyExtractor={(item) => item.id}
        getItemCount={() => alimentos.length}
        getItem={getItem}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
        }}
      >
        <View style={styles.buttonMenu}>
          <Menu
            anchor={
              <Button onPress={() => props.navigation.navigate('Menu')}>
                Mostrar Menú
              </Button>
            }
          ></Menu>
        </View>
        <View style={styles.buttonMenu}>
          <Menu
            anchor={
              <Button onPress={() => props.navigation.navigate('Inventario')}>
                Mostrar Inventario
              </Button>
            }
          ></Menu>
        </View>
        {/* <View style={styles.buttonMenu}>
          <Menu
            anchor={
              <Button onPress={() => props.navigation.navigate('Payment')}>
                Pagar
              </Button>
            }
          ></Menu>
        </View> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  principalView: {
    flex: 1,
    backgroundColor: '#fff',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
  },
  modalView: {
    margin: 20,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  textInput: {
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#809BAD',
    paddingVertical: 5,
    paddingHorizontal: 10,
    color: '#000',
  },
  buttonMenu: {
    borderRadius: 10,
    marginBottom: '8%',
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F5F5',
    background: 'linear-gradient(to right, #FFFFFF, #E3EDF9)',
    boxShadow: '0px 2px 3px rgba(0, 0, 0, 0.3)',
  },
  button: {
    borderRadius: 20,
    padding: 10,
  },
  item: {
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
    iconContainer: {
      alignItems: 'flex-end',
      top: '38%',
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 5,
    },
    description: {
      fontSize: 14,
      marginBottom: 5,
    },
    quantity: {
      position: 'absolute',
      top: 10,
      right: 10,
      fontSize: 16,
      text: {
        color: '#FF9700',
        fontWeight: 'bold',
      },
    },
  },
  title: {
    fontSize: 32,
  },
  buttonClose: {
    backgroundColor: 'red',
    position: 'absolute',
    top: 0,
    left: '65%',
    marginTop: 10,
    marginBottom: 10,
    Text: {
      color: 'white',
      fontWeight: 'bold',
    },
  },
});

export default ListaAlimentos;
