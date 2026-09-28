const mongoose = require('mongoose')

const dbConnection = async () => {
    const { MONGODB_URI, MONGODB_USERNAME, MONGODB_PASSWORD } = process.env

    if (!MONGODB_URI || !MONGODB_USERNAME || !MONGODB_PASSWORD) {
        throw new Error('Falta configurar la conexión a MongoDB')
    }

    const uri = new URL(MONGODB_URI)
    uri.username = MONGODB_USERNAME
    uri.password = MONGODB_PASSWORD
    uri.pathname = '/turnofacil'

    await mongoose.connect(uri.toString())
    console.log('Conectado a MongoDB')
}

module.exports = dbConnection