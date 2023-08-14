import React, { useContext } from 'react';
import { DataTable } from 'react-native-paper';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import CartContext from './CartProvider';

const Carrito = (props) => {
  const { cartItems, removeFromCart } = useContext(CartContext);

  const handleRemoveFromCart = (itemId, itemDescripcion) => {
    removeFromCart(itemId);
    alert('Se ha eliminado: ' + itemDescripcion);
  };

  const calcularTotal = () => {
    let total = 0;
    cartItems.forEach((item) => {
      total += Number(item.precioVenta);
    });
    return total;
  };

  $valorTotal = calcularTotal();

  return (
    <View style={styles.container}>
      <DataTable style={styles.table}>
        <DataTable.Header>
          <DataTable.Title>Producto</DataTable.Title>
          <DataTable.Title>Descripción</DataTable.Title>
          <DataTable.Title numeric>Precio</DataTable.Title>
          <DataTable.Title></DataTable.Title>
        </DataTable.Header>

        {cartItems.map((item, index) => (
          <DataTable.Row key={index}>
            <DataTable.Cell>{item.producto}</DataTable.Cell>
            <DataTable.Cell>{item.descripcion}</DataTable.Cell>
            <DataTable.Cell numeric>${item.precioVenta}</DataTable.Cell>
            <DataTable.Cell style={styles.removeButtonCell}>
              <TouchableOpacity
                onPress={() => handleRemoveFromCart(item.id, item.descripcion)}
                style={styles.removeButton}
              >
                <Text style={styles.buttonText}>Quitar</Text>
              </TouchableOpacity>
            </DataTable.Cell>
          </DataTable.Row>
        ))}

        <DataTable.Row>
          <DataTable.Cell style={styles.totalCell}>TOTAL:</DataTable.Cell>
          <DataTable.Cell numeric style={styles.totalCell}>
            ${$valorTotal}
          </DataTable.Cell>
        </DataTable.Row>
      </DataTable>
      <TouchableOpacity
        onPress={() => props.navigation.navigate('Payment', { $valorTotal })}
        style={styles.payButton}
      >
        <Text style={styles.buttonText}>Pagar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#E6F1F7', // Fondo pastel
  },
  table: {
    backgroundColor: 'white', // Fondo blanco para la tabla
    borderRadius: 12,
    elevation: 3,
    marginBottom: 20,
  },
  totalCell: {
    fontWeight: 'bold',
  },
  removeButtonCell: {
    justifyContent: 'flex-end',
    paddingLeft: 0,
  },
  removeButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    backgroundColor: '#FF6B6B', // Color rojo suave para "Quitar"
  },
  payButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    backgroundColor: '#71CEB4', // Color verde suave para "Pagar"
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default Carrito;
