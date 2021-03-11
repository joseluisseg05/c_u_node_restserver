const Role = require('../models/role');
const {Usuario, Categoria, Producto} = require('../models/');

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

const idProductoExiste = async (id = '') =>{
    const existeProd = await Producto.findById(id);
    if(!existeProd) 
        throw new Error(`El id: ${id} no existe`);
}

const validarColecciones = (coleccion = '', colecciones = [] ) => {
    const incluida = colecciones.includes(coleccion);
    if (!incluida) 
        throw new Error(`La colecion ${coleccion} no es permida`);

    return true;
}

module.exports = {
    esRolValido,
    emailExiste,
    idUsuarioExiste,
    idCategoriaExiste,
    idProductoExiste,
    validarColecciones
}