import React, { useContext } from "react";
import { DataTable, Button } from "react-native-paper";
import { View, StyleSheet } from "react-native";
import CartContext from "./CartProvider";

const Carrito = () => {
  const { cartItems, removeFromCart } = useContext(CartContext);

  const handleRemoveFromCart = (itemId, itemDescripcion) => {
    removeFromCart(itemId);
    alert('Se ha eliminado: ' + itemDescripcion)    
  };

  const calcularTotal = () => {
    let total = 0;
    cartItems.forEach((item) => {
      total += Number(item.precioVenta);
    });
    return total;
  };

  return (
    <View style={styles.container}>
      <DataTable style={{ backgroundColor: "#CDDDF1" }}>
        <DataTable.Header>
          <DataTable.Title>Producto</DataTable.Title>
          <DataTable.Title>Descripción</DataTable.Title>
          <DataTable.Title>Precio</DataTable.Title>
          <DataTable.Title></DataTable.Title>
        </DataTable.Header>

        {cartItems.map((item, index) => (
          <DataTable.Row key={index}>
          <DataTable.Cell>{item.producto}</DataTable.Cell>
          <DataTable.Cell>{item.descripcion}</DataTable.Cell>
          <DataTable.Cell>${item.precioVenta}</DataTable.Cell>
          <DataTable.Cell>
            <Button theme={{ colors: { primary: '#18009C' } }} onPress={() => handleRemoveFromCart(item.id, item.descripcion)}>
              Quitar
            </Button>
          </DataTable.Cell>
        </DataTable.Row>
        
        ))}

        <DataTable.Row>
          <DataTable.Cell>TOTAL:</DataTable.Cell>
          <DataTable.Cell>${calcularTotal()}</DataTable.Cell>
        </DataTable.Row>
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

export default Carrito;
