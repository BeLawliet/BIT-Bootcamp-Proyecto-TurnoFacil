const bcrypt = require('bcrypt')
const User = require('../models/User')

const registrar = async (peticion, respuesta) => {
    try {
        const username = peticion.body.username.trim().toLowerCase()
        const { password } = peticion.body

        const usuarioExistente = await User.findOne({ username })

        if (usuarioExistente) {
            return respuesta.status(409).json({
                msg: 'El usuario ya existe'
            })
        }

        const passwordEncriptada = await bcrypt.hash(password, 10)

        const usuario = await User.create({
            username,
            password: passwordEncriptada
        })

        return respuesta.status(201).json({
            msg: 'Usuario registrado correctamente',
            user: {
                id: usuario._id,
                username: usuario.username
            }
        })
    } catch (error) {
        if (error.code === 11000) {
            return respuesta.status(409).json({
                msg: 'El usuario ya existe'
            })
        }

        console.error('Error al registrar usuario:', error)
        return respuesta.status(500).json({
            msg: 'No fue posible registrar el usuario'
        })
    }
}

const login = async (peticion, respuesta) => {
    try {
        const username = peticion.body.username.trim().toLowerCase()
        const { password } = peticion.body

        const usuario = await User.findOne({ username })
        const passwordCorrecta = usuario
            ? await bcrypt.compare(password, usuario.password)
            : false

        if (!passwordCorrecta) {
            return respuesta.status(401).json({
                msg: 'Usuario o contraseña incorrectos'
            })
        }

        return respuesta.status(200).json({
            msg: 'Credenciales correctas',
            user: {
                id: usuario._id,
                username: usuario.username
            }
        })
    } catch (error) {
        console.error('Error al iniciar sesión:', error)
        return respuesta.status(500).json({
            msg: 'No fue posible iniciar sesión'
        })
    }
}

module.exports = {
    registrar,
    login
}
