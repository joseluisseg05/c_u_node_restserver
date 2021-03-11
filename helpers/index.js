const dbValidators = require('./db_varidators');
const generarJWT = require('./generar_jwt');
const googleVerify = require('./google_verify');
const subirArchivo = require('./subir_archivo');


module.exports = { //exportar todas las propiedades
    ...dbValidators,
    ...generarJWT,
    ...googleVerify,
    ...subirArchivo
}