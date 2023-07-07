import React, { useEffect, useState, useContext } from "react";
import {
  Modal,
  Portal,
  Text,
  Button,
  FAB,
  Divider,
  Avatar,
  Card,
} from "react-native-paper";
import { View, TextInput, ScrollView, StyleSheet } from "react-native";
// v9 compat packages are API compatible with v8 code3
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/firestore";
import { QuerySnapshot } from "firebase/firestore";
import CartContext from "./CartProvider";

const Menu = (props) => {
  //Firebase config
  const firebaseConfig = {
    apiKey: "AIzaSyDqVK-WWN_J_Lfl8aLVBX-4RM-1E_auMMw",
    authDomain: "poli-waiter.firebaseapp.com",
    projectId: "poli-waiter",
    storageBucket: "poli-waiter.appspot.com",
    messagingSenderId: "17731923429",
    appId: "1:17731923429:web:f2d120b0b38dd6584f130c",
  };

  firebase.initializeApp(firebaseConfig);
  //Instancia de FireStore
  const db = firebase.firestore();
  const [alimentos, setAlimentos] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [isCartVisible, setIsCartVisible] = useState(true);
  const { cartItems, addToCart } = useContext(CartContext);

  useEffect(() => {
    db.collection("alimentos")
      .get()
      .then((querySnapshot) => {
        const alimentosData = [];
        querySnapshot.forEach((doc) => {
          const alimento = doc.data();
          alimentosData.push(alimento);
        });
        setAlimentos(alimentosData);
      })
      .catch((error) => {
        console.log("Error al obtener los alimentos:", error);
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
    alert("Producto Agregado al carrito");
  };
  


  return (
    <>
      <ScrollView>
        <View>
          {alimentos.map((alimento, index) => (
            <Card
              key={index}
              style={{
                marginTop: 10,
                marginBottom: 10,
                backgroundColor: "#D0DDEF",
              }}
              mode="contained"
              theme={{ colors: { primary: "#180009C" } }}
            >
              <Card.Content>
                <Text variant="titleLarge">{alimento.producto}</Text>
                <Text variant="bodyMedium">{alimento.descripcion}</Text>
              </Card.Content>
              <Card.Cover source={{ uri: alimento.imageUrl }} />
              <Card.Actions>
                <Button
                  theme={{ colors: { primary: "#18009C" } }}
                  onPress={() =>
                    props.navigation.navigate("Alimento", {
                      alimentoDescripcion: alimento.descripcion,
                    })
                  }
                >
                  Ver
                </Button>
                <Button
                theme={{ colors: { primary: '#18009C' } }}
                onPress={() => agregarAlimentoAlCarrito(alimento)}
              >
                Agregar al carrito
              </Button>
              </Card.Actions>
            </Card>
          ))}
        </View>
      </ScrollView>
      {isCartVisible && (
        <FAB
          style={styles.fab}
          icon="cart"
          onPress={() => props.navigation.navigate("Carrito")}
          color="white"
        />
      )}
    </>
  );
};
const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: "#18009C",
  },
});

export default Menu;
