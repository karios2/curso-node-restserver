const { Router } = require('express');
const { check } = require('express-validator');
const { esRoleValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');
const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete, usuariosPatch } = require('../controller/usuarios');
const { validarCampos } = require('../middlewares/validar-campo');

const router = Router();

router.get('/', usuariosGet);

router.put('/:id',[
    check('id','No es un ID valido ').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('rol').custom(esRoleValido),
    validarCampos
], usuariosPut );


router.post('/', [
    check('nombre', 'El Nombre es obligatorio').not().isEmpty(),
    check('correo', 'El correo no es válido').isEmail(),
    check('correo').custom(emailExiste),
    check('password', 'El Password es obligatorio y debe tener más de 6 letras').isLength({ min: 6 }),
    check('rol').custom(esRoleValido),
    validarCampos
], usuariosPost);

router.delete('/:id',[
    check('id','No es un ID valido ').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
],usuariosDelete  );


router.patch('/', usuariosPatch);

module.exports = router;
