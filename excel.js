const Excel = require('exceljs');

// Función para generar el archivo Excel
async function generarArchivoExcel(datos) {
  const workbook = new Excel.Workbook();
  const worksheet = workbook.addWorksheet('Datos');

  // Agregar encabezados de columnas
  worksheet.columns = [
    { header: 'Nombre', key: 'nombre', width: 20 },
    { header: 'Email', key: 'email', width: 30 },
    { header: 'Mensaje', key: 'mensaje', width: 40 }
  ];

  // Agregar datos a las filas
  datos.forEach((dato) => {
    worksheet.addRow({
      nombre: dato.nombre,
      email: dato.email,
      mensaje: dato.mensaje
    });
  });

  // Guardar el archivo Excel
  const nombreArchivo = 'datos.xlsx';
  await workbook.xlsx.writeFile(nombreArchivo);

  console.log(`Archivo ${nombreArchivo} generado con éxito`);
}
module.exports = {
    generarArchivoExcel
};