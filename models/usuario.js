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

UsuarioSchema.methods.toJSON = function () { // rescribir metodos
    //quita __v y password de la respuesta y todos los demas datos
    // los almacena en usuario y es lo que devuelve 
    const {__v, password, _id, ...usuario} = this.toObject(); 
    usuario.uid = _id; //modificar visualmente
    return usuario;
}

module.exports = model('Usuario', UsuarioSchema);