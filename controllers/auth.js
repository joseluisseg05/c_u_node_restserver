const { response } = require("express");
const bcrypjs = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require("../helpers/generar_jwt");
const { googleVerify } = require("../helpers/google_verify");

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

const googleSingIn = async (req, res= response) => {
    const { id_token } = req.body;
    try {
        const { nombre, correo, img } = await googleVerify(id_token);
        
        let usuario = await Usuario.findOne({correo});
        if ( !usuario ) {
            const data = { //crear el usuario en la base de datos
                nombre,
                correo,
                password: ':p',
                img, 
                google: true
            }

            usuario = new Usuario(data);
            await usuario.save();
        }

        if ( !usuario.estado ) 
            return res.status(401).json({
                msj: "Usuario bloqueado"
            })

        //Generar jwt 
        const token = await generarJWT(usuario.id);

        res.json({
            usuario,
            token
        })
    } catch (error) {
        res.status(400).json({
            msj: "token de google no valido"
        })
    }

    
}

module.exports = {
    login,
    googleSingIn
}