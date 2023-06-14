import { useNavigationState } from "@react-navigation/native";
import React, {useState} from "react";
import {View, ScrollView, TextInput, Button, StyleSheet} from 'react-native';



const PesosDolares = () => {

const[state, setState] = useState({
pesos:'',

});

const handleChangeText = (name, value) => {
setState({ ...state, [name]: value})
}

const calcular = () =>{
    const dolares = state.pesos*0.058
    alert('El resultado es: $'+dolares+' dolares')
}

return (
<ScrollView style={styles.container}>
    <View style={styles.inputGroup}>
        <TextInput placeholder="Pesos MXN" onChangeText={(value)=> handleChangeText('pesos', value)}/>
    </View>
   
    <View>
        <Button title="Calcular" onPress={()=> calcular()}/>
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

export default PesosDolares
