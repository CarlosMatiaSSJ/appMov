import React from 'react';
import jsPDF from "jspdf";
import "jspdf-autotable";
import { DataTable, Text, Button } from 'react-native-paper';

class Otro extends React.Component {
  constructor() {
    super();
    this.state = {
      people: [
        { name: "Refresco", cant: "2",pre:"15",tot:"30" },
        { name: "Torta", cant: "1",pre:"25",tot:"25" }
      ]
    };
  }

  exportPDF = () => {
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape

    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(15);

    const title = "Reporte de Ventas";
    const headers = [["Producto", "Cantidad","Precio","Total"]];

    const data = this.state.people.map((elt) => [elt.name, elt.cant,elt.pre,elt.tot]);

    let content = {
      startY: 50,
      head: headers,
      body: data
    };

    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    doc.save("report.pdf");
  };

  render() {
    return (
      <div>
        <button onClick={() => this.exportPDF()}>Generate Report</button>
      </div>
    );
  }
}

export default Otro;