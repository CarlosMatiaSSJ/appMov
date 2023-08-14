import React, { useEffect, useState, useContext } from 'react';
import { useRoute } from '@react-navigation/native';
import { Card, FAB } from 'react-native-paper';
import {
  View,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import { ListItem } from 'react-native-elements';
// v9 compat packages are API compatible with v8 code3
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/firestore';
import { QuerySnapshot } from 'firebase/firestore';
import CartContext from './CartProvider';

const Alimento = () => {
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

  const route = useRoute();
  const { alimentoDescripcion } = route.params;

  const [isCartVisible, setIsCartVisible] = useState(false);
  const [alimentos, setAlimentos] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const { cartItems, addToCart } = useContext(CartContext);

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

  //Agregar producto al carrito de compras
  const agregarAlimentoAlCarrito = (alimento) => {
    const { producto, descripcion, precioVenta } = alimento;
    const nuevoItem = {
      producto,
      descripcion,
      precioVenta,
    };
    setIsCartVisible(true);
    addToCart(nuevoItem);
    alert('Producto Agregado al carrito');
  };

  const handleCartPress = () => {
    console.log(carrito);
  };

  return (
    <>
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
          {alimentos.map((alimento, index) => (
            <Card key={index} style={styles.card}>
              <Card.Content>
                <Text style={styles.title}>{alimento.producto}</Text>
                <Text style={styles.description}>{alimento.descripcion}</Text>
              </Card.Content>
              <Card.Cover
                style={styles.image}
                source={{ uri: alimento.imageUrl }}
              />
              <TextInput style={styles.input} placeholder='Notas adicionales' />
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.addButton}
                  onPress={() => agregarAlimentoAlCarrito(alimento)}
                >
                  <Text style={styles.buttonText}>Agregar al carrito</Text>
                </TouchableOpacity>
              </View>
            </Card>
          ))}
        </View>
      </ScrollView>
      {isCartVisible && (
        <FAB
          style={styles.fab}
          icon='cart'
          onPress={handleCartPress}
          color='white'
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: 'white',
  },
  container: {
    padding: 20,
  },
  card: {
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#D0DDEF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
  },
  image: {
    height: 300,
    resizeMode: 'cover',
  },
  input: {
    marginTop: 20,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  addButton: {
    backgroundColor: '#71CEB4',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#18009C',
  },
});

export default Alimento;
