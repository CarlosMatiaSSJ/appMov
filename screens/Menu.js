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
    const { id, producto, descripcion, precioVenta } = alimento;
    const nuevoItem = {
      id,
      producto,
      descripcion,
      precioVenta,
    };
    setIsCartVisible(true);
    addToCart(nuevoItem);
    alert('Producto Agregado al carrito');
  };
  console.log(alimentos);
  //VirtualizedList
  const getItem = (_data, index) => ({
    id: _data[index].id,
    title: _data[index].producto,
    description: _data[index].descripcion,
    quantity: `Cantidad ${_data[index].cantidad}`,
    image: _data[index].imageUrl,
  });

  const Item = ({ item }) => (
    <View
      style={{
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: '#D0DDEF',
        borderRadius: 8,
        padding: 12,
      }}
    >
      <View style={{ marginBottom: 12 }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.title}</Text>
        <Text style={{ fontSize: 16 }}>{item.description}</Text>
      </View>

      <Image
        source={{ uri: item.image }}
        style={{ width: '100%', height: 200, borderRadius: 8 }}
      />

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 12,
        }}
      >
        <TouchableOpacity
          onPress={() =>
            props.navigation.navigate('Alimento', {
              alimentoDescripcion: item.description,
            })
          }
          style={{
            backgroundColor: '#18009C',
            paddingVertical: 8,
            paddingHorizontal: 16,
            borderRadius: 4,
          }}
        >
          <Text style={{ color: 'white' }}>Ver</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => agregarAlimentoAlCarrito(item)}
          style={{
            backgroundColor: '#18009C',
            paddingVertical: 8,
            paddingHorizontal: 16,
            borderRadius: 4,
          }}
        >
          <Text style={{ color: 'white' }}>Agregar al carrito</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
  return (
    <>
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
    </>
  );
};
const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#18009C',
  },
});

export default Menu;
