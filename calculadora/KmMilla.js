import React, {useState} from "react";
import {View, ScrollView, TextInput, Button, StyleSheet} from 'react-native';

const KmMilla = () => {

const[state, setState] = useState({
km:'',

});

const handleChangeText = (name, value) => {
setState({ ...state, [name]: value})
}

const calcular = () =>{
    const milla = state.km*0.621271
    alert('El resultado es: '+milla+' millas')
}

return (
<ScrollView style={styles.container}>
    <View style={styles.inputGroup}>
        <TextInput placeholder="Km" onChangeText={(value)=> handleChangeText('km', value)}/>
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

export default KmMilla

