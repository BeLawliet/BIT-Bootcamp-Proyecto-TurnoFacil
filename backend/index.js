require('dotenv').config()

const express = require('express')
const dbConnection = require('./config/db')

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())

app.get('/api/health', (peticion, respuesta) => {
    respuesta.status(200).json({
        msg: 'API de TurnoFácil funcionando'
    })
})

const iniciarServidor = async () => {
    try {
        await dbConnection()

        app.listen(PORT, () => {
            console.log(`Servidor escuchando en el puerto ${PORT}`)
        })
    } catch (error) {
        console.error(`No fue posible iniciar el servidor: ${error.message}`)
        process.exit(1)
    }
}

iniciarServidor()
