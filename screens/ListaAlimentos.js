import React, { useEffect, useState } from 'react';
import { Text, Button, PaperProvider, Menu, Divider } from 'react-native-paper';
import {
  View,
  Modal,
  TextInput,
  ScrollView,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import { ListItem, Avatar, Icon } from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';
import db from '../database/firebase';
import { VirtualizedList } from 'react-native-web';

const ListaAlimentos = (props) => {
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
  const openImagePicker = () => {
    console.log(ImagePicker);
  };

  //Se realiza la inserción
  const guardarNuevoAlimento = async () => {
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

    // Si no se encuentra un alimento con la misma descripción, agregar el nuevo alimento
    await alimentosRef.add({
      producto: state.producto,
      descripcion: state.descripcion,
      precioVenta: state.precioVenta,
      cantidad: state.cantidad,
    });

    alert('Producto agregado exitosamente!');
    hideModal();
    props.navigation.navigate('Lista');
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
    <PaperProvider>
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
                onPress={openImagePicker}
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
                onPress={() => guardarNuevoAlimento()}
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
          paddingTop: 0,
          flexDirection: 'row',
          justifyContent: 'center',
        }}
      >
        <View style={styles.buttonMenu}>
          <Menu
            anchor={
              <Button
                mode='outlined'
                onPress={() => props.navigation.navigate('Menu')}
              >
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
      </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
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
    borderBottomColor: '#000',
    paddingVertical: 5,
    paddingHorizontal: 10,
    color: '#000',
  },
  buttonMenu: {
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginVertical: 10,
    alignSelf: 'center',
    width: 200,
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
