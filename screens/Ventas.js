import * as React from 'react';
import { DataTable, Button, Text } from 'react-native-paper';
import { View } from '@react-pdf/renderer';

const MyComponent = () => {
  const [totalGeneral, setTotalGeneral] = React.useState(0);
    
  return (
   
    <DataTable>
       <useReactToPrint>
        trigger={()=>{
        return <Button>Imprimir</Button>
        }}
        content= {()=>this.componentRef}
        documentTitle='Reporte'
        pageStyle='print'

       </useReactToPrint>
       <View ref={el=>(this.componentRef=el)}>
      <Text variant="headlineMedium">Reporte de Ventas</Text>
      <DataTable.Header>
        <DataTable.Title>Producto</DataTable.Title>
        <DataTable.Title numeric>Cantidad</DataTable.Title>
        <DataTable.Title numeric>Precio</DataTable.Title>
        <DataTable.Title numeric>Total</DataTable.Title>
      </DataTable.Header>
      <DataTable.Row>
        <DataTable.Cell numeric>Refresco</DataTable.Cell>
        <DataTable.Cell numeric>2</DataTable.Cell>
        <DataTable.Cell numeric>15</DataTable.Cell>
        <DataTable.Cell numeric>30</DataTable.Cell>
      </DataTable.Row>
      <DataTable.Row>
        <DataTable.Cell numeric>Papas</DataTable.Cell>
        <DataTable.Cell numeric>4</DataTable.Cell>
        <DataTable.Cell numeric>20</DataTable.Cell>
        <DataTable.Cell numeric>80</DataTable.Cell>
      </DataTable.Row>
      <Text variant="headlineSmall">Total General: {totalGeneral}</Text>
      <Button mode="contained" >Generar PDF</Button>
      </View>
    </DataTable>
  );
};

export default MyComponent;