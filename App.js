import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//Importación de componentes 
import CrearAlimento from './screens/CrearAlimento';
import ListaAlimentos from './screens/ListaAlimentos';
import DetallesAlimento from './screens/DetallesAlimento';


import Convertidora from './calculadora/Convertidora';
import CelciusFarenheit from './calculadora/CelciusFarenheit';
import KmMilla from './calculadora/KmMilla'
import MetrosPies from './calculadora/MetrosPies'
import MetrosPulgada from './calculadora/MetrosPulgada'
import PesosDolares from './calculadora/PesosDolares'


const Stack = createNativeStackNavigator();

function MyStack() {
  return(
    <Stack.Navigator>
      <Stack.Screen name="Lista" component={ListaAlimentos} options={{title:'Alimentos'}}/>
      <Stack.Screen name="Crear" component={CrearAlimento} options={{title:'Crear nuevo alimento'}}/>
      <Stack.Screen name="Detalle" component={DetallesAlimento} options={{title:'Detalles'}}/>
      
    
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack/>
    </NavigationContainer>
    
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
