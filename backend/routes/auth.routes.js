const express = require('express')
const { registrar, login } = require('../controllers/auth.controller')
const {
    registerValidator,
    loginValidator
} = require('../validators/auth.validator')
const validar = require('../middlewares/validate.middleware')

const router = express.Router()

router.post('/registrar', registerValidator, validar, registrar)
router.post('/login', loginValidator, validar, login)

module.exports = router
