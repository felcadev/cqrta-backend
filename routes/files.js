const { Router } = require('express');
const { getFiles, postFiles, updateFiles, deleteFiles } = require('../controllers/files');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/fields-validator');
const { validateToken } = require('../middlewares/token-validator');


const router = Router();

router.get('/', [validateToken], getFiles);

router.post('/', [
    validateToken,
    check('name', 'El nombre es requerido').not().isEmpty(),
    check('shop_id', 'El identificador de la tienda debe ser válido').isMongoId(),
    validateFields
], postFiles);

router.put('/:id',
[
    validateToken,
], updateFiles);

router.delete('/:id', [validateToken], deleteFiles);


module.exports = router;