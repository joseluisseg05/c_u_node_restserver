const { response } = require("express");
const jwt = require('jsonwebtoken');

const Usuario = require('../models/usuario');

const validarJWT = async (req, res = response, next)=>{
    const token = req.header('auth'); //atrapa la variable 
    if (!token)
        return res.status(401).json({
            msj: "No hay token en la peticion "
        });

    try {
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        
        //leer al usuario del uid
        const usuario = await Usuario.findById(uid);
        
        if (!usuario )
            return res.status(401).json({
                msj: "Usuario inexistente "
            });

        //Verificar si no esta eliminado 
        if ( !usuario.estado)
            return res.status(401).json({
                msj: "Token no valido - user delete "
            });
        req.usuario = usuario;

        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            msj: "Token no valido"
        });
    }
    
}

module.exports= {
    validarJWT,
}