const Role = require('../models/role');
const Usuario = require('../models/usuario');

const esRolValido = async (rol = '') =>{ //rol = '' valor por defecto
    const existeRol = await Role.findOne({rol});
    if (!existeRol)
        throw new Error(`El rol ${rol} no esta registrado`);
}

const emailExiste = async (correo = '') =>{
    const existeEmail = await Usuario.findOne({correo});
    if(existeEmail) 
        throw new Error(`El correo: ${correo} ya esta registrado`);
}

module.exports = {
    esRolValido,
    emailExiste
}