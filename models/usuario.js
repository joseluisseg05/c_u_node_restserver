const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        require: [true, 'El nombre es un campo obligatorio']
    },
    correo : {
        type: String,
        require: [true, 'El correo es un campo obligatorio'],
        unique: true
    },
    password : {
        type: String,
        require: [true, 'La contraseña es un campo obligatorio']
    },
    img : {
        type: String
    },
    rol: {
        type: String,
        required: true,
        emun: ['ADMIN_ROLE', 'USER_ROLE']
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});

module.exports = model('Usuario', UsuarioSchema);