const { Router } = require('express');
const { check } = require('express-validator');

const { Uploads } = require('../controllers');

const { validarCampos } = require('../middlewares/validar_campos');

const router = Router();

router.post('/', Uploads.cargarArchivo);

module.exports = router;

