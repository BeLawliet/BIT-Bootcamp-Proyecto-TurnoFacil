const express = require('express')

const app = express()
const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    try {
        console.log(`Conectado correctamente al puerto: ${ PORT }`)
    } catch(error) {
        console.log(`Error conectandose a node Error: ${ error.message }`)
    }
})
