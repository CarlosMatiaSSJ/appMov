import { useNavigationState } from "@react-navigation/native";
import React, {useState} from "react";
import {View, ScrollView, TextInput, Button, StyleSheet} from 'react-native';



const MetrosPulgada = () => {

const[state, setState] = useState({
metros:'',

});

const handleChangeText = (name, value) => {
setState({ ...state, [name]: value})
}

const calcular = () =>{
    const pulgadas = state.metros*39.3701
    alert('El resultado es: '+pulgadas+' pulgadas')
}

return (
<ScrollView style={styles.container}>
    <View style={styles.inputGroup}>
        <TextInput required placeholder="Metros" onChangeText={(value)=> handleChangeText('metros', value)}/>
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

export default MetrosPulgada
