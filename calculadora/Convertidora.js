import React from "react";
import {View, Button, ScrollView} from 'react-native';

const Convertidora = (props) => {

return(
<ScrollView>
    <View>
        <Button title="Celcius a Farenheit" onPress={()=> props.navigation.navigate("CelciusFarenheit")} />
    </View>
    <View>
        <Button title="KmMilla" onPress={()=> props.navigation.navigate("KmMilla")} />
    </View>
    <View>
        <Button title="MetrosPies" onPress={()=> props.navigation.navigate("MetrosPies")} />
    </View>
    <View>
        <Button title="MetrosPulgada" onPress={()=> props.navigation.navigate("MetrosPulgada")} />
    </View>
    <View>
        <Button title="PesosDolares" onPress={()=> props.navigation.navigate("PesosDolares")} />
    </View>
</ScrollView>

);

}
export default Convertidora
