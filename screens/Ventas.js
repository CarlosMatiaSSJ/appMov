import * as React from 'react';
import { DataTable, Text, Button } from 'react-native-paper';
import RNHTMLtoPDF from 'react-native-html-to-pdf';

const MyComponent = () => {
  const [totalGeneral, setTotalGeneral] = React.useState(0);
  
  const exportToPDF = async () => {
    const options = {
      html: '<html><body><h1>Reporte de Ventas</h1><table><tr><th>Producto</th><th>Cantidad</th><th>Precio</th><th>Total</th></tr><tr><td>Refresco</td><td>2</td><td>15</td><td>30</td></tr><tr><td>Papas</td><td>4</td><td>20</td><td>80</td></tr></table><p>Total General: ' + totalGeneral + '</p></body></html>',
      fileName: 'reporte_ventas',
      directory: 'Documents',
    };
    
    const file = await RNHTMLtoPDF.convert(options);
    console.log(file.filePath);
  };

  return (
    <>
      <Text variant="headlineMedium">Reporte de Ventas</Text>
      <DataTable>
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
        </DataTable>
      <Button onPress={exportToPDF}>Exportar a PDF</Button>
    </>
  );
};

export default MyComponent;
