const express = require('express');
const bodyParser = require('body-parser');
const {insertarRegistro, leerRegistros, cerrarConexion } = require('./database');
const {generarArchivoExcel} = require('./excel');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Ruta principal para servir el formulario
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/send', async (req, res) => {
    const { nombre, email, mensaje } = req.body;
    await insertarRegistro(nombre, email, mensaje);
    await cerrarConexion();

    res.redirect('/');
});
app.post('/generar-reporte', async (req, res) => {
    const registros = await leerRegistros();
    console.log("🚀 ~ file: server.js:29 ~ app.post ~ registros:", registros)
    generarArchivoExcel(registros)
    await cerrarConexion();

    res.redirect('/');
});

app.listen(PORT, () => {
  console.log(`Servidor Express corriendo en el puerto ${PORT}`);
});
