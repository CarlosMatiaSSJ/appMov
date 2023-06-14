import React, {useEffect, useState} from "react";
import {View, Text, TextInput, Button, ScrollView} from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
// v9 compat packages are API compatible with v8 code
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore'
import 'firebase/firestore'
import { QuerySnapshot } from "firebase/firestore";


const ListaAlimentos = (props) => {
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
    
    const [alimentos, setAlimentos] =  useState([])

    useEffect(() => {
        db.collection('alimentos').onSnapshot(QuerySnapshot =>{
            const alimentos = [];
            QuerySnapshot.docs.forEach(doc =>{
                const {producto, descripcion, precioVenta, cantidad} = doc.data()
                alimentos.push({
                    id: doc.id,
                    producto,
                    descripcion,
                    precioVenta,
                    cantidad
                })
            })

            setAlimentos(alimentos)
        })
    },[])


    return (
       <ScrollView>
            <Button title="Crear Alimento" onPress={() => props.navigation.navigate("Crear")}/>
            {
                alimentos.map(alimento=>{
                    return(
                        <ListItem key={alimento.id} bottomDivider onPress={() => props.navigation.navigate('Detalle',{
                            alimentoId: alimento.id
                        })}>
                            <ListItem.Chevron/>
                            <Avatar size={32}
                            rounded
                            title="PW"
                             containerStyle={{ backgroundColor: "blue" }}
                             />
                            
                            <ListItem.Content>
                                <ListItem.Title>{alimento.producto}</ListItem.Title>
                                <ListItem.Subtitle>{alimento.descripcion}</ListItem.Subtitle>
                            </ListItem.Content>
                        </ListItem>
                    )
                })
            }
       </ScrollView>
    )

}

export default ListaAlimentos