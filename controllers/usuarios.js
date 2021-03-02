
const { response, request } = require('express');


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

const usuariosPost = (req, res = response) => {
    const body = req.body;//expone todo el body
    const {nombre, edad} = req.body; // expone solo esas propiedades las demas las deja fuera

    res.json({
        msj: "peticion post - controller",
        body
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