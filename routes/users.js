const { Router } = require('express');
const { getUsers, postUser, updateUser, deleteUser  } = require('../controllers/users');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/fields-validator');
const { validateToken } = require('../middlewares/token-validator');


const router = Router();

router.get('/', [validateToken], getUsers);

router.post('/', [
    validateToken,
    check('name', 'El nombre es requerido').not().isEmpty(),
    check('password', 'La contraseña es requerida').not().isEmpty(),
    check('email', 'El email es requerido').isEmail(),
    validateFields
], postUser);

router.put('/:uid',
[
    validateToken,
    check('name', 'El nombre es requerido').not().isEmpty(),
    check('email', 'El email es requerido').isEmail(),
    validateFields
], updateUser);

router.delete('/:uid', [validateToken], deleteUser);


module.exports = router;