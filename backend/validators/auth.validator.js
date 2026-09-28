const { body } = require('express-validator')

const registerValidator = [
    body('username')
        .isString().withMessage('El usuario debe ser texto')
        .bail()
        .trim()
        .notEmpty().withMessage('El usuario es obligatorio')
        .isLength({ min: 3, max: 30 })
        .withMessage('El usuario debe tener entre 3 y 30 caracteres')
        .matches(/^[a-zA-Z0-9_]+$/)
        .withMessage('El usuario solo puede contener letras, números y guion bajo'),

    body('password')
        .isString().withMessage('La contraseña debe ser texto')
        .bail()
        .isStrongPassword()
        .withMessage('La contraseña debe tener mínimo 8 caracteres, mayúscula, minúscula, número y símbolo')
]

const loginValidator = [
    body('username')
        .isString().withMessage('El usuario debe ser texto')
        .bail()
        .trim()
        .notEmpty().withMessage('El usuario es obligatorio'),

    body('password')
        .isString().withMessage('La contraseña debe ser texto')
        .bail()
        .notEmpty().withMessage('La contraseña es obligatoria')
]

module.exports = {
    registerValidator,
    loginValidator
}
