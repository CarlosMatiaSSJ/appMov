import { useNavigationState } from "@react-navigation/native";
import React, {useState} from "react";
import {Button, Modal, Portal, Text, PaperProvider} from 'react-native-paper';
import {View, ScrollView, TextInput,  StyleSheet} from 'react-native';

// v9 compat packages are API compatible with v8 code
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore'
import 'firebase/firestore'





const CrearAlimento = (props) => {

const[state, setState] = useState({
producto:'',
descripcion:'',
precioVenta:'',
cantidad:''
});

const handleChangeText = (name, value) => {
setState({ ...state, [name]: value})
}

const firebaseConfig = {
apiKey: "AIzaSyDqVK-WWN_J_Lfl8aLVBX-4RM-1E_auMMw",
authDomain: "poli-waiter.firebaseapp.com",
projectId: "poli-waiter",
storageBucket: "poli-waiter.appspot.com",
messagingSenderId: "17731923429",
appId: "1:17731923429:web:f2d120b0b38dd6584f130c"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

//Se realiza la inserción a la base de datos
const guardarNuevoAlimento = async() => {
await db.collection('alimentos').add({
    producto: state.producto,
    descripcion: state.descripcion,
    precioVenta: state.precioVenta,
    cantidad: state.cantidad,
    
    })
    props.navigation.navigate("Lista");
}



return (
    
<ScrollView style={styles.container}>
    


    <View style={styles.inputGroup}>
        <TextInput placeholder="Producto" onChangeText={(value)=> handleChangeText('producto', value)}/>
    </View>
    <View style={styles.inputGroup}>
        <TextInput placeholder="Descripción" onChangeText={(value)=> handleChangeText('descripcion', value)}/>
    </View>
    <View style={styles.inputGroup}>
        <TextInput placeholder="Precio de Venta" onChangeText={(value)=> handleChangeText('precioVenta', value)}/>
    </View>
    <View style={styles.inputGroup}>
        <TextInput placeholder="Cantidad" onChangeText={(value)=> handleChangeText('cantidad', value)}/>
    </View>
    <View>
    <Button style={{ marginTop: 10, marginBottom: 10 }} theme={{ colors: { primary: '#18009C' } }} mode="contained" onPress={()=> guardarNuevoAlimento()}>
                Guardar
            </Button>
    </View>
</ScrollView>

);

}

const styles = StyleSheet.create({
container:{
flex: 1,
padding: 35,
},
inputGroup:{
flex: 1,
padding: 0,
marginBottom: 15,
borderBottomWidth: 1,
borderBottomColor: '#cccccc'
}
})

export default CrearAlimento
