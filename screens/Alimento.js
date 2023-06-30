import React, {useEffect, useState} from "react";
import { Modal, Portal, Text, Button, PaperProvider, Divider, Avatar, Card} from 'react-native-paper';
import {View, TextInput, ScrollView, StyleSheet} from 'react-native';
import { ListItem } from 'react-native-elements';
// v9 compat packages are API compatible with v8 code3
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore'
import 'firebase/firestore'
import { QuerySnapshot } from "firebase/firestore";

const Alimento = () =>{
    return(
        <ScrollView>
             <View>
            <Card style={{ marginTop: 10, marginBottom: 10 }} mode="contained">
    <Card.Content>
      <Text variant="titleLarge">Hamburguesa</Text>
      <Text variant="bodyMedium">Hamburguesa Hawaiana</Text>
    </Card.Content>
    <Card.Cover source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/NCI_Visuals_Food_Hamburger.jpg/640px-NCI_Visuals_Food_Hamburger.jpg' }} />

    
    <Card.Actions>
      <Button theme={{ colors: { primary: '#18009C' } }} mode="contained">Agregar al carrito</Button>
    </Card.Actions>
  </Card>    
        </View>
        </ScrollView>
    );
}

export default Alimento