const { validationResult } = require('express-validator')

module.exports = (peticion, respuesta, next) => {
    const errores = validationResult(peticion)

    if (!errores.isEmpty()) {
        return respuesta.status(400).json({
            errors: errores.array()
        })
    }

    next()
}
