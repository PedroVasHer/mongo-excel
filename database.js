const { MongoClient, ServerApiVersion } = require('mongodb');


// URL de conexión a tu base de datos MongoDB
const url = 'mongodb+srv://pvasquez242:C3IQHsuSn227Wj3v@cluster0.6xdu5w6.mongodb.net/?retryWrites=true&w=majority'; // La URL puede variar según la configuración de tu servidor

// Nombre de la base de datos que deseas utilizar
const dbName = 'servicios';

// Crear un cliente de MongoDB
const client = new MongoClient(url, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});
const db = client.db(dbName);
const usersCollection = db.collection('usuarios');
 async function conectar() {
    try {
        await client.connect();
        console.log("Conectado");    
    }catch(error) {
        console.error(error)
    }
}

async function insertarRegistro(nombre, email, mensaje) {
    await conectar();
    const result = await usersCollection.insertOne({
      nombre,
      email,
      mensaje
    });

    console.log('Documento insertado con ID:', result.insertedId);
}

async function leerRegistros() {
    await conectar();
    return await usersCollection.find({}).toArray();
}

async function cerrarConexion(){
    await client.close();
}

module.exports = {
    insertarRegistro,
    leerRegistros,
    cerrarConexion
};
