const Role = require('../models/role');
const {Usuario, Categoria} = require('../models/');

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

const idUsuarioExiste = async (id = '') =>{
    const existeUser = await Usuario.findById(id);
    if(!existeUser) 
        throw new Error(`El id: ${id} no existe`);
}

const idCategoriaExiste = async (id = '') =>{
    const existeCate = await Categoria.findById(id);
    if(!existeCate) 
        throw new Error(`El id: ${id} no existe`);
}

module.exports = {
    esRolValido,
    emailExiste,
    idUsuarioExiste,
    idCategoriaExiste,
}