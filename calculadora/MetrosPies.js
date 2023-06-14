import React, {useState} from "react";
import {View, ScrollView, TextInput, Button, StyleSheet} from 'react-native';

const MetrosPies = () => {

const[state, setState] = useState({
metros:'',

});

const handleChangeText = (name, value) => {
setState({ ...state, [name]: value})
}

const calcular = () =>{
    const pies = state.metros*3.28084
    alert('El resultado es: '+pies+' pies')
}

return (
<ScrollView style={styles.container}>
    <View style={styles.inputGroup}>
        <TextInput placeholder="Metros" onChangeText={(value)=> handleChangeText('metros', value)}/>
    </View>
   
    <View>
        <Button title="Calcular" onPress={()=> calcular()}/>
    </View>
</ScrollView>
);}

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

export default MetrosPies
