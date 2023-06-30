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


const Menu = (props) =>{

    return(
        <ScrollView>
        <View>
            <Card style={{ marginTop: 10, marginBottom: 10, backgroundColor:'#D0DDEF' }} mode="contained" theme={{colors : {primary: '#180009C'}}}>
    <Card.Content>
      <Text variant="titleLarge">Hamburguesa</Text>
      <Text variant="bodyMedium">Hamburguesa Hawaiana</Text>
    </Card.Content>
    <Card.Cover source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/NCI_Visuals_Food_Hamburger.jpg/640px-NCI_Visuals_Food_Hamburger.jpg' }} />
    <Card.Actions>
      <Button theme={{ colors: { primary: '#18009C' } }} onPress={() => props.navigation.navigate('Alimento')}>Ver</Button>
      <Button theme={{ colors: { primary: '#18009C' } }}>Agregar al carrito</Button>
    </Card.Actions>
  </Card>    
        </View>

        <View>
            <Card style={{ marginTop: 10, marginBottom: 10, backgroundColor:'#D0DDEF' }} mode="contained">
    <Card.Content>
      <Text variant="titleLarge">tacoa</Text>
      <Text variant="bodyMedium">Torta de huevo</Text>
    </Card.Content>
    <Card.Cover source={{ uri: 'https://www.cocinavital.mx/wp-content/uploads/2020/10/torta-de-huevo.jpg' }} />
    <Card.Actions>
      <Button theme={{ colors: { primary: '#18009C' } }}>Ver</Button>
      <Button theme={{ colors: { primary: '#18009C' } }}>Agregar al carrito</Button>
    </Card.Actions>
  </Card>    
        </View>

        <View>
            <Card style={{ marginTop: 10, marginBottom: 10, backgroundColor:'#D0DDEF' }} mode="contained">
    <Card.Content>
      <Text variant="titleLarge">Agua</Text>
      <Text variant="bodyMedium">Agua de Jamaica</Text>
    </Card.Content>
    <Card.Cover source={{ uri: 'https://assets.tmecosys.com/image/upload/t_web767x639/img/recipe/ras/Assets/F34BC251-8877-40BD-BBEF-ADDD34D15543/Derivates/A86DA7B6-65EB-4512-A719-085699EF7072.jpg' }} />
    <Card.Actions>
      <Button theme={{ colors: { primary: '#18009C' } }}>Ver</Button>
      <Button theme={{ colors: { primary: '#18009C' } }}>Agregar al carrito</Button>
    </Card.Actions>
  </Card>    
        </View>

        <View>
            <Card style={{ marginTop: 10, marginBottom: 10, backgroundColor:'#D0DDEF' }} mode="contained">
    <Card.Content>
      <Text variant="titleLarge">Burrito</Text>
      <Text variant="bodyMedium">Burrito de milanesa</Text>
    </Card.Content>
    <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
    <Card.Actions>
      <Button theme={{ colors: { primary: '#18009C' } }}>Ver</Button>
      <Button theme={{ colors: { primary: '#18009C' } }}>Agregar al carrito</Button>
    </Card.Actions>
  </Card>    
        </View>


        
        

     </ScrollView>

       


    
  
    );
}
export default Menu