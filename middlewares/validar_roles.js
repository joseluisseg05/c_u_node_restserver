const { response } = require("express");


const esAdminRole = (req, res = response, next)=>{
    if (!req.usuario)
        return res.status(500).json({
            msj: "Se quiere verificar el rol sin validar el token"
        });

    const { rol, nombre } = req.usuario;
    
    if ( rol !== 'ADMIN_ROLE')
        return res.status(401).json({
            msj: `El usuario ${nombre} no tiene rol de Administrador`
        });



    next();
}

const tieneRole = ( ...roles ) => {
    return (req, res = response, next) => {
        //console.log(roles);
        if (!req.usuario)
            return res.status(500).json({
                msj: "Se quiere verificar el rol sin validar el token"
            });

        if (!roles.includes(req.usuario.rol))// ver si en los roles incluye el rol 
            return res.status(401).json({
                msj: `Se requiere un rol de los siguienetes ${roles}`
            });
        next();
    }
}

module.exports = {
    esAdminRole,
    tieneRole,
}