import { useNavigationState } from "@react-navigation/native";
import React, {useState} from "react";
import {View, ScrollView, TextInput, Button, StyleSheet} from 'react-native';



const CelciusFarenheit = () => {

const[state, setState] = useState({
celcius:'',

});

const handleChangeText = (name, value) => {
setState({ ...state, [name]: value})
}

const calcular = () =>{
    const farenheit = state.celcius*9/5+32
    alert('El resultado es: '+farenheit+'°F')
}

return (
<ScrollView style={styles.container}>
    <View style={styles.inputGroup}>
        <TextInput placeholder="°C" onChangeText={(value)=> handleChangeText('celcius', value)}/>
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

export default CelciusFarenheit
