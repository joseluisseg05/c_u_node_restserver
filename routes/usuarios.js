const { Router } = require('express');
const user = require('../controllers/usuarios');

const router = Router();

router.get('/', user.usuariosGet);

router.post('/', user.usuariosPost);

router.put('/:id', user.usuariosPut);

router.patch('/', user.usuariosPatch)

router.delete('/', user.usuariosDelete);

module.exports = router;
