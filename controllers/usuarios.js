
const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');


const usuariosGet = async (req = request, res = response) => {
    const { limite = 5, desde = 0 } = req.query; //argumentos opcionales 
    //si no viene el nombre pone la leyenda
    //const {params = "no params", edad} = req.body; // expone solo esas propiedades las demas las deja fuera
    /*
    const usuarios = await Usuario.find({estado: true})
        .skip(Number( desde ))
        .limit(Number( limite )); //

    const total = await Usuario.countDocuments({estado: true});
    */
   //esta estructura reduce el tiempo porque ejecuta mas prometas al mismo tiempo 
    const [ total, usuarios ] = await Promise.all([ //desestructuracion de arreglos
        Usuario.countDocuments({estado: true}),
        Usuario.find({estado: true})
            .skip(Number( desde ))
            .limit(Number( limite ))
    ]);

    res.json({
        //msj: "peticion get - controller",
        //query,
        //params
        total,
        usuarios
    });
}

const usuariosPost = async (req, res = response) => {
    //const body = req.body;//expone todo el body
    //const {nombre, edad} = req.body; // expone solo esas propiedades las demas las deja fuera
    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({nombre, correo, password, rol});
    
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

const usuariosPut = async (req, res = response) => {
    //const id = req.params.id;
    const { id } = req.params;
    const { _id, password, google, correo, ...restoInfo } = req.body;

    if (password) {//requiere adtualizar contraseña
        const salt = bcryptjs.genSaltSync();//vueltas de encriptacion
        restoInfo.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, restoInfo);

    res.json({
        //msj: "peticion put - controller",
        usuario
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