const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth');
const { validateFields } = require('../middlewares/fields-validator');


const router = Router();

router.post('/', [
    check('password', 'La contraseña es requerida').not().isEmpty(),
    check('email', 'El email es requerido').isEmail(),
    validateFields
], login);


module.exports = router;