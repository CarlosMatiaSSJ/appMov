import React, {useEffect, useState} from "react";
import {View, Text, TextInput, Button, ScrollView, StyleSheet, Alert} from 'react-native';
// v9 compat packages are API compatible with v8 code
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore'
import 'firebase/firestore'
import { ActivityIndicator } from "react-native-web";

const DetallesAlimento = (props) =>{

const [loading, setLoading] = useState(true)

const initialState = {
    id:'',
    producto:'',
    descripcion:'',
    precioVenta:'',
    cantidad:''
}
const [alimento, setAlimento] = useState(initialState)

const firebaseConfig = {
apiKey: "AIzaSyDqVK-WWN_J_Lfl8aLVBX-4RM-1E_auMMw",
authDomain: "poli-waiter.firebaseapp.com",
projectId: "poli-waiter",
storageBucket: "poli-waiter.appspot.com",
messagingSenderId: "17731923429",
appId: "1:17731923429:web:f2d120b0b38dd6584f130c"
};
const handleChangeText = (name, value) => {
    setAlimento({ ...alimento, [name]: value})
}

const eliminarAlimento = async() =>{
    const consulta = db.collection('alimentos').doc(props.route.params.alimentoId);
    await consulta.delete();
    props.navigation.navigate('Lista')
}

const confirmarEliminar = () =>{
    Alert.alert('Eliminar Alimento', '¿Seguro que deseas eliminar el alimento?',[
        {text: 'Si, elimina', onPress:() => eliminarAlimento()},
        {text: 'No, Cancela', onPress:() => alert('No se ha eliminado')},
        
    ])
}

const actualizarAlimento = async() => {
    const consulta = db.collection('alimentos').doc(alimento.id);
    await consulta.set({
        producto: alimento.producto,
        descripcion: alimento.descripcion,
        precioVenta: alimento.precioVenta,
        cantidad: alimento.cantidad
    })
    setAlimento(initialState)
    props.navigation.navigate('Lista')
}

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const getUserById = async (id) =>{
const consulta = db.collection('alimentos').doc(id)
const doc = await consulta.get();
const alimento = doc.data();
setAlimento({
    ...alimento,
    id:doc.id,

})
setLoading(false)
}

useEffect(()=>{
getUserById(props.route.params.alimentoId);
},[])

console.log(props.route.params.alimentoId)


if(loading){
    return(
        <View>
            <ActivityIndicator size="large" color="#9e9e9e"></ActivityIndicator>
        </View>
    )
}
return(
<ScrollView style={styles.container}>
    <View style={styles.inputGroup}>
        <TextInput placeholder="Producto" value={alimento.producto} onChangeText={(value)=> handleChangeText('producto', value)}/>
    </View>
    <View style={styles.inputGroup}>
        <TextInput placeholder="Descripción" value={alimento.descripcion} onChangeText={(value)=> handleChangeText('descripcion', value)}/>
    </View>
    <View style={styles.inputGroup}>
        <TextInput placeholder="Precio de Venta" value={alimento.precioVenta} onChangeText={(value)=> handleChangeText('precioVenta', value)}/>
    </View>
    <View style={styles.inputGroup}>
        <TextInput placeholder="Cantidad" value={alimento.cantidad} onChangeText={(value)=> handleChangeText('cantidad', value)}/>
    </View>
    <View>
        <Button color={'#19AC52'}  title="Actualizar Alimento" onPress={()=> actualizarAlimento()}/>
    </View>
    <View>
        <Button color={'#E37399'} title="Eliminar Alimento" onPress={()=> eliminarAlimento()}/>
    </View>
</ScrollView>
)
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

export default DetallesAlimento
 