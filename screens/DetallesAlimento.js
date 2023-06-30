import React, {useEffect, useState} from "react";
import {View, Text, TextInput, ScrollView, StyleSheet, Alert} from 'react-native';
import {Button} from 'react-native-paper';
// v9 compat packages are API compatible with v8 code
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore'
import 'firebase/firestore'


const DetallesAlimento = (props) =>{

//Se inicializa el estado de los input
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
//
const handleChangeText = (name, value) => {
    setAlimento({ ...alimento, [name]: value})
}

const eliminarAlimento = async() =>{
    const consulta = db.collection('alimentos').doc(props.route.params.alimentoId);
    await consulta.delete();
    props.navigation.navigate('Lista')
    alert('Se ha eliminado el producto');
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
    alert('Se ha editado el alimento!');
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

}

useEffect(()=>{
getUserById(props.route.params.alimentoId);
},[])

console.log(props.route.params.alimentoId)


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
            <Button style={{ marginTop: 10, marginBottom: 10 }} theme={{ colors: { primary: '#D8B504' } }} mode="contained" onPress={()=> actualizarAlimento()}>
                Editar Alimento
            </Button>
    </View>
    <View>
            <Button style={{ marginTop: 10, marginBottom: 10 }} theme={{ colors: { primary: '#CB0000' } }} mode="contained" onPress={()=> eliminarAlimento()}>
                Eliminar Alimento
            </Button>
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
 