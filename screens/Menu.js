import React, { useEffect, useState, useContext } from 'react';
import { Text, FAB } from 'react-native-paper';
import {
  View,
  StyleSheet,
  VirtualizedList,
  Image,
  TouchableOpacity,
} from 'react-native';
// v9 compat packages are API compatible with v8 code3
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/firestore';
import { QuerySnapshot } from 'firebase/firestore';
import CartContext from './CartProvider';

const Menu = (props) => {
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
  const [carrito, setCarrito] = useState([]);
  const [isCartVisible, setIsCartVisible] = useState(true);
  const { cartItems, addToCart } = useContext(CartContext);
  useEffect(() => {
    db.collection('alimentos')
      .get()
      .then((querySnapshot) => {
        const alimentosData = [];
        querySnapshot.forEach((doc) => {
          const alimento = { ...doc.data(), id: doc.id }; // Copiar el campo "id" del documento en el objeto alimento
          alimentosData.push(alimento);
        });
        setAlimentos(alimentosData);
      })
      .catch((error) => {
        console.log('Error al obtener los alimentos:', error);
      });
  }, []);

  //Agregar producto al carrito de compras
  const agregarAlimentoAlCarrito = (alimento) => {
    const id = alimento.id;
    const producto = alimento.title;
    const descripcion = alimento.description;
    const precioVenta = alimento.price;

    const nuevoItem = { id, producto, descripcion, precioVenta };
    setIsCartVisible(true);
    addToCart(nuevoItem);
    alert('Producto Agregado al carrito');
  };
  //VirtualizedList
  const getItem = (_data, index) => ({
    id: _data[index].id,
    title: _data[index].producto,
    description: _data[index].descripcion,
    quantity: `Cantidad ${_data[index].cantidad}`,
    price: _data[index].precioVenta,
    image: _data[index].imageUrl,
  });

  const Item = ({ item }) => (
    <View style={styles.itemContainer}>
      <View style={styles.itemTextContainer}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.itemDescription}>{item.description}</Text>
      </View>

      <Image source={{ uri: item.image }} style={styles.itemImage} />

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() =>
            props.navigation.navigate('Alimento', {
              alimentoDescripcion: item.description,
            })
          }
          style={styles.viewButton}
        >
          <Text style={styles.buttonText}>Ver</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => agregarAlimentoAlCarrito(item)}
          style={styles.addToCartButton}
        >
          <Text style={styles.buttonText}>Agregar al carrito</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <VirtualizedList
        data={alimentos}
        renderItem={({ item }) => <Item item={item} />}
        keyExtractor={(item) => item.id}
        getItemCount={() => alimentos.length}
        getItem={getItem}
      />
      {isCartVisible && (
        <FAB
          style={styles.fab}
          icon='cart'
          onPress={() => props.navigation.navigate('Carrito')}
          color='white'
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6F1F7', // Color de fondo pastel
  },
  itemContainer: {
    marginVertical: 10,
    marginHorizontal: 20,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    elevation: 3,
  },
  itemTextContainer: {
    marginBottom: 12,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#18009C', // Título en azul oscuro
  },
  itemDescription: {
    fontSize: 16,
    color: '#333', // Descripción en gris oscuro
  },
  itemImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginTop: 12,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  viewButton: {
    backgroundColor: '#6DA4D1', // Color llamativo suave para el botón "Ver"
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  addToCartButton: {
    backgroundColor: '#71CEB4', // Color llamativo para el botón "Agregar al carrito"
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    marginLeft: 8,
  },
  buttonText: {
    color: 'white',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#18009C',
  },
});

export default Menu;
