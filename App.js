import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CartProvider } from './screens/CartProvider';

//Importación de componentes
import CrearAlimento from './screens/CrearAlimento';
import ListaAlimentos from './screens/ListaAlimentos';
import DetallesAlimento from './screens/DetallesAlimento';
import Login from './screens/Login';
import Menu from './screens/Menu';
import Alimento from './screens/Alimento';
import Inventario from './screens/Inventario';
import Carrito from './screens/Carrito';
import Payment from './screens/Payment';

const Stack = createNativeStackNavigator();

function MyStack() {
  return (
    <CartProvider>
      <Stack.Navigator>
        <Stack.Screen
          name='Lista'
          component={ListaAlimentos}
          options={{ title: 'Alimentos' }}
        />
        <Stack.Screen
          name='Payment'
          component={Payment}
          options={{ title: 'Payment' }}
        />
        <Stack.Screen
          name='Inventario'
          component={Inventario}
          options={{ title: 'Inventario' }}
        />
        <Stack.Screen
          name='Login'
          component={Login}
          options={{ title: 'Login' }}
        />

        <Stack.Screen
          name='Crear'
          component={CrearAlimento}
          options={{ title: 'Crear nuevo alimento' }}
        />
        <Stack.Screen
          name='Detalle'
          component={DetallesAlimento}
          options={{ title: 'Detalles' }}
        />
        <Stack.Screen
          name='Carrito'
          component={Carrito}
          options={{ title: 'Carrito' }}
        />
        <Stack.Screen
          name='Alimento'
          component={Alimento}
          options={{ title: 'Alimento' }}
        />
        <Stack.Screen
          name='Menu'
          component={Menu}
          options={{ title: 'Menú' }}
        />
        <Stack.Screen
          name="Payment"
          component={Payment}
          options={{ title: "Payment" }}
        />
      </Stack.Navigator>
    </CartProvider>
  );
}

export default function App() {
  return (
    <CartProvider>
      <NavigationContainer>
        <MyStack />
      </NavigationContainer>
    </CartProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
