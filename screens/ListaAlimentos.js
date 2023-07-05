import React, {useEffect, useState} from "react";
import { Modal, Portal, Text, Button, PaperProvider, Menu, Divider } from 'react-native-paper';
import {View, TextInput, ScrollView, StyleSheet} from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
// v9 compat packages are API compatible with v8 code3
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore'
import 'firebase/firestore'
import { QuerySnapshot } from "firebase/firestore";
import ImagePicker from 'react-native-image-picker';


const ListaAlimentos = (props) => {
    //Firebase config
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

    //Se obtienen los datos del formulario
    const[state, setState] = useState({
        producto:'',
        descripcion:'',
        precioVenta:'',
        cantidad:''
        });
        
        const handleChangeText = (name, value) => {
        setState({ ...state, [name]: value})
        }
    

  
    const [selectedImage, setSelectedImage] = useState(null);
        // Función para abrir el selector de imágenes
  const openImagePicker = () => {
    console.log(ImagePicker);
  };

    //Se realiza la inserción
    const guardarNuevoAlimento = async () => {
        // Verificar si ya existe un alimento con la misma descripción
        const alimentosRef = db.collection('alimentos');
        const querySnapshot = await alimentosRef.where('descripcion', '==', state.descripcion).get();
      
        if (!querySnapshot.empty) {
          // Si se encuentra un alimento con la misma descripción, mostrar un mensaje de error
          alert('La descripción del producto ya existe. Por favor, ingresa una descripción diferente.');
          return;
        }
      
        // Si no se encuentra un alimento con la misma descripción, agregar el nuevo alimento
        await alimentosRef.add({
          producto: state.producto,
          descripcion: state.descripcion,
          precioVenta: state.precioVenta,
          cantidad: state.cantidad,
      });
      
       alert('Producto agregado exitosamente!');
              hideModal()
              props.navigation.navigate("Lista");
      
      
      };



    
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

   

    //Valores modal
    const [menuVisible, setMenuVisible] = React.useState(false);
    const [visible, setVisible] = React.useState(false);
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const containerStyle = {backgroundColor: 'white', padding: 20};
  
    //Valores menú
   

  const openMenu = () => setMenuVisible(true);

  const closeMenu = () => setMenuVisible(false);

    return (

        <PaperProvider>
            
            <View
        style={{
          paddingTop: 0,
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        <Menu
        
          anchor={<Button onPress={() => props.navigation.navigate('Menu')}>Mostrar Menú</Button>}>
          
        </Menu>
      </View>
      <View
        style={{
          paddingTop: 0,
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        <Menu
        
          anchor={<Button onPress={() => props.navigation.navigate('Inventario')}>Mostrar Inventario</Button>}>
          
        </Menu>
      </View>



      <Portal style={styles.container}>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.container}>
        <View style={styles.inputGroup}>
        <TextInput placeholder="Producto" onChangeText={(value)=> handleChangeText('producto', value)}/>
    </View>
    <View style={styles.inputGroup}>
        <TextInput placeholder="Descripción" onChangeText={(value)=> handleChangeText('descripcion', value)}/>
    </View>
    <View style={styles.inputGroup}>
        <TextInput
         placeholder="Precio de Venta"  
         onChangeText={(value)=> handleChangeText('precioVenta', value)}
         keyboardType="decimal-pad"/>
    </View>
    <View style={styles.inputGroup}>
        <TextInput
         placeholder="Cantidad" 
         onChangeText={(value)=> handleChangeText('cantidad', value)}
         keyboardType="numeric"/>
    </View>
    <View>
    {selectedImage && <Image source={{ uri: selectedImage }} style={{ width: 200, height: 200 }} />}
      <Button theme={{ colors: { primary: '#18009C' } }} mode="outlined" title="Seleccionar Imagen" onPress={openImagePicker}>Subir imágen</Button>
    </View>

   
      
    <View>
    <Button style={{ marginTop: 10, marginBottom: 10 }} theme={{ colors: { primary: '#18009C' } }} mode="contained" onPress={()=> guardarNuevoAlimento()}>
                Guardar
    </Button>
    </View>
        </Modal>
      </Portal>

      
      <ScrollView>
        <Button style={{ marginTop: 10, marginBottom: 10 }} theme={{ colors: { primary: '#18009C' } }} mode="contained" onPress={showModal}>
                Crear Alimento
        </Button>
             
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
                             containerStyle={{ backgroundColor: "red" }}
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
     
    </PaperProvider>
       
      
    )

}

const styles = StyleSheet.create({
    container:{
 
    padding: 35,
    backgroundColor: 'white', 
    },
    inputGroup:{
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc'
    }
    })

export default ListaAlimentos