
const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');


const usuariosGet = (req = request, res = response) => {
    const query = req.query;
    //si no viene el nombre pone la leyenda
    const {params = "no params", edad} = req.body; // expone solo esas propiedades las demas las deja fuera
    res.json({
        msj: "peticion get - controller",
        query,
        params
    });
}

const usuariosPost = async (req, res = response) => {
    //const body = req.body;//expone todo el body
    //const {nombre, edad} = req.body; // expone solo esas propiedades las demas las deja fuera
    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({nombre, correo, password, rol});
    
    //realizar las validaciones 
    const existeEmail = await Usuario.findOne({correo: correo});
    if(existeEmail) 
        return res.status(400).json({//devuelve un status para la comprobacion 
            msj: "El correo ya esta registrado"
        });

    //encriptar
    const salt = bcryptjs.genSaltSync();//vueltas de encriptacion
    usuario.password = bcryptjs.hashSync(password, salt);

    //guardar
    await usuario.save();

    res.json({
        //msj: "peticion post - controller",
        usuario
    });
}

const usuariosPut = (req, res = response) => {
    const id = req.params.id;

    res.json({
        msj: "peticion put - controller",
        id
    });
}

const usuariosPatch = (req, res = response) => {
    res.json({
        msj: "peticion patch - controller"
    });
}

const usuariosDelete = (req, res = response) => {
    res.json({
        msj: "peticion delete - controller"
    });
}


module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}