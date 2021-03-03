const { response } = require("express");
const bcrypjs = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require("../helpers/generar_jwt");

const login = async (req, res = response) =>{
    
    const {correo, password} = req.body;
    
    try {
        //Verificar el email
        const usuario = await Usuario.findOne({correo});
        if ( !usuario )
            return res.status(400).json({
                msj: 'Usuario / password no son correctos - correo'
            });

        //Verificar si esta activo 
        if ( !usuario.estado )
            return res.status(400).json({
                msj: 'Usuario / password no son correctos - estado'
            });

        //Verificar contraseña 
        const validarPass = bcrypjs.compareSync(password, usuario.password);
        if ( !validarPass )
            return res.status(400).json({
                msj: 'Usuario / password no son correctos - password'
            });

        //Generar jwt 
        const token = await generarJWT(usuario.id);


        res.json({
            usuario, 
            token
        });

    } catch (error) {
        return res.status(500).json({
            msj: "Hable con el administrador"
        })
    }
    
}

module.exports = {
    login,
}